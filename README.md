# **Audio/Video Transcription App**

A full-stack web application that transcribes audio and video files using OpenAI's Whisper speech recognition model. Built with a FastAPI backend and React frontend.

### **Features**

* Upload audio/video files and receive accurate text transcriptions
* Automatic language detection
* Optimized for Apple Silicon (MPS), NVIDIA GPUs (CUDA), or CPU fallback
* Clean, responsive UI with real-time processing feedback

### **Tech Stack**

**Backend**

* Python / FastAPI
* OpenAI Whisper (base model)
* PyTorch (with CUDA / Apple MPS support)
* Uvicorn ASGI server

**Frontend**

* React 19
* Vite
* CSS (custom)

### **How It Works**

* User selects an audio or video file in the browser
* The file is sent via multipart form upload to the FastAPI backend
* The backend runs the Whisper model on the file and returns the transcription and detected language
* Results are displayed in the UI

### **Getting Started**

**Backend**

* python -m venv venv
* source venv/bin/activate
* pip install -r requirements.txt
* uvicorn main:app --reload

**Frontend**

* cd frontend
* npm install
* npm run dev
* The frontend runs on http://localhost:5173 and the backend on http://localhost:8000.

        
