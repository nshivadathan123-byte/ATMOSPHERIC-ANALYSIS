/**
 * Vercel Serverless Function — Weather Proxy
 *
 * Acts as a secure middleman between the browser and OpenWeatherMap.
 * The API key lives only in Vercel's Environment Variables and is
 * NEVER sent to the browser.
 *
 * Query params:
 *   type     - "current" or "forecast"
 *   q        - city name (for city-based search)
 *   lat, lon - coordinates (for coords-based search)
 *   units    - "metric" or "imperial"
 */
export default async function handler(req, res) {
    // Set CORS headers so the browser can call this endpoint
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured on server.' });
    }

    const { type, q, lat, lon, units = 'metric' } = req.query;

    // Build the OpenWeatherMap URL server-side (key never leaves server)
    const endpoint = type === 'forecast' ? 'forecast' : 'weather';
    let owmUrl;

    if (lat && lon) {
        owmUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    } else if (q) {
        owmUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${encodeURIComponent(q)}&appid=${apiKey}&units=${units}`;
    } else {
        return res.status(400).json({ error: 'Provide either q or lat+lon parameters.' });
    }

    try {
        const response = await fetch(owmUrl);
        const data = await response.json();
        // Forward the exact same status code from OWM (401, 404, 200, etc.)
        return res.status(response.status).json(data);
    } catch (err) {
        return res.status(502).json({ error: 'Failed to reach OpenWeatherMap.' });
    }
}
