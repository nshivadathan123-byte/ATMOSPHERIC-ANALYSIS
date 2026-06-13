export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured on server.' });
    }

    const { type, q, lat, lon, units = 'metric' } = req.query;
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
        return res.status(response.status).json(data);
    } catch (err) {
        return res.status(502).json({ error: 'Failed to reach OpenWeatherMap.' });
    }
}
