<template>
  <div class="page board-page">
    <div class="board-header">
      <h2>게시판</h2>
      <WriteButton />
    </div>
    <BoardTable :posts="posts" />
    <Pagination :page="page" :hasNext="hasNext" @change-page="setPage" />
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
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
