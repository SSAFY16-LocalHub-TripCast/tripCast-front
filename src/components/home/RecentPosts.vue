<template>
  <section class="recent-posts">
    <h3>최근 게시글</h3>
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
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
.recent-posts h3 {
  margin-bottom: 12px;
}
.recent-posts li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.recent-posts li:last-child {
  border-bottom: none;
}
.title {
  font-weight: 500;
}
.date {
  color: #777;
  font-size: 0.9rem;
}
</style>
