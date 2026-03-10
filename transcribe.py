import whisper
import torch

def main():

    def get_optimal_device():
        if torch.cuda.is_available():
            return "cuda"
        elif torch.backends.mps.is_available():
            return "mps"
        else:
            return "cpu"
        
    optimal_device = get_optimal_device()
    print(f"Auto-detected optimal engine: {optimal_device}")  

    video_path = "Test_1.m4a"

    print("loading model...")
    model = whisper.load_model("base", device=optimal_device)
    result = model.transcribe(video_path)

    print(result["text"])

if __name__ == "__main__":
    main()