<template>
  <button class="chatbot-button" @click="$emit('toggle')">챗봇</button>
</template>

<style scoped>
.chatbot-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.24);
}
</style>
