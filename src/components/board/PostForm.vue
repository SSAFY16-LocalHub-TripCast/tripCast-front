<template>
  <form class="post-form" @submit.prevent="submitPost">
    <div class="form-card">
      <label>
        제목
        <input v-model="title" type="text" placeholder="제목을 입력하세요" />
      </label>
      <label>
        내용
        <textarea v-model="content" placeholder="내용을 입력하세요"></textarea>
      </label>
      <label>
        {{ isEdit ? '새 비밀번호(선택)' : '비밀번호' }}
        <input
          v-model="password"
          type="password"
          :placeholder="isEdit ? '비밀번호를 변경하려면 입력하세요' : '비밀번호를 입력하세요'"
        />
      </label>
      <div class="button-row">
        <button type="submit">등록</button>
        <button type="button" @click="cancel">취소</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createPost, fetchPost, updatePost } from '@/services/api'

const props = defineProps({
  postId: {
    type: [String, Number],
    default: null,
  },
})

const title = ref('')
const content = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const isEdit = computed(() => props.postId != null)

const loadPost = async () => {
  if (!props.postId) return
  try {
    const data = await fetchPost(props.postId)
    title.value = data.title
    content.value = data.content
  } catch (err) {
    error.value = err
    console.error(err)
  }
}

const submitPost = async () => {
  if (!title.value || !content.value) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  if (!isEdit.value && !password.value) {
    alert('비밀번호를 입력해주세요.')
    return
  }

  try {
    if (isEdit.value) {
      const updatePayload = {
        title: title.value,
        content: content.value,
      }

      if (password.value) {
        updatePayload.password = password.value
      }

      await updatePost(props.postId, updatePayload)
    } else {
      await createPost({ title: title.value, content: content.value, password: password.value })
    }
    router.push('/board')
  } catch (err) {
    console.error(err)
    alert(err.message || '게시글 저장에 실패했습니다.')
  }
}

const cancel = () => {
  router.push('/board')
}

onMounted(loadPost)
</script>

<style scoped>
.post-form {
  max-width: 760px;
  width: 100%;
}
.form-card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}
.post-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 700;
  color: #334155;
}
.post-form input,
.post-form textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 1rem;
  box-sizing: border-box;
}
.post-form textarea {
  min-height: 220px;
  resize: vertical;
}
.post-form input:focus,
.post-form textarea:focus {
  outline: none;
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
}
.button-row {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}
.button-row button {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  cursor: pointer;
  font-weight: 700;
}
.button-row button:last-child {
  background: #64748b;
}

@media (max-width: 768px) {
  .form-card {
    padding: 18px;
    gap: 14px;
    border-radius: 14px;
  }

  .post-form input,
  .post-form textarea {
    padding: 12px 14px;
  }

  .button-row {
    flex-direction: column;
    gap: 10px;
  }

  .button-row button {
    width: 100%;
  }
}
</style>
