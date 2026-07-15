<template>
  <div v-if="modelValue" class="modal-backdrop" @click.self="close">
    <div class="modal-card">
      <h3>{{ title }}</h3>
      <p class="description">본인 확인을 위해 비밀번호를 입력해주세요.</p>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        @keyup.enter="confirm"
      />
      <div class="button-row">
        <button type="button" class="confirm" @click="confirm">확인</button>
        <button type="button" class="cancel" @click="close">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '비밀번호 확인',
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const password = ref('')

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      password.value = ''
    }
  },
)

const close = () => {
  emit('update:modelValue', false)
}

const confirm = () => {
  if (!password.value.trim()) {
    alert('비밀번호를 입력해주세요.')
    return
  }
  emit('confirm', password.value)
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  width: min(420px, 90vw);
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
}

h3 {
  margin: 0 0 8px;
}

.description {
  margin: 0 0 16px;
  color: #64748b;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.button-row {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
}

.confirm {
  background: #2563eb;
  color: #fff;
}

.cancel {
  background: #e5e7eb;
  color: #111827;
}
</style>
