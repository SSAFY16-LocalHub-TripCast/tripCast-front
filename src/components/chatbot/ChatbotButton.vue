<template>
  <button class="chatbot-button" @click="$emit('toggle')">챗봇</button>
</template>

<style scoped>
.chatbot-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(15, 118, 110, 0.25);
}

.chatbot-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(15, 118, 110, 0.32);
}

@media (max-width: 768px) {
  .chatbot-button {
    position: fixed;
    right: 16px;
    bottom: 84px;
    z-index: 1000;
  }
}
</style>
