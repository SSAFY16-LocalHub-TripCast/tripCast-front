<template>
  <div class="page write-page">
    <h2>게시글 작성</h2>
    <PostForm />
  </div>
</template>

<script setup>
import PostForm from '@/components/board/PostForm.vue'
</script>

<style scoped>
.page {
  padding: 20px;
}
</style>
