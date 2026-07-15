<template>
  <table class="board-table">
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>카테고리</th>
        <th>생성일</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>
          <router-link :to="{ name: 'BoardDetail', params: { id: post.id } }" class="post-title">
            {{ post.title }}
          </router-link>
        </td>
        <td>{{ post.category }}</td>
        <td>{{ formatDate(post.created_at) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
})

const formatDate = (value) => {
  if (!value) return ''

  const normalizedValue =
    typeof value === 'string' && !/[zZ]|[+-]\d{2}:\d{2}$/.test(value) ? `${value}Z` : value

  const parsed = new Date(normalizedValue)
  if (Number.isNaN(parsed.getTime())) {
    return ''
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
</script>

<style scoped>
.board-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}
.board-table th,
.board-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}
.board-table th {
  background: #f8fafc;
  font-weight: 700;
  color: #334155;
}
.board-table tbody tr:hover {
  background: #f8fafc;
  transition: background 0.2s ease;
}

.post-title {
  color: #0f766e;
  text-decoration: none;
  font-weight: 600;
}

.post-title:hover {
  text-decoration: underline;
}
</style>
