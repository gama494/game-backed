const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const API_KEY = "Nbfm1TsRfLdVDwcr7YaTok30XpXHf0NxIYoWvyKPNT4n9pavoLtMavFnmatA";

// ✅ ROOT ROUTE (THIS FIXES "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ GAMES ROUTE
app.get("/games", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.mysportsfeeds.com/v2.1/pull/soccer/current/games.json",
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(API_KEY + ":MYSPORTSFEEDS").toString("base64"),
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
