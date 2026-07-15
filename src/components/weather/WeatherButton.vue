<template>
  <div class="weather-button-wrapper">
    <button
      class="weather-fab"
      :class="{ open: opened }"
      @click="toggle"
      aria-label="날씨"
    >
      <span class="icon">☀️</span>
    </button>

    <div v-if="opened" class="weather-modal open">
      <div class="modal-inner chatbot-like">
        <header class="chat-header">
          <span class="loc">{{ locationName }}</span>
          <button class="close" @click="close">×</button>
        </header>
        <div class="modal-body">
          <div class="left">
            <div class="visual" :class="weatherMain">
              <svg v-if="weatherMain === 'Clear'" class="sun" viewBox="0 0 64 64" aria-hidden>
                <circle cx="32" cy="32" r="12" fill="#FFD166" />
                <g stroke="#FFD166" stroke-width="2" stroke-linecap="round">
                  <line x1="32" y1="2" x2="32" y2="14" />
                  <line x1="32" y1="50" x2="32" y2="62" />
                  <line x1="2" y1="32" x2="14" y2="32" />
                  <line x1="50" y1="32" x2="62" y2="32" />
                  <line x1="10" y1="10" x2="18" y2="18" />
                  <line x1="46" y1="46" x2="54" y2="54" />
                  <line x1="10" y1="54" x2="18" y2="46" />
                  <line x1="46" y1="18" x2="54" y2="10" />
                </g>
              </svg>
              <svg v-else-if="weatherMain === 'Clouds'" class="clouds" viewBox="0 0 64 64" aria-hidden>
                <g fill="#E6EEF2">
                  <ellipse cx="30" cy="36" rx="18" ry="10" />
                  <ellipse cx="44" cy="32" rx="12" ry="8" />
                </g>
              </svg>
              <svg v-else-if="weatherMain === 'Rain' || weatherMain === 'Drizzle'" class="rain" viewBox="0 0 64 64" aria-hidden>
                <g fill="#D0E2EF">
                  <ellipse cx="30" cy="24" rx="16" ry="10" />
                </g>
                <g class="drops" fill="#60A5FA">
                  <path d="M22 42c0 4 4 6 4 6s4-2 4-6-4-6-4-6-4 2-4 6z" />
                  <path d="M34 42c0 4 4 6 4 6s4-2 4-6-4-6-4-6-4 2-4 6z" />
                </g>
              </svg>
              <svg v-else-if="weatherMain === 'Snow'" class="snow" viewBox="0 0 64 64" aria-hidden>
                <g fill="#F0F9FF">
                  <ellipse cx="30" cy="24" rx="16" ry="10" />
                </g>
                <g class="flakes" fill="#E6F0FA">
                  <circle cx="24" cy="44" r="2.5" />
                  <circle cx="34" cy="48" r="2.5" />
                </g>
              </svg>
              <svg v-else-if="weatherMain === 'Thunderstorm'" class="thunder" viewBox="0 0 64 64" aria-hidden>
                <g fill="#CBD5E1">
                  <ellipse cx="30" cy="24" rx="16" ry="10" />
                </g>
                <polygon points="30,34 38,34 32,46 40,46 28,62 30,46 22,46" fill="#F97316" />
              </svg>
              <img v-else-if="iconUrl" :src="iconUrl" alt="icon" />
              <div v-else class="emoji">{{ weatherEmoji }}</div>
            </div>
          </div>
          <div class="right">
            <div class="top-row">
              <div class="temp">{{ tempC }}°C</div>
              <div class="badge" :class="suitabilityLevel">{{ suitabilityLabel }}</div>
            </div>
            <div class="desc">{{ translatedDesc }}</div>
            <div class="travel">{{ travelSuggestion }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { fetchWeather, kelvinToCelsius } from '@/services/weather'

const opened = ref(false)
const emit = defineEmits(['panel-open','panel-close'])
const weather = ref(null)
const loading = ref(false)
const error = ref(null)

const CACHE_KEY = 'weather_daejeon_v1'
const ONE_HOUR = 1000 * 60 * 60

function updateVh() {
  try {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  } catch (e) {
    /* noop */
  }
}

onMounted(() => {
  updateVh()
  window.addEventListener('resize', updateVh)
})
onUnmounted(() => window.removeEventListener('resize', updateVh))

async function loadWeather(force = false) {
  loading.value = true
  try {
    if (!force) {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && parsed.ts && Date.now() - parsed.ts < ONE_HOUR) {
          weather.value = parsed.data
          loading.value = false
          return
        }
      }
    }
    const data = await fetchWeather({ lat: 36.3504, lon: 127.384 })
    weather.value = data
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }))
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

