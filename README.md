# 🤖 Company Knowledge Chatbot

An AI-powered chatbot that answers employee questions using only company documents. Built with RAG (Retrieval-Augmented Generation) architecture.

---

## 📌 What it does

- Employees log in and ask questions in a chat interface
- Admin uploads company PDF documents (policies, manuals, FAQs)
- The AI reads those documents and answers questions strictly from them
- If the answer is not in the documents, it says so — no made-up answers
- Every conversation is saved for future reference
- Supports voice input and text-to-speech output

---

## 👥 Team

| Member | Role | Branch |
|--------|------|--------|
| Member 1 | Backend Developer (FastAPI) | `backend` |
| Member 2 | AI Developer (RAG Pipeline) | `ai-pipeline` |
| Member 3 | Frontend Developer (React) | `frontend` |
| Member 4 | Database Developer (PostgreSQL) | `database` |
| Member 5 | DevOps + Tester | `main` |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL |
| Vector Database | ChromaDB |
| AI Model | Llama 3 (via Ollama) |
| Embeddings | Sentence Transformers |
| PDF Reading | PyMuPDF |
| Authentication | JWT Tokens |

---

## 📁 Project Structure

```
company-knowledge-chatbot/
├── backend/          # FastAPI server, API endpoints
├── frontend/         # React website
├── database/         # PostgreSQL schema and models
├── ai-pipeline/      # PDF processing, embeddings, RAG logic
└── README.md
```

---

## ⚙️ How to Run (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/tamilyazh2023-ui/company-knowledge-chatbot.git
cd company-knowledge-chatbot
```

### 2. Install Python packages
```bash
pip install fastapi uvicorn python-jose passlib bcrypt python-multipart python-dotenv sqlalchemy psycopg2-binary chromadb sentence-transformers pymupdf
```

### 3. Install and start Ollama
```bash
# Download from https://ollama.com
ollama pull llama3
ollama serve
```

### 4. Set up PostgreSQL
- Install PostgreSQL
- Create a database named `chatbot_db`
- Update the `.env` file with your credentials

### 5. Start the backend
```bash
cd backend
uvicorn main:app --reload
```

### 6. Start the frontend
```bash
cd frontend
npm install
npm run dev
```

### 7. Open the app
Go to `http://localhost:5173` in your browser

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/chatbot_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
```

---

## 🚀 Features

- ✅ User registration and login (JWT authentication)
- ✅ Admin PDF upload
- ✅ AI answers from documents only (no hallucination)
- ✅ Chat history saved in database
- ✅ Voice input (Speech-to-Text)
- ✅ Read answer aloud (Text-to-Speech)
- ✅ Source document citation

---

## 📅 Project Timeline

| Week | Goal |
|------|------|
| Week 1 | Setup, authentication, database schema |
| Week 2 | PDF upload, text extraction, ChromaDB storage |
| Week 3 | Chat feature, RAG pipeline, Ollama integration |
| Week 4 | Voice features, testing, demo preparation |

---

## 📄 License

This project is built for internship purposes.
