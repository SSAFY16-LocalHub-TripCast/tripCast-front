<template>
  <div class="weather-widget">
    <WeatherButton
      :class="{ hidden: opened }"
      @panel-open="weatherOpen = true"
      @panel-close="weatherOpen = false"
    />
  </div>

  <div class="chatbot-widget">
    <ChatbotPanel v-if="opened" @close="toggleOpen" />
    <ChatbotButton
      :class="{ hidden: opened || weatherOpen }"
      @toggle="toggleOpen"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatbotButton from './ChatbotButton.vue'
import WeatherButton from '@/components/weather/WeatherButton.vue'
import ChatbotPanel from './ChatbotPanel.vue'

const opened = ref(false)
const weatherOpen = ref(false)
const toggleOpen = () => {
  opened.value = !opened.value
}
</script>

<style scoped>
.chatbot-widget,
.weather-widget {
  --fab-right: 24px;       /* distance from right edge */
  --chatbot-bottom: 60px; /* chatbot bottom offset on desktop */
  --fab-gap: 68px;        /* vertical gap between chatbot and weather buttons */
}

.chatbot-widget {
  position: fixed;
  right: var(--fab-right);
  bottom: var(--chatbot-bottom);
  z-index: 1000;
}

.weather-widget {
  position: fixed;
  right: var(--fab-right);
  bottom: calc(var(--chatbot-bottom) + var(--fab-gap)); /* keep same gap across breakpoints */
  z-index: 1000;
}

.chatbot-widget :deep(.chatbot-button),
.weather-widget :deep(.weather-button-wrapper) {
  display: block;
}

@media (max-width: 768px) {
  /* responsive adjustments: change base chatbot bottom, keep gap constant */
  .chatbot-widget,
  .weather-widget {
    --fab-right: 14px;
    --chatbot-bottom: 90px;
  }

  .chatbot-widget {
    inset: auto;
    display: block;
  }

  .chatbot-widget :deep(.chatbot-panel) {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    max-height: 100dvh;
    border-radius: 0;
  }
}

.hidden { visibility: hidden !important; }
</style>
