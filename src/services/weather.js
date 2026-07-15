const OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5/weather'

export async function fetchWeather({ lat, lon }) {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!key) {
    throw new Error('OpenWeather API key is not set (VITE_OPENWEATHER_API_KEY)')
  }
  const params = new URLSearchParams({ lat: String(lat), lon: String(lon), appid: key })
  const res = await fetch(`${OPENWEATHER_BASE}?${params}`)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Weather fetch failed: ${res.status} ${text}`)
  }
  return res.json()
}

export function kelvinToCelsius(k) {
  return Math.round((k - 273.15) * 10) / 10
}
