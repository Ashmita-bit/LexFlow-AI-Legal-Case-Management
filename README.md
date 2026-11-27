# ⚖️ LexFlow – AI-Powered Legal Case Management System

**LexFlow** is a web-based, AI-powered legal case management system designed to simplify and digitize the daily operations of law firms and advocates. The application provides a centralized platform for managing clients, legal cases, staff, invoices, court proceedings, and legal documents.

It integrates Artificial Intelligence to assist users with legal document summarization and general legal information, helping reduce manual work and improve the efficiency of legal case management.

\---

## 🚀 Project Overview

Managing legal cases manually can be time-consuming and difficult, especially when dealing with multiple clients, case records, court proceedings, invoices, and legal documents.

LexFlow addresses these challenges by providing a centralized digital platform where advocates and authorized users can manage legal information efficiently. Its AI-powered features further assist with understanding lengthy legal documents and obtaining general legal information.

The system is designed with a user-friendly interface and a structured backend connected to a MySQL database.

## ✨ Key Features

### 1\. User Authentication and Role-Based Access

* Separate login functionality for advocates and clients.
* Staff authentication and management.
* Secure credential validation.
* Role-specific access to application features.

### 2\. Client Management

* Add and manage client information.
* View client details.
* Associate clients with advocates.
* Maintain organized client records.

### 3\. Case Management

* Create and manage legal case records.
* Maintain case-related information.
* Access case details through a centralized dashboard.
* Organize legal case information for easier tracking.

### 4\. Staff Management

* Manage law firm staff information.
* Maintain staff records.
* Associate staff members with relevant responsibilities.

### 5\. Invoice and Payment Management

* Create and manage client invoices.
* Track total amounts, payments, and remaining balances.
* Monitor payment statuses such as Pending, Paid, and Overdue.
* Maintain invoice-related case and client information.

### 6\. AI-Powered Legal Chatbot

* Integrated AI chatbot for general legal information.
* Provides responses to legal-related questions.
* Assists users with legal case management queries.
* Uses the locally running Llama 3.2 model through Ollama.

### 7\. AI-Based Legal Document Summarization

* Upload legal documents in PDF, DOCX, and TXT formats.
* Extract readable text from uploaded documents.
* Generate structured summaries using the Llama 3.2 model.
* Identify important facts, parties, dates, legal issues, evidence, and conclusions.
* Helps users understand lengthy legal documents more efficiently.

### 8\. Court Proceedings and Transcript Summarization

* Manage court proceeding information.
* Process court transcript text.
* Generate concise summaries of court proceedings using AI.

### 9\. Database Management

* MySQL database integration.
* Centralized storage of application records.
* Backend API connectivity for retrieving and updating information.



\## 📸 Application Screenshots



\### 1. Advocate Dashboard

!\[Advocate Dashboard](screenshots/advocate\_dashboard.png)



\### 2. Client Dashboard

!\[Client Dashboard](screenshots/client\_dashboard.png)



\### 3. Client Management

!\[Client Management](screenshots/client\_management.png)



\### 4. Case Management

!\[Case Management](screenshots/case\_management.png)



\### 5. AI-Powered Legal Chatbot

!\[AI Powered Chatbot](screenshots/AI%20powered%20chatbot.png)



\### 6. AI-Powered Speech Recognition

!\[Speech Recognition](screenshots/speech\_recognition.png)

\---

## 🛠️ Technologies Used

|Category|Technologies|
|-|-|
|Frontend|React.js, HTML5, CSS3, JavaScript|
|Backend|Node.js, Express.js|
|Database|MySQL|
|AI Integration|Ollama, Llama 3.2|
|Document Processing|PDF-Parse, Mammoth|
|API Communication|Axios, REST APIs|
|File Upload|Multer|
|PDF Generation|PDFKit|
|Document Generation|DOCX|
|Development Tools|Visual Studio Code, Git, GitHub|

\---

## 🏗️ System Architecture

LexFlow follows a full-stack architecture:

1. **Frontend Layer:** React.js provides the user interface for advocates, clients, and other authorized users.
2. **Backend Layer:** Node.js and Express.js handle API requests, authentication, application logic, and document processing.
3. **Database Layer:** MySQL stores client, case, invoice, staff, and other application records.
4. **AI Layer:** Ollama runs the Llama 3.2 model locally to provide chatbot responses and legal document summaries.

```text
              LEXFLOW APPLICATION
                      |
             React.js Frontend
                      |
              REST API Requests
                      |
            Node.js + Express.js
                      |
          +-----------+-----------+
          |           |           |
       MySQL       Ollama       Document
      Database    Llama 3.2     Processing
          |           |           |
      Case Data    AI Chat     PDF / DOCX
      Client Data  Summary     / TXT Files
      Invoices
      Staff Data
```

\---

## 📂 Project Structure

```text
LexFlow/
│
├── backend/
│   ├── routes/
│   │   └── summarize.js
│   ├── uploads/
│   ├── Server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── AIChatbot.jsx
│   │   ├── App.js
│   │   └── ...
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: The structure above highlights the main project folders and selected files. Your actual repository may contain additional components, routes, and configuration files.*

\---

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the application:

* Node.js and npm
* MySQL Server
* Ollama
* Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/LexFlow-AI-Legal-Case-Management.git
```

```bash
cd LexFlow-AI-Legal-Case-Management
```

User name : `Ashmita-bit`

### Step 2: Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory and configure your local database credentials:

```env
PORT=5000
DB\_HOST=127.0.0.1
DB\_USER=root
DB\_PASSWORD=your\_mysql\_password
DB\_NAME=advocate\_casebook
```

Use your own MySQL password and configure the database according to your project schema.

### Step 3: Start the Backend

```bash
node server.js
```

The backend runs at:

`http://localhost:5000`

### Step 4: Set Up Ollama

Install Ollama from:

https://ollama.com/

Download the model:

```bash
ollama pull llama3.2
```

Ensure Ollama is running before using the AI chatbot and document summarization features.

### Step 5: Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The React frontend will generally open at:

`http://localhost:3000`

\---



## 🔐 Security and Privacy

* Database credentials are configured through environment variables.
* Environment files and uploaded legal documents should not be committed to GitHub.
* AI document processing uses a locally running Ollama model.
* Users should review AI-generated summaries and verify important legal information against the original documents.

**Disclaimer:** LexFlow is an information and case-management support system. Its AI-generated responses and summaries are not a substitute for professional legal advice or independent legal verification.

\---

## 🎯 Project Objectives

* Digitize legal case management activities.
* Simplify advocate and client record management.
* Improve tracking of cases, invoices, and court proceedings.
* Reduce manual effort in understanding lengthy legal documents.
* Integrate locally running AI capabilities into a legal management application.
* Provide a centralized and user-friendly platform for legal professionals.

## 🔮 Future Enhancements

* Automated case status notifications and reminders.
* Advanced document search and classification.
* OCR support for scanned legal documents.
* Improved AI summarization for lengthy documents.
* Advanced reporting and analytics dashboards.
* Enhanced security and role-based permissions.

## 👩‍💻 Developed By

**Project Name:** LexFlow – AI-Powered Legal Case Management System

**Domain:** Full-Stack Web Development | Artificial Intelligence

**Repository:** [GitHub Repository](https://github.com/Ashmita-bit/LexFlow-AI-Legal-Case-Management.git)

\---

⭐ If you find this project interesting, consider giving the repository a star!

