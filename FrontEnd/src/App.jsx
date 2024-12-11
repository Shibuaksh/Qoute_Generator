import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [aiImage, setAiImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Ye function random quote fetch karne ke liye hai
  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/quote");
      setQuote(response.data.quote); // Updated to match the backend response
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Error fetching quote:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ye function Unsplash API se image fetch karne ke liye hai
  const fetchImage = async () => {
    if (!quote) {
      alert("Please generate a quote first!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/image", {
        params: { query: quote.split(" ")[0] }, // Quote ke first word ko query banake image fetch kar rahe hain
      });
      setImage(response.data.urls.small);
    } catch (error) {
      console.error("Error fetching image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ye function AI image generate karne ke liye hai
  const generateAiImage = async () => {
    if (!quote) {
      alert("Please generate a quote first!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/ai-image",
        null,
        {
          params: { prompt: `A background image for the quote: \"${quote}\"` },
        }
      );
      setAiImage(response.data.url);
    } catch (error) {
      console.error("Error generating AI image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🎨 Quote Generator with Images</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={fetchQuote} disabled={loading} style={{ margin: "5px" }}>
          {loading ? "Loading Quote..." : "Generate Quote"}
        </button>
        <button onClick={fetchImage} disabled={loading} style={{ margin: "5px" }}>
          {loading ? "Loading Image..." : "Fetch Related Image"}
        </button>
        <button onClick={generateAiImage} disabled={loading} style={{ margin: "5px" }}>
          {loading ? "Generating AI Image..." : "Generate AI Image"}
        </button>
      </div>

      {quote && (
        <div style={{ marginBottom: "20px" }}>
          <h2>"{quote}"</h2>
          <p>- {author}</p>
        </div>
      )}

      {image && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Related Image</h3>
          <img src={image} alt="Unsplash" style={{ width: "400px", borderRadius: "10px" }} />
        </div>
      )}

      {aiImage && (
        <div style={{ marginBottom: "20px" }}>
          <h3>AI-Generated Image</h3>
          <img src={aiImage} alt="AI-Generated" style={{ width: "400px", borderRadius: "10px" }} />
        </div>
      )}

      {loading && <p>Processing... Please wait.</p>}
    </div>
  );
};

export default App;
