<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
:root {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #111827;
  background: #f3f4f6;
}
#app {
  min-height: 100vh;
  padding-bottom: 72px;
}
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 32px;
}
</style>
