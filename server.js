// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

// Your RapidAPI Key
const RAPIDAPI_KEY = '66ddb6b5fcmsh71a33461789ac31p15eeaejsne53cf0473143';
const RAPIDAPI_HOST = 'api-football-v1.p.rapidapi.com';

// Simple cache to prevent 429 errors
let cachedFixtures = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 1 minute

app.get('/api/fixtures', async (req, res) => {
  try {
    const now = Date.now();

    if (cachedFixtures && now - lastFetchTime < CACHE_DURATION) {
      return res.json(cachedFixtures);
    }

    const response = await fetch(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data from RapidAPI' });
    }

    const data = await response.json();
    cachedFixtures = data;
    lastFetchTime = now;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Use PORT from environment (OneRender) or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
