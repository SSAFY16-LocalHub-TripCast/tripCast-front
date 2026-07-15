<template>
  <div class="page detail-page">
    <router-link :to="{ name: 'Board' }" class="back-link">← 목록으로</router-link>

    <PasswordConfirmModal
      v-model="isPasswordModalOpen"
      :title="passwordModalTitle"
      @confirm="handlePasswordConfirm"
    />

    <div v-if="loading" class="state">불러오는 중...</div>
    <div v-else-if="error" class="state error">게시글을 불러오지 못했습니다.</div>
    <div v-else class="detail-card">
      <div class="detail-header">
        <div>
          <p class="category">{{ post.category }}</p>
          <h2>{{ post.title }}</h2>
        </div>
        <div class="header-meta">
          <span class="date">{{ formatDate(post.created_at) }}</span>
          <div class="action-row">
            <button type="button" class="btn btn-edit" @click="goEdit">수정</button>
            <button type="button" class="btn btn-delete" @click="handleDelete">삭제</button>
          </div>
        </div>
      </div>

      <div v-if="post.created_at" class="time-info">
        작성 시간: {{ formatDate(post.created_at) }}
      </div>
      <div class="content">{{ post.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PasswordConfirmModal from '@/components/board/PasswordConfirmModal.vue'
import { deletePost, fetchPost, verifyPassword } from '@/services/api'

const route = useRoute()
const router = useRouter()
const post = ref({ title: '', content: '', category: '', created_at: '' })
const loading = ref(false)
const error = ref(null)
const isPasswordModalOpen = ref(false)
const passwordModalTitle = ref('비밀번호 확인')
const pendingAction = ref(null)

const loadPost = async () => {
  loading.value = true
  error.value = null
  try {
    post.value = await fetchPost(route.params.id)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(loadPost)
watch(() => route.params.id, loadPost)

const formatDate = (value) => {
  if (!value) return '시간 정보 없음'

  const normalizedValue =
    typeof value === 'string' && !/[zZ]|[+-]\d{2}:\d{2}$/.test(value) ? `${value}Z` : value

  const parsed = new Date(normalizedValue)
  if (Number.isNaN(parsed.getTime())) {
    return '시간 정보 없음'
  }

  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(parsed)
}

const openPasswordModal = (action) => {
  pendingAction.value = action
  passwordModalTitle.value = action === 'edit' ? '수정 권한 확인' : '삭제 권한 확인'
  isPasswordModalOpen.value = true
}

const goEdit = () => {
  openPasswordModal('edit')
}

const handleDelete = () => {
  openPasswordModal('delete')
}

const handlePasswordConfirm = async (password) => {
  try {
    if (pendingAction.value === 'edit') {
      await verifyPassword(route.params.id, password)
      isPasswordModalOpen.value = false
      router.push({ name: 'BoardEdit', params: { id: route.params.id } })
      return
    }

    await deletePost(route.params.id, { password })
    isPasswordModalOpen.value = false
    alert('게시글이 삭제되었습니다.')
    router.push({ name: 'Board' })
  } catch (err) {
    console.error(err)
    alert(err.message || '처리에 실패했습니다. 비밀번호를 확인해주세요.')
  }
}
</script>

<style scoped>
.page {
  padding: 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #2563eb;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.header-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.category {
  margin: 0 0 6px;
  color: #64748b;
  font-size: 0.9rem;
}

.date {
  color: #64748b;
  font-size: 0.95rem;
  white-space: nowrap;
}

.action-row {
  display: flex;
  gap: 8px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-edit {
  background: #2563eb;
  color: #fff;
}

.btn-delete {
  background: #dc2626;
  color: #fff;
}

.time-info {
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #64748b;
}

.content {
  white-space: pre-wrap;
  line-height: 1.7;
  color: #334155;
}

.state {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
}

.error {
  color: #dc2626;
}
</style>
