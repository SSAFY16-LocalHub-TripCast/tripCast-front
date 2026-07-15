<template>
  <div class="page edit-page">
    <h2>게시글 수정</h2>
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
  padding: 20px;
}
</style>
