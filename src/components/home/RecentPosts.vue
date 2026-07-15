<template>
  <section class="recent-posts">
    <div class="section-title">
      <h3>최근 게시글</h3>
      <span>지금 가장 활발한 이야기</span>
    </div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'BoardDetail', params: { id: post.id } }" class="post-link">
          <span class="title">{{ post.title }}</span>
          <span class="date">{{ formatDate(post.created_at) }}</span>
        </router-link>
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
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
  box-shadow: 0 8px 24px var(--color-shadow);
}
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.section-title h3 {
  margin: 0;
  color: var(--color-text);
}
.section-title span {
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 600;
}
.recent-posts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.recent-posts li {
  border-bottom: 1px solid var(--color-border);
}
.recent-posts li:last-child {
  border-bottom: none;
}
.post-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 10px;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    padding-left 0.2s ease;
}
.post-link:hover {
  background-color: var(--color-surface-2);
  padding-left: 12px;
}
.title {
  font-weight: 600;
  color: var(--color-text);
}
.date {
  color: var(--color-muted);
  font-size: 0.9rem;
}
</style>
