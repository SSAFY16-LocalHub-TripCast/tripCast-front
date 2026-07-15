<template>
  <div class="chatbot-widget">
    <ChatbotPanel v-if="opened" @close="toggleOpen" />
    <ChatbotButton v-else @toggle="toggleOpen" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatbotButton from './ChatbotButton.vue'
import ChatbotPanel from './ChatbotPanel.vue'

const opened = ref(false)
const toggleOpen = () => {
  opened.value = !opened.value
}
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  right: 24px;
  bottom: 92px;
  z-index: 1000;
}

@media (max-width: 768px) {
  .chatbot-widget {
    right: 16px;
    bottom: 84px;
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
</style>