function toggle() {
  opened.value = !opened.value
  if (opened.value) loadWeather(true)
  if (opened.value) emit('panel-open')
  else emit('panel-close')
}
function close() { opened.value = false; emit('panel-close') }

const tempC = computed(() => (weather.value && weather.value.main ? kelvinToCelsius(weather.value.main.temp) : '—'))
const weatherMain = computed(() => (weather.value && weather.value.weather ? weather.value.weather[0].main : ''))
const weatherEmoji = computed(() => {
  const w = weatherMain.value
  if (!w) return '—'
  if (w === 'Clear') return '☀️'
  if (w === 'Clouds') return '☁️'
  if (w === 'Rain' || w === 'Drizzle') return '🌧️'
  if (w === 'Thunderstorm') return '⛈️'
  if (w === 'Snow') return '❄️'
  return '🌤️'
})

const iconUrl = computed(() => {
  if (!weather.value || !weather.value.weather) return ''
  const code = weather.value.weather[0].icon
  return `https://openweathermap.org/img/wn/${code}@4x.png`
})

function translateDescription(desc) {
  if (!desc) return ''
  const d = desc.toLowerCase()
  const map = {
    'broken clouds': '구름 많음',
    'clear sky': '맑음',
    'few clouds': '약간의 구름',
    'scattered clouds': '드문드문 구름',
    'overcast clouds': '흐림',
    'light rain': '약한 비',
    'rain': '비',
    'snow': '눈',
  }
  return map[d] || desc
}

const translatedDesc = computed(() => (weather.value && weather.value.weather ? translateDescription(weather.value.weather[0].description) : ''))

const locationName = computed(() => (weather.value && weather.value.name ? (weather.value.name === 'Daejeon' ? '대전' : weather.value.name) : ''))

const travelSuggestion = computed(() => {
  if (!weather.value) return ''
  const w = weatherMain.value
  const t = Number(tempC.value)
  const hasTemp = Number.isFinite(t)
  if (w === 'Thunderstorm') return '뇌우 예상 — 여행 비권장'
  if (w === 'Snow') return hasTemp && t <= 0 ? '눈 & 매우 추움 — 야외 주의' : '눈 — 안전 유의'
  if (w === 'Rain' || w === 'Drizzle') return '비 — 우산 필수'
  if (w === 'Clear') {
    if (hasTemp && t >= 15 && t <= 25) return '최적 — 여행하기 좋은 날입니다.'
    if (hasTemp && t > 25) return '좋음 — 더울 수 있으니 물 챙기기'
    return '맑음'
  }
  if (w === 'Clouds') return '구름 — 야외 활동 가능'
  return ''
})

const suitabilityLevel = computed(() => {
  if (!weather.value) return ''
  const w = weatherMain.value
  const t = Number(tempC.value)
  if (w === 'Thunderstorm') return 'danger'
  if (w === 'Snow' && Number.isFinite(t) && t <= 0) return 'caution'
  if (w === 'Rain' || w === 'Drizzle') return 'caution'
  if (w === 'Clear' && Number.isFinite(t) && t >= 15 && t <= 25) return 'excellent'
  if (w === 'Clear' && Number.isFinite(t) && t > 25 && t <= 30) return 'good'
  if (w === 'Clouds' && Number.isFinite(t) && t >= 15 && t <= 25) return 'good'
  return 'normal'
})

const suitabilityLabel = computed(() => {
  const level = suitabilityLevel.value
  if (level === 'excellent') return '최적'
  if (level === 'good') return '양호'
  if (level === 'caution') return '주의'
  if (level === 'danger') return '위험'
  return '보통'
})
</script>

