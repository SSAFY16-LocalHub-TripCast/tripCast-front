<template>
  <div class="chatbot-panel">
    <header>
      <span>챗봇</span>
      <button class="close" @click="$emit('close')">×</button>
    </header>

    <div ref="chatArea" class="chat-area">
      <div
        v-for="(message, index) in messages"
        :key="`${message.role}-${index}`"
        class="message-row"
        :class="message.role"
      >
        <template v-if="message.role === 'user'">
          <div class="message user-message">{{ message.text }}</div>
          <div class="profile user">
            <div class="profile-icon">👤</div>
            <span class="profile-label">사용자</span>
          </div>
        </template>
        <template v-else>
          <div class="profile bot">
            <div class="profile-icon">🤖</div>
            <span class="profile-label">챗봇</span>
          </div>
          <div class="message bot-message">{{ message.text }}</div>
        </template>
      </div>

      <div v-if="isLoading" class="message-row bot">
        <div class="profile bot">
          <div class="profile-icon">🤖</div>
          <span class="profile-label">챗봇</span>
        </div>
        <div class="message bot typing-bubble" aria-label="응답 대기 중">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="inputText"
        type="text"
        placeholder="메시지를 입력하세요"
        :disabled="isLoading"
        @keyup.enter="sendMessage"
      />
      <button :disabled="isLoading" @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { sendChatbotMessage } from '@/services/api'

const emit = defineEmits(['close'])

const messages = ref([{ role: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }])
const inputText = ref('')
const isLoading = ref(false)
const chatArea = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (chatArea.value) {
      chatArea.value.scrollTop = chatArea.value.scrollHeight
    }
  })
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  messages.value.push({ role: 'user', text })
  inputText.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const data = await sendChatbotMessage(text)
    const answer = data?.answer || '죄송합니다. AI 서버에 문제가 생겼습니다.'

    messages.value.push({ role: 'bot', text: answer })
  } catch (error) {
    console.error(error)
    messages.value.push({ role: 'bot', text: '죄송합니다. AI 서버에 문제가 생겼습니다.' })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.chatbot-panel {
  width: 360px;
  height: 560px;
  max-height: 82vh;
  border-radius: 24px;
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
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
}
.close {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
}
.chat-area {
  flex: 1;
  padding: 16px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%);
  min-height: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.message-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
}
.message-row.user {
  justify-content: flex-end;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 42px;
  gap: 4px;
  flex-shrink: 0;
}
.profile-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
}
.profile.user .profile-icon {
  background: #dbeafe;
}
.profile.bot .profile-icon {
  background: #e0f2fe;
}
.profile-label {
  font-size: 0.7rem;
  color: #64748b;
  text-align: center;
}
.message {
  position: relative;
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
  overflow: visible;
}
.message.bot-message {
  border-radius: 16px 16px 16px 8px;
  background: #fff;
  color: #0f172a;
}
.message.user-message {
  border-radius: 16px 16px 8px 16px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
}
.message.bot-message::before {
  content: '';
  position: absolute;
  left: -7px;
  bottom: 7px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 7px solid #fff;
  pointer-events: none;
}
.message.user-message::after {
  content: '';
  position: absolute;
  right: -7px;
  bottom: 7px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid #3b82f6;
  pointer-events: none;
}
.typing-bubble {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  animation: bob 0.9s ease-in-out infinite;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #64748b;
  display: inline-block;
}
.dot:nth-child(2) {
  animation-delay: 0.15s;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
}
.input-area {
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: #fff;
}
.input-area input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-right: 10px;
  font-size: 0.95rem;
}
.input-area button {
  min-width: 68px;
  border: none;
  background: #2563eb;
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
}
.input-area button:disabled,
.input-area input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
@media (max-width: 768px) {
  .chatbot-panel {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
}
</style>
