// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Replace with your actual API Football key
const API_KEY = "7bc3adf5ec7982f96984b3288b078e5dfa0ab532b6594ccd28c2d8d37efad388";
const BASE_URL = "https://apiv3.apifootball.com/";

// Helper function
async function fetchFromApi(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Failed to fetch" };
  }
}

// Root route
app.get("/", (req, res) => {
  res.send("Sports API Backend is running!");
});

// Get all countries
app.get("/countries", async (req, res) => {
  const data = await fetchFromApi(`${BASE_URL}?action=get_countries&APIkey=${API_KEY}`);
  res.json(data);
});

// Get leagues by country
app.get("/leagues", async (req, res) => {
  const { country_id } = req.query;
  if (!country_id) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_leagues&country_id=${country_id}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get teams by league
app.get("/teams", async (req, res) => {
  const { league_id } = req.query;
  if (!league_id) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_teams&league_id=${league_id}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get players by name
app.get("/players", async (req, res) => {
  const { player_name } = req.query;
  if (!player_name) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_players&player_name=${player_name}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get standings by league
app.get("/standings", async (req, res) => {
  const { league_id } = req.query;
  if (!league_id) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_standings&league_id=${league_id}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get events / matches by league
app.get("/matches", async (req, res) => {
  const { league_id } = req.query;
  if (!league_id) return res.json([]);
  const today = new Date().toISOString().split("T")[0];
  const data = await fetchFromApi(
    `${BASE_URL}?action=get_events&from=${today}&to=${today}&league_id=${league_id}&APIkey=${API_KEY}`
  );
  res.json(data);
});

// Get lineups for a match
app.get("/lineups", async (req, res) => {
  const { match_id } = req.query;
  if (!match_id) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_lineups&match_id=${match_id}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get match statistics
app.get("/statistics", async (req, res) => {
  const { match_id } = req.query;
  if (!match_id) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_statistics&match_id=${match_id}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get odds
app.get("/odds", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const data = await fetchFromApi(`${BASE_URL}?action=get_odds&from=${today}&to=${today}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get live odds comments
app.get("/live_odds_comments", async (req, res) => {
  const data = await fetchFromApi(`${BASE_URL}?action=get_live_odds_comments&APIkey=${API_KEY}`);
  res.json(data);
});

// Get H2H (Head to Head)
app.get("/h2h", async (req, res) => {
  const { firstTeamId, secondTeamId } = req.query;
  if (!firstTeamId || !secondTeamId) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_H2H&firstTeamId=${firstTeamId}&secondTeamId=${secondTeamId}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get predictions
app.get("/predictions", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const data = await fetchFromApi(`${BASE_URL}?action=get_predictions&from=${today}&to=${today}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get top scorers
app.get("/topscorers", async (req, res) => {
  const { league_id } = req.query;
  if (!league_id) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_topscorers&league_id=${league_id}&APIkey=${API_KEY}`);
  res.json(data);
});

// Get match videos
app.get("/videos", async (req, res) => {
  const { match_id } = req.query;
  if (!match_id) return res.json([]);
  const data = await fetchFromApi(`${BASE_URL}?action=get_videos&match_id=${match_id}&APIkey=${API_KEY}`);
  res.json(data);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
