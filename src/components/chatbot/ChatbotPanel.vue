<template>
  <div class="chatbot-panel">
    <header>
      <span>챗봇</span>
      <button class="close" @click="$emit('close')">×</button>
    </header>
    <div class="chat-area">
      <p class="message bot">안녕하세요! 무엇을 도와드릴까요?</p>
    </div>
    <div class="input-area">
      <input type="text" placeholder="메시지를 입력하세요" />
      <button>전송</button>
    </div>
  </div>
</template>

<style scoped>
.chatbot-panel {
  width: 320px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.chatbot-panel header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #2563eb;
  color: #fff;
}
.chat-area {
  flex: 1;
  padding: 16px;
  background: #f8fbff;
  min-height: 220px;
}
.message {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 16px;
  margin-bottom: 12px;
}
.bot {
  background: #e0efff;
}
.input-area {
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #eee;
}
.input-area input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-right: 10px;
}
.input-area button {
  min-width: 68px;
  border: none;
  background: #2563eb;
  color: #fff;
  border-radius: 12px;
}
@media (max-width: 768px) {
  .chatbot-panel {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
