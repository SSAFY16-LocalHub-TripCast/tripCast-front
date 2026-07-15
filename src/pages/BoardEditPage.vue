<template>
  <div class="page edit-page">
    <div class="page-header">
      <p class="page-subtitle">게시글 수정하기</p>
      <h2>정보를 정리해 보세요</h2>
    </div>
    <PostForm :postId="postId" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import PostForm from '@/components/board/PostForm.vue'

const route = useRoute()
const postId = route.params.id
</script>

<style scoped>
.page {
  padding: 20px 0 32px;
}
.page-header {
  margin-bottom: 16px;
}
.page-subtitle {
  margin: 0 0 4px;
  color: #0f766e;
  font-size: 0.9rem;
  font-weight: 700;
}
.page-header h2 {
  margin: 0;
  color: #0f172a;
}
</style>
