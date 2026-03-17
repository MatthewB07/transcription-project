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
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Video Transcriber</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input type="file" accept="video/*,audio/*" onChange={handleFileChange} />
        <button 
          onClick={uploadFile} 
          disabled={loading || !file}
          style={{ 
            marginLeft: '10px', 
            padding: '8px 16px', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Transcribing...' : 'Start Transcription'}
        </button>
      </div>

      {loading && (
        <p><em>Processing your file... this might take a minute.</em></p>
      )}

      {result && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h3>Transcription Result</h3>
          <p><strong>Detected Language:</strong> {result.language}</p>
          <div style={{ 
            background: '#f4f4f4', 
            padding: '20px', 
            borderRadius: '8px',
            whiteSpace: 'pre-wrap' // Keeps the formatting of the text
          }}>
            {result.transcription}
          </div>
        </div>
      )}
    </div>
  );
}

export default App
