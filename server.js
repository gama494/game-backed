const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "Nbfm1TsRfLdVDwcr7YaTok30XpXHf0NxIYoWvyKPNT4n9pavoLtMavFnmatA";

app.get("/games", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.mysportsfeeds.com/v2.1/pull/soccer/current/games.json",
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(API_KEY + ":MYSPORTSFEEDS").toString("base64"),
        },
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
