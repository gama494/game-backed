// server.js
const express = require('express');
const fetch = require('node-fetch'); // if Node v18+, can use global fetch
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Put your API key here
const API_KEY = '7bc3adf5ec7982f96984b3288b078e5dfa0ab532b6594ccd28c2d8d37efad388';
const BASE_URL = 'https://apiv3.apifootball.com/';

// Helper to fetch from API Football
async function fetchFromApi(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('API returned status', res.status, res.statusText);
      return { error: `API returned status ${res.status}` };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err.message);
    return { error: 'Failed to fetch' };
  }
}

// Routes
app.get('/countries', async (req, res) => {
  const data = await fetchFromApi(`${BASE_URL}?action=get_countries&APIkey=${API_KEY}`);
  res.json(data);
});

app.get('/leagues/:country_id', async (req, res) => {
  const { country_id } = req.params;
  const data = await fetchFromApi(`${BASE_URL}?action=get_leagues&country_id=${country_id}&APIkey=${API_KEY}`);
  res.json(data);
});

app.get('/teams/:league_id', async (req, res) => {
  const { league_id } = req.params;
  const data = await fetchFromApi(`${BASE_URL}?action=get_teams&league_id=${league_id}&APIkey=${API_KEY}`);
  res.json(data);
});

app.get('/players/:player_name', async (req, res) => {
  const { player_name } = req.params;
  const data = await fetchFromApi(`${BASE_URL}?action=get_players&player_name=${player_name}&APIkey=${API_KEY}`);
  res.json(data);
});

app.get('/standings/:league_id', async (req, res) => {
  const { league_id } = req.params;
  const data = await fetchFromApi(`${BASE_URL}?action=get_standings&league_id=${league_id}&APIkey=${API_KEY}`);
  res.json(data);
});

app.get('/events/:league_id/:from/:to', async (req, res) => {
  const { league_id, from, to } = req.params;
  const data = await fetchFromApi(`${BASE_URL}?action=get_events&from=${from}&to=${to}&league_id=${league_id}&APIkey=${API_KEY}`);
  res.json(data);
});

app.get('/lineups/:match_id', async (req, res) => {
  const { match_id } = req.params;
  const data = await fetchFromApi(`${BASE_URL}?action=get_lineups&match_id=${match_id}&APIkey=${API_KEY}`);
  res.json(data);
});

app.get('/odds/:from/:to', async (req, res) => {
  const { from, to } = req.params;
  const data = await fetchFromApi(`${BASE_URL}?action=get_odds&from=${from}&to=${to}&APIkey=${API_KEY}`);
  res.json(data);
});

// Default route for testing
app.get('/', (req, res) => {
  res.send('Football API Proxy is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
