import './App.css'
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    setResult(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/transcribe", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.error) {
        alert("Server error: " + data.error);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="app-container">
      <h1>Video Transcriber</h1>
      <h3>Using Whisper</h3>

      <div className="file-input-row">
        <input type="file" accept="video/*,audio/*" onChange={handleFileChange} />
        <button
          className="transcribe-btn"
          onClick={uploadFile}
          disabled={loading || !file}
        >
          {loading ? 'Transcribing...' : 'Start Transcription'}
        </button>
      </div>

      {loading && (
        <p><em>Processing your file... this might take a minute.</em></p>
      )}

      {result && (
        <div className="result-section">
          <h3 className="transcripton-result">Transcription Result</h3>
          <p className="detected-language"><strong>Detected Language:</strong> {result.language}</p>
          <div className="transcription-box">
            {result.transcription}
          </div>
        </div>
      )}
    </div>
  );
}

export default App
