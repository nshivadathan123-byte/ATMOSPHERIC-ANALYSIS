let currentUnit = 'C';
let lastLat = null, lastLon = null, lastCity = '';

function getWeatherIcon(iconName) {
    if (!iconName) {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--tomato)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <circle cx="12" cy="12" r="10" stroke-dasharray="4 2"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
        </svg>`;
    }
    if (iconName === '01d') {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <circle cx="12" cy="12" r="5" fill="rgba(255,170,0,0.15)"/>
            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            <circle cx="12" cy="12" r="9" stroke="var(--gold)" stroke-dasharray="3 2" stroke-width="0.8" opacity="0.5"/>
        </svg>`;
    }
    if (iconName === '01n') {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--african-violet)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="rgba(204,153,255,0.15)"/>
            <line x1="12" y1="12" x2="16" y2="8" stroke="var(--african-violet)" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6"/>
            <circle cx="16" cy="8" r="1" fill="var(--african-violet)"/>
        </svg>`;
    }
    if (iconName === '02d' || iconName === '03d') {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--butterscotch)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M19.07 4.93l-1.41 1.41" opacity="0.6"/>
            <circle cx="12" cy="12" r="4" stroke="var(--gold)" fill="rgba(255,170,0,0.1)"/>
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" stroke="var(--ice)" fill="rgba(153,204,255,0.1)" stroke-width="1.8"/>
        </svg>`;
    }
    if (iconName === '02n' || iconName === '03n' || iconName.startsWith('04')) {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--ice)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <path d="M18 10h-1.26A8 8 0 1 0 4 16.25h14a5 5 0 0 0 0-10z" fill="rgba(153,204,255,0.15)"/>
            <path d="M7 16h10" stroke="var(--ice)" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>
        </svg>`;
    }
    if (iconName.startsWith('09') || iconName.startsWith('10')) {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--bluey)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <path d="M18 10h-1.26A8 8 0 1 0 4 16.25h14a5 5 0 0 0 0-10z" fill="rgba(136,153,255,0.1)"/>
            <line x1="8" y1="18" x2="6" y2="21" stroke="var(--bluey)" stroke-width="1.5"/>
            <line x1="12" y1="18" x2="10" y2="21" stroke="var(--bluey)" stroke-width="1.5"/>
            <line x1="16" y1="18" x2="14" y2="21" stroke="var(--bluey)" stroke-width="1.5"/>
        </svg>`;
    }
    if (iconName.startsWith('11')) {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--peach)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <path d="M18 10h-1.26A8 8 0 1 0 4 16.25h14a5 5 0 0 0 0-10z" fill="rgba(255,136,102,0.1)"/>
            <path d="M13 14l-3 3h4l-2 4" stroke="var(--tomato)" stroke-width="1.8" stroke-linejoin="miter"/>
        </svg>`;
    }
    if (iconName.startsWith('13')) {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--ice)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <path d="M12 2v20M17 5L7 19M19 17L5 7" />
            <circle cx="12" cy="12" r="3.5" stroke="var(--ice)" fill="none" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6"/>
            <path d="M9 4h6M9 20h6M4 9v6M20 9v6" stroke-width="1.5"/>
        </svg>`;
    }
    if (iconName.startsWith('50')) {
        return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--sunflower)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <line x1="4" y1="6" x2="20" y2="6" stroke-width="1.5" />
            <line x1="2" y1="11" x2="22" y2="11" stroke-width="1.8" opacity="0.75" />
            <line x1="6" y1="15" x2="18" y2="15" stroke-width="1" stroke-dasharray="3 2" />
            <line x1="3" y1="19" x2="21" y2="19" stroke-width="1.5" opacity="0.85" />
        </svg>`;
    }
    return `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
        <circle cx="12" cy="12" r="10" stroke-dasharray="4 2"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
    </svg>`;
}

function updateStardate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    document.getElementById('stardate').textContent = `${day}${month}${year}`;
    const logoTimeEl = document.getElementById('logo-time');
    if (logoTimeEl) logoTimeEl.textContent = now.toTimeString().split(' ')[0];
}

function setUnit(unit) {
    currentUnit = unit;
    document.getElementById('unit-c').classList.toggle('active', unit === 'C');
    document.getElementById('unit-f').classList.toggle('active', unit === 'F');
    if (lastLat !== null && lastLon !== null) {
        fetchWeather('', true, lastLat, lastLon);
    }
}

async function searchWeather() {
    const input = document.getElementById('city-search');
    const city = input.value.trim();
    if (!city) return;
    showState('loading');
    await fetchWeather(city, false);
}

document.getElementById('city-search').addEventListener('keydown', e => {
    if (e.key === 'Enter') searchWeather();
});

function showState(state) {
    ['welcome-state', 'loading-state', 'error-state', 'weather-display'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    const map = { welcome: 'welcome-state', loading: 'loading-state', error: 'error-state', weather: 'weather-display' };
    if (map[state]) document.getElementById(map[state]).style.display = 'flex';
}

async function fetchWeather(query, isCoords = false, lat = null, lon = null) {
    try {
        const units = currentUnit === 'C' ? 'metric' : 'imperial';
        const unitSym = currentUnit === 'C' ? '°C' : '°F';
        const speedLabel = currentUnit === 'C' ? 'km/h' : 'mph';

        let weatherUrl, forecastUrl;
        if (isCoords) {
            weatherUrl = `/api/weather?type=current&lat=${lat}&lon=${lon}&units=${units}`;
            forecastUrl = `/api/weather?type=forecast&lat=${lat}&lon=${lon}&units=${units}`;
        } else {
            weatherUrl = `/api/weather?type=current&q=${encodeURIComponent(query)}&units=${units}`;
            forecastUrl = `/api/weather?type=forecast&q=${encodeURIComponent(query)}&units=${units}`;
        }

        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) {
            if (weatherRes.status === 401) throw new Error('API key error — check Vercel env vars');
            if (weatherRes.status === 404) throw new Error('Location not found');
            throw new Error('Weather data unavailable');
        }
        const current = await weatherRes.json();

        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) throw new Error('Forecast unavailable');
        const forecast = await forecastRes.json();

        updateUI(current, forecast, unitSym, speedLabel);
        showState('weather');
        updateBackground(current.weather[0].icon);
        document.getElementById('sidebar-status').textContent = 'ONLINE';
        saveToHistory(current.name);

        lastLat = current.coord.lat;
        lastLon = current.coord.lon;
        lastCity = current.name;
    } catch (err) {
        document.getElementById('error-text').textContent = err.message.toUpperCase();
        showState('error');
        document.getElementById('sidebar-status').textContent = 'ERROR';
    }
}

function degToCompass(deg) {
    if (deg === undefined || deg === null) return 'N/A';
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return dirs[Math.round(deg / 22.5) % 16];
}

function formatTime(epochSeconds, timezoneOffsetSeconds) {
    if (!epochSeconds) return '--:--';
    try {
        const targetDate = new Date(epochSeconds * 1000 + timezoneOffsetSeconds * 1000);
        return `${String(targetDate.getUTCHours()).padStart(2, '0')}:${String(targetDate.getUTCMinutes()).padStart(2, '0')}`;
    } catch (e) {
        return '--:--';
    }
}

function updateLocalTimeClock(timezoneOffsetSeconds) {
    function tick() {
        const now = new Date();
        const local = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + timezoneOffsetSeconds * 1000);
        document.getElementById('pw-localtime').textContent = local.toTimeString().split(' ')[0];
    }
    tick();
    if (window._ltInterval) clearInterval(window._ltInterval);
    window._ltInterval = setInterval(tick, 1000);
}

function getDailyForecasts(list) {
    const dailyMap = {};
    const todayStr = new Date().toISOString().split('T')[0];
    list.forEach(item => {
        const dateStr = item.dt_txt.split(' ')[0];
        if (dateStr === todayStr) return;
        if (!dailyMap[dateStr] || item.dt_txt.includes('12:00:00')) {
            dailyMap[dateStr] = item;
        }
    });
    return Object.values(dailyMap).slice(0, 5);
}

function updateUI(c, f, unitSym, speedLabel) {
    const isMetric = currentUnit === 'C';

    document.getElementById('pw-location').textContent = c.name;
    document.getElementById('pw-country').textContent = c.sys.country || '';

    document.getElementById('pw-icon').innerHTML = `<span class="pc-emoji">${getWeatherIcon(c.weather[0].icon)}</span>`;
    document.getElementById('pw-condition').textContent = c.weather[0].description.toUpperCase();

    document.getElementById('pw-temp').textContent = `${Math.round(c.main.temp)}${unitSym}`;
    document.getElementById('pw-feels').textContent = `${Math.round(c.main.feels_like)}${unitSym}`;
    document.getElementById('pw-high').textContent = `H: ${Math.round(c.main.temp_max)}${unitSym}`;
    document.getElementById('pw-low').textContent = `L: ${Math.round(c.main.temp_min)}${unitSym}`;

    updateLocalTimeClock(c.timezone);

    const windVal = isMetric ? c.wind.speed * 3.6 : c.wind.speed;
    document.getElementById('sidebar-humidity').textContent = `${c.main.humidity}%`;
    document.getElementById('sidebar-wind').textContent = `${Math.round(windVal)} ${speedLabel}`;
    document.getElementById('sidebar-pressure').textContent = `${Math.round(c.main.pressure)}`;
    document.getElementById('sidebar-clouds').textContent = `${c.clouds.all}%`;

    const sunrise = formatTime(c.sys.sunrise, c.timezone);
    const sunset = formatTime(c.sys.sunset, c.timezone);
    document.getElementById('sidebar-sunrise').textContent = sunrise;
    document.getElementById('sidebar-sunset').textContent = sunset;

    document.getElementById('dc-wind-speed').textContent = `${Math.round(windVal)} ${speedLabel}`;
    document.getElementById('dc-wind-dir').textContent = `${degToCompass(c.wind.deg)} (${c.wind.deg || 0}°)`;
    document.getElementById('dc-humidity').textContent = `${c.main.humidity}%`;
    document.getElementById('dc-pressure').textContent = `${Math.round(c.main.pressure)} hPa`;
    document.getElementById('dc-cloud-val').textContent = `${c.clouds.all}%`;

    const precipVal = (c.rain && c.rain['1h']) ? c.rain['1h'] : ((c.snow && c.snow['1h']) ? c.snow['1h'] : 0);
    document.getElementById('dc-precip').textContent = `${precipVal} mm`;
    document.getElementById('dc-sunrise-val').textContent = sunrise;
    document.getElementById('dc-sunset-val').textContent = sunset;

    renderForecast(getDailyForecasts(f.list), unitSym);
}

function renderForecast(forecastDays, unitSym) {
    const grid = document.getElementById('forecast-grid');
    grid.innerHTML = '';
    forecastDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="fc-header">${date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()} <span class="fc-date-inline">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
            <div class="fc-body">
                <div class="fc-icon"><span class="fc-emoji">${getWeatherIcon(day.weather[0].icon)}</span></div>
                <div class="fc-info">
                    <div class="fc-temps">
                        <span class="fc-temp-high">${Math.round(day.main.temp_max)}${unitSym}</span>
                        <span class="fc-temp-low">${Math.round(day.main.temp_min)}${unitSym}</span>
                    </div>
                    <div class="fc-condition">${day.weather[0].main.toUpperCase()}</div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function updateBackground(iconCode) {
    document.body.className = '';
    if (iconCode.startsWith('01')) document.body.classList.add('weather-clear');
    else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) document.body.classList.add('weather-clouds');
    else if (iconCode.startsWith('50')) document.body.classList.add('weather-mist');
    else if (iconCode.startsWith('09') || iconCode.startsWith('10')) document.body.classList.add('weather-rain');
    else if (iconCode.startsWith('13')) document.body.classList.add('weather-snow');
    else document.body.classList.add('weather-thunderstorm');
}

function updateRecentScansUI() {
    const listEl = document.getElementById('recent-scans-list');
    if (!listEl) return;
    const recents = JSON.parse(localStorage.getItem('recent_scans') || '[]');
    if (recents.length === 0) {
        listEl.innerHTML = '<div class="no-recents-text">NO RECENT SCANS RECORDED</div>';
        return;
    }
    listEl.innerHTML = '';
    recents.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'recent-item-btn';
        btn.innerHTML = `<span>${city.toUpperCase()}</span> <span style="font-size: 0.75rem; opacity: 0.7;">⌕</span>`;
        btn.onclick = () => {
            const input = document.getElementById('city-search');
            if (input) { input.value = city; searchWeather(); }
        };
        listEl.appendChild(btn);
    });
}

function saveToHistory(city) {
    if (!city) return;
    let recents = JSON.parse(localStorage.getItem('recent_scans') || '[]');
    recents = recents.filter(c => c.toLowerCase() !== city.toLowerCase());
    recents.unshift(city);
    if (recents.length > 3) recents = recents.slice(0, 3);
    localStorage.setItem('recent_scans', JSON.stringify(recents));
    updateRecentScansUI();
}

function clearHistory() {
    localStorage.removeItem('recent_scans');
    updateRecentScansUI();
}

function resetTelemetry() {
    document.getElementById('city-search').value = '';
    document.getElementById('sidebar-status').textContent = 'STANDBY';
    ['sidebar-humidity', 'sidebar-wind', 'sidebar-pressure', 'sidebar-clouds', 'sidebar-sunrise', 'sidebar-sunset']
        .forEach(id => document.getElementById(id).textContent = '--');
    showState('welcome');
    document.body.className = '';
}

function quickScan(city) {
    const input = document.getElementById('city-search');
    if (input) { input.value = city; searchWeather(); }
}

updateStardate();
updateRecentScansUI();
setInterval(updateStardate, 1000);
