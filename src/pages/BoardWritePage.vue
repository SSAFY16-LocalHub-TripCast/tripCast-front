<template>
  <div class="page write-page">
    <div class="page-header">
      <p class="page-subtitle">LocalHub에 새 이야기 남기기</p>
      <h2>게시글 작성</h2>
    </div>
    <PostForm />
  </div>
</template>

<script setup>
import PostForm from '@/components/board/PostForm.vue'
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
