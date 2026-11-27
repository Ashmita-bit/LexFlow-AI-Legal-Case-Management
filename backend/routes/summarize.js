
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import axios from "axios";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if ([".pdf", ".docx", ".txt"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOCX and TXT files are supported."));
    }
  }
});

const OLLAMA_URL = "http://127.0.0.1:11434/api/generate";
const MODEL = "llama3.2";

// Fast mode: one Ollama request per uploaded document.
async function generateSummary(documentText) {
  const text = documentText
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 9000);

  const prompt = `
You are LexFlow, a legal document summarization assistant.

Summarize the document below in clear, simple language.

Use these headings:
1. Document Overview
2. Parties Involved
3. Important Facts
4. Important Dates
5. Legal Issues
6. Key Findings and Conclusion

Be concise. Include only facts present in the document.
Do not invent names, dates, legal decisions or evidence.
If something is missing, say "Not specified".

DOCUMENT:
${text}

SUMMARY:
`;

  const response = await axios.post(
    OLLAMA_URL,
    {
      model: MODEL,
      prompt,
      stream: false,
      keep_alive: "10m",
      options: {
        temperature: 0.1,
        num_predict: 400,
        num_ctx: 4096,
        num_batch: 64
      }
    },
    {
      timeout: 300000
    }
  );

  return response.data.response?.trim() || "No summary was generated.";
}

router.post("/summarize", upload.single("file"), async (req, res) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Please upload a PDF, DOCX or TXT file."
      });
    }

    filePath = req.file.path;

    const ext = path.extname(req.file.originalname).toLowerCase();
    let documentText = "";

    if (ext === ".pdf") {
      const buffer = fs.readFileSync(filePath);
      const result = await pdfParse(buffer);
      documentText = result.text;
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      documentText = result.value;
    } else if (ext === ".txt") {
      documentText = fs.readFileSync(filePath, "utf8");
    }

    if (!documentText || !documentText.trim()) {
      return res.status(400).json({
        success: false,
        error: "No readable text found. Scanned PDFs may need OCR."
      });
    }

    console.log("Extracted characters:", documentText.length);
    console.log("Starting quick document summary...");

    const startTime = Date.now();
    const summary = await generateSummary(documentText);

    console.log(
      `Summary completed in ${((Date.now() - startTime) / 1000).toFixed(1)} seconds`
    );

    return res.json({
      success: true,
      summary
    });

  } catch (error) {
    console.error("Summary error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Unable to summarize the document.",
      details: error.response?.data || error.message
    });

  } finally {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (cleanupError) {
        console.error("Temporary upload cleanup failed:", cleanupError.message);
      }
    }
  }
});

router.post("/summarize-transcript", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: "No transcript text provided."
      });
    }

    const summary = await generateSummary(text);

    return res.json({
      success: true,
      summary
    });

  } catch (error) {
    console.error("Transcript summary error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Failed to summarize transcript.",
      details: error.response?.data || error.message
    });
  }
});

export default router;
