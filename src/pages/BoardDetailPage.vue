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
  padding: 20px 0 32px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  color: #0f766e;
  text-decoration: none;
  font-weight: 700;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.header-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 180px;
}

.category {
  margin: 0 0 8px;
  color: #0f766e;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.detail-header h2 {
  margin: 0;
  color: #0f172a;
  line-height: 1.35;
  word-break: break-word;
}

.date {
  color: #64748b;
  font-size: 0.95rem;
  white-space: nowrap;
}

.action-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  border: none;
  border-radius: 999px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-edit {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  color: #fff;
  box-shadow: 0 8px 16px rgba(15, 118, 110, 0.16);
}

.btn-delete {
  background: #ef4444;
  color: #fff;
}

.time-info {
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #64748b;
}

.content {
  white-space: pre-wrap;
  line-height: 1.8;
  color: #334155;
  font-size: 1rem;
  padding: 4px 0;
}

.state {
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.error {
  color: #dc2626;
}

@media (max-width: 768px) {
  .page {
    padding: 12px 0 24px;
  }

  .detail-card {
    padding: 18px;
  }

  .detail-header {
    flex-direction: column;
  }

  .header-meta {
    width: 100%;
    align-items: flex-start;
    min-width: 0;
  }

  .action-row {
    width: 100%;
  }

  .btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
