// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const APIKEY = '7bc3adf5ec7982f96984b3288b078e5dfa0ab532b6594ccd28c2d8d37efad388';
const BASE_URL = 'https://apiv3.apifootball.com/';

// Helper function to fetch from API Football
async function fetchFromAPI(params) {
  const url = new URL(BASE_URL);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  url.searchParams.append('APIkey', APIKEY);

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Countries
app.get('/countries', async (req, res) => {
  try {
    const data = await fetchFromAPI({ action: 'get_countries' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leagues by country
app.get('/leagues', async (req, res) => {
  try {
    const { country_id } = req.query;
    const data = await fetchFromAPI({ action: 'get_leagues', country_id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teams by league
app.get('/teams', async (req, res) => {
  try {
    const { league_id } = req.query;
    const data = await fetchFromAPI({ action: 'get_teams', league_id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Matches by league
app.get('/matches', async (req, res) => {
  try {
    const { league_id } = req.query;
    const data = await fetchFromAPI({
      action: 'get_events',
      from: '2023-01-01', // you can make dynamic
      to: '2026-12-31',   // or use query params
      league_id,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Odds by league
app.get('/odds', async (req, res) => {
  try {
    const { league_id } = req.query;
    const data = await fetchFromAPI({
      action: 'get_odds',
      from: '2023-01-01',
      to: '2026-12-31',
      league_id,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// H2H example
app.get('/h2h', async (req, res) => {
  try {
    const { firstTeamId, secondTeamId } = req.query;
    const data = await fetchFromAPI({
      action: 'get_H2H',
      firstTeamId,
      secondTeamId,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
