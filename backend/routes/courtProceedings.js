
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Save court proceedings transcript
router.post("/", async (req, res) => {
  try {
    const { case_id, title, transcript } = req.body;

    if (!case_id || !title || !transcript) {
      return res.status(400).json({
        success: false,
        message: "Case ID, title and transcript are required."
      });
    }

    const [result] = await pool.query(
      `INSERT INTO court_proceedings
       (case_id, title, transcript)
       VALUES (?, ?, ?)`,
      [case_id, title, transcript]
    );

    return res.status(201).json({
      success: true,
      message: "Transcript saved successfully.",
      id: result.insertId
    });

  } catch (error) {
    console.error("Save transcript error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save transcript.",
      error: error.message
    });
  }
});

export default router;
