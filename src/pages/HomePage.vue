<template>
  <div class="page home-page">
    <AdBanner />
    <RecentPosts />
    <ChatbotWidget />
  </div>
</template>

<script setup>
import AdBanner from '@/components/home/AdBanner.vue'
import RecentPosts from '@/components/home/RecentPosts.vue'
import ChatbotWidget from '@/components/chatbot/ChatbotWidget.vue'
</script>

<style scoped>
.page {
  padding: 20px;
}
</style>
