import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Random Quote
  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/quote");
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Error fetching quote:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🎨 Quote Generator</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={fetchQuote} disabled={loading} style={{ margin: "5px" }}>
          {loading ? "Loading Quote..." : "Generate Quote"}
        </button>
      </div>

      {quote && (
        <div style={{ marginBottom: "20px" }}>
          <h2>"{quote}"</h2>
          <p>- {author}</p>
        </div>
      )}

      {loading && <p>Processing... Please wait.</p>}
    </div>
  );
};

export default App;
