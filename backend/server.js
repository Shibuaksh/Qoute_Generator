const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/quote", async (req, res) => {
  try {
    // Fetch a random quote from the ZenQuotes API
    const response = await axios.get("https://zenquotes.io/api/random");
    
    // ZenQuotes API returns an array, extract the first item
    const quoteData = response.data[0];
    
    // Structure the response to include quote and author
    const formattedQuote = {
      quote: quoteData.q,    // Quote text
      author: quoteData.a    // Author name
    };
    console.log(formattedQuote);

    // Send the formatted response back to the client
    res.json(formattedQuote);
  } catch (error) {
    console.error("Quote API Error:", error.message);
    res.status(500).send("Error fetching quote.");
  }
});


// Ye second API hai jo unsplash images ke liye hai
app.get("/api/image", async (req, res) => {
  const query = req.query.query || "nature"; // Default query agar koi query na de
  try {
    const response = await axios.get(`https://api.unsplash.com/photos/random`, {
      params: { query },
      headers: { Authorization: `Client-ID YOUR_UNSPLASH_API_KEY` }, // Unsplash API Key
    });
    res.json(response.data);
  } catch (error) {
    console.error("Image API Error:", error.message);
    res.status(500).send("Error fetching image.");
  }
});

// Ye third API hai AI image generation ke liye
app.post("/api/ai-image", async (req, res) => {
  const prompt = req.query.prompt || "A beautiful quote background"; // Default prompt agar user koi prompt na de
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: { Authorization: `Bearer YOUR_OPENAI_API_KEY` }, // OpenAI API Key
      }
    );
    res.json(response.data.data[0]); // Pehla AI-generated image return kar raha hai
  } catch (error) {
    console.error("AI Image API Error:", error.message);
    res.status(500).send("Error generating AI image.");
  }
});

// Server start kar raha hai yahan
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
