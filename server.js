const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔑 YOUR API KEY
const API_KEY = "7bc3adf5ec7982f96984b3288b078e5dfa0ab532b6594ccd28c2d8d37efad388";

// ✅ ROOT
app.get("/", (req, res) => {
  res.send("✅ Football API Backend Running 🚀");
});


// ==============================
// ✅ TEAMS
// ==============================
app.get("/teams", async (req, res) => {
  try {
    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=${API_KEY}`
    );

    const data = await response.json();

    const teams = Array.isArray(data)
      ? data.map((t) => ({
          name: t.team_name,
          logo: t.team_badge,
        }))
      : [];

    res.json(teams);
  } catch (err) {
    res.json([{ name: "Arsenal" }, { name: "Chelsea" }]);
  }
});


// ==============================
// ✅ MATCHES
// ==============================
app.get("/matches", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_events&from=${today}&to=${today}&APIkey=${API_KEY}`
    );

    const data = await response.json();

    const matches = Array.isArray(data)
      ? data.map((m) => ({
          id: m.match_id,
          league: m.league_name,
          home: m.match_hometeam_name,
          away: m.match_awayteam_name,
          score: m.match_score,
          time: m.match_time,
        }))
      : [];

    res.json(matches);
  } catch (err) {
    res.json([]);
  }
});


// ==============================
// ✅ ODDS
// ==============================
app.get("/odds", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_odds&from=${today}&to=${today}&APIkey=${API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.json([]);
  }
});


// ==============================
// ✅ LIVE ODDS
// ==============================
app.get("/live-odds", async (req, res) => {
  try {
    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_live_odds_commnets&APIkey=${API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.json([]);
  }
});


// ==============================
// ✅ PREDICTIONS
// ==============================
app.get("/predictions", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_predictions&from=${today}&to=${today}&APIkey=${API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.json([]);
  }
});


// ==============================
// ✅ TOP SCORERS
// ==============================
app.get("/topscorers", async (req, res) => {
  try {
    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_topscorers&league_id=302&APIkey=${API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.json([]);
  }
});


// ==============================
// ✅ VIDEOS
// ==============================
app.get("/videos/:match_id", async (req, res) => {
  try {
    const { match_id } = req.params;

    const response = await fetch(
      `https://apiv3.apifootball.com/?action=get_videos&match_id=${match_id}&APIkey=${API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.json([]);
  }
});


// ==============================
// ✅ LIVE SCORE (WEBSOCKET)
// ==============================
let liveScores = [];

function connectWebSocket() {
  const ws = new WebSocket(
    `wss://wss.apifootball.com/livescore?APIkey=${API_KEY}&timezone=+03:00`
  );

  ws.on("open", () => {
    console.log("✅ WebSocket connected");
  });

  ws.on("message", (data) => {
    try {
      liveScores = JSON.parse(data);
    } catch (e) {
      console.log("Error parsing WS data");
    }
  });

  ws.on("close", () => {
    console.log("❌ WS disconnected... reconnecting");
    setTimeout(connectWebSocket, 5000);
  });
}

// start websocket
connectWebSocket();

// endpoint to get live scores
app.get("/live-scores", (req, res) => {
  res.json(liveScores);
});


// ==============================
// ✅ START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
