<template>
  <div class="modal-backdrop">
    <div class="password-modal">
      <h3>비밀번호 확인</h3>
      <input v-model="password" type="password" placeholder="비밀번호를 입력하세요" />
      <div class="button-row">
        <button @click="confirm">확인</button>
        <button @click="close">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { updatePost } from '@/services/api'

const password = ref('')
const router = useRouter()

const confirm = async () => {
  const postId = router.currentRoute.value.params.id
  if (!postId) {
    alert('잘못된 게시글입니다.')
    return
  }

  try {
    await updatePost(postId, { password: password.value })
    router.push('/board')
  } catch (err) {
    console.error(err)
    alert('비밀번호 확인 또는 수정에 실패했습니다.')
  }
}

const close = () => {
  router.push('/board')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
}
.password-modal {
  width: min(420px, 90vw);
  padding: 24px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
}
.password-modal h3 {
  margin-bottom: 18px;
}
.password-modal input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  margin-bottom: 18px;
}
.button-row {
  display: flex;
  gap: 12px;
}
.button-row button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: #fff;
  background: #2563eb;
}
.button-row button:last-child {
  background: #6b7280;
}
</style>
