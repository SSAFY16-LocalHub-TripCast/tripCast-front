<template>
  <div class="page board-page">
    <div class="board-header">
      <div>
        <p class="board-subtitle">대전의 이야기를 나누는 공간</p>
        <h2>커뮤니티 게시판</h2>
      </div>
      <WriteButton />
    </div>
    <div class="board-card">
      <BoardTable :posts="posts" />
      <Pagination :page="page" :hasNext="hasNext" @change-page="setPage" />
    </div>
    <ChatbotWidget />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import BoardTable from '@/components/board/BoardTable.vue'
import Pagination from '@/components/board/Pagination.vue'
import WriteButton from '@/components/board/WriteButton.vue'
import ChatbotWidget from '@/components/chatbot/ChatbotWidget.vue'
import { fetchPosts } from '@/services/api'

const PAGE_LIMIT = 10
const page = ref(1)
const posts = ref([])
const hasNext = ref(false)
const loading = ref(false)
const error = ref(null)

const loadBoardPosts = async () => {
  loading.value = true
  error.value = null
  try {
    const skip = (page.value - 1) * PAGE_LIMIT
    const data = await fetchPosts(skip, PAGE_LIMIT)
    console.log('[BoardPage] fetchPosts response:', data)
    console.log(
      '[BoardPage] categories:',
      data.map((p) => p.category),
    )
    posts.value = data
    hasNext.value = data.length === PAGE_LIMIT
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const setPage = (value) => {
  if (value < 1) return
  page.value = value
}

onMounted(loadBoardPosts)
watch(page, loadBoardPosts)
</script>

<style scoped>
.board-page {
  padding: 8px 0 24px;
}
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}
.board-subtitle {
  margin: 0 0 4px;
  color: #0f766e;
  font-size: 0.9rem;
  font-weight: 700;
}
.board-header h2 {
  margin: 0;
  color: #0f172a;
}
.board-card {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

@media (max-width: 768px) {
  .board-page {
    padding: 4px 0 20px;
  }

  .board-header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .board-card {
    padding: 12px;
    border-radius: 14px;
  }
}
</style>
