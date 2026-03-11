from fastapi import FastAPI, UploadFile, File
from contextlib import asynccontextmanager
import whisper
import torch
import os
import shutil
import tempfile

ml_models = {}

def get_optimal_device():
        if torch.cuda.is_available():
            return "cuda"
        elif torch.backends.mps.is_available():
            return "mps"
        else:
            return "cpu"
        
@asynccontextmanager
async def lifespan(app: FastAPI):
    optimal_device = get_optimal_device()
    print(f"Server is starting up. Loading model on: {optimal_device}")  
    
    ml_models["whisper_base"] = whisper.load_model("base", device=optimal_device)

    yield

    print("Server is shutting down. Shutting down models.")
    ml_models.clear()

app = FastAPI(lifespan = lifespan)

@app.get("/")
def root():
    return {"Hello": "World"}

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):

    with tempfile.NamedTemporaryFile(delete=False, suffix=f"_{file.filename}") as temp_file:
        shutil.copyfileobj(file.file, temp_file)
        temp_file_path = temp_file.name

    try:
        print(f"Transcribing {file.filename}...")
        result = ml_models["whisper_base"].transcribe(temp_file_path)

        return {
             "filename": file.filename,
             "transcription": result["text"],
             "language": result.get("language", "unknown")
        }

    except Exception as e:
        return {"error": str(e)}
    
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)