<style scoped>
.weather-button-wrapper {
  position: relative;
}
.weather-fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg,#06b6d4 0%, #0ea5a4 100%);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(14,165,164,0.18);
  transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-fab.open { transform: scale(0.9) rotate(-8deg); box-shadow: 0 18px 40px rgba(14,165,164,0.26); }
.weather-fab .icon { font-size: 20px; }

    .weather-modal {
  position: fixed;
  right: 24px; /* align with chatbot widget */
  bottom: 92px;
  width: 64px;
  height: 64px;
  pointer-events: none;
  overflow: visible;
  transition: all 420ms cubic-bezier(.2,.9,.2,1);
}
.weather-modal .modal-inner {
  width: 100%;
  height: 100%;
}
.weather-modal.open {
  width: 360px;
  height: 220px; /* compact height per request */
  max-height: 70vh;
  pointer-events: auto;
  transform-origin: bottom right;
  z-index: 1400;
}
.weather-modal .modal-inner {
  background: #fff;
  border-radius: 24px;
  padding: 0;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
  border: none;
  backdrop-filter: none;
  /* start small near the button */
  transform-origin: bottom right;
  transform: translateY(10px) scale(0.4);
  opacity: 0;
  transition: transform 260ms cubic-bezier(.2,.9,.2,1), opacity 200ms ease;
}
.weather-modal.open .modal-inner { transform: translateY(0) scale(1); opacity: 1 }

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}
.chat-header .loc { font-weight:700 }
.chat-header .close { background: transparent; border: none; color: #fff; font-size: 1.1rem; cursor: pointer }
.modal-body { display:flex; gap:14px; align-items:center; padding: 18px }
.modal-body .left { width:120px; display:flex; align-items:center; justify-content:center }
.modal-body .left img { width:96px; height:96px }
.visual svg { width:96px; height:96px }
.visual .emoji { font-size:48px }
.modal-body .right { flex:1 }
.modal-body .right .top-row { display:flex; align-items:center; gap:12px }
.modal-body .right .temp { font-size:28px; font-weight:900 }
.modal-body .right .desc { color:var(--color-muted); margin-top:6px }
.modal-body .right .travel { margin-top:10px; color:var(--color-primary); font-weight:800 }

.badge { padding:6px 10px; border-radius:999px; font-weight:800; font-size:0.85rem }
.badge.excellent { background: linear-gradient(90deg,#16a34a,#86efac); color:#052e10 }
.badge.good { background: linear-gradient(90deg,#06b6d4,#7dd3fc); color:#023047 }
.badge.normal { background: linear-gradient(90deg,#e2e8f0,#f8fafc); color:#0f172a }
.badge.caution { background: linear-gradient(90deg,#f59e0b,#ffd29a); color:#4a2700 }
.badge.danger { background: linear-gradient(90deg,#ef4444,#ffb4b4); color:#390000 }

/* Fancy pulse */
.weather-modal::before {
  content: '';
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14,165,164,0.18) 0%, rgba(14,165,164,0.06) 40%, transparent 70%);
  opacity: 0;
  transition: opacity 260ms;
}
.weather-modal.open::before { opacity: 1; animation: pulse 1200ms infinite; }

/* arrow removed: keep UI clean */
@keyframes pulse { 0% { transform:scale(0.9); opacity:0.8 } 70% { transform:scale(1.6); opacity:0 } 100% { transform:scale(1.8); opacity:0 } }

@media (max-width: 768px) {

  .weather-modal.open {
    position: fixed;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1600;
    border-radius: 0;
  }

  .weather-modal .modal-inner {
    width: 100%;
    height: 100%;
    border-radius: 0;
    transform: none; /* disable scale animation on mobile for full-screen */
    opacity: 1;
    /* ensure modal fills dynamic viewport on mobile when addressing mobile browser UI chrome */
    min-height: calc(var(--vh, 1vh) * 100);
  }

  .weather-modal .chat-header { border-radius: 0 }
}
</style>
