<template>
  <section class="recent-posts">
    <div class="section-title">
      <h3>최근 게시글</h3>
      <span>지금 가장 활발한 이야기</span>
    </div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <span class="title">{{ post.title }}</span>
        <span class="date">{{ formatDate(post.created_at) }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchPosts } from '@/services/api'

const posts = ref([])
const loading = ref(false)
const error = ref(null)

const loadRecentPosts = async () => {
  loading.value = true
  error.value = null
  try {
    posts.value = await fetchPosts(0, 5)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const formatDate = (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString()
}

onMounted(loadRecentPosts)
</script>

<style scoped>
.recent-posts {
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.section-title h3 {
  margin: 0;
  color: #0f172a;
}
.section-title span {
  color: #0f766e;
  font-size: 0.9rem;
  font-weight: 600;
}
.recent-posts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.recent-posts li {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  transition:
    background-color 0.2s ease,
    padding-left 0.2s ease;
}
.recent-posts li:hover {
  background-color: #f8fafc;
  padding-left: 6px;
}
.recent-posts li:last-child {
  border-bottom: none;
}
.title {
  font-weight: 600;
  color: #334155;
}
.date {
  color: #64748b;
  font-size: 0.9rem;
}
</style>
