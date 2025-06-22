const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "f834b0d41a61464bbf4002139d68d1d5";
const NEWS_API_URL = "https://newsapi.org/v2/everything";

app.get("/news", async (req, res) => {
    try {
        const query = req.query.q || "India";
        const response = await axios.get(`${NEWS_API_URL}?q=${query}&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching news", details: error.message });
    }
});

// Change the port from 3000 to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
