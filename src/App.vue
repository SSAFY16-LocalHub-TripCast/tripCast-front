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
  color: #0f172a;
  background: #f8fafc;
}
body {
  margin: 0;
  background: #f8fafc;
}
#app {
  min-height: 100vh;
  padding-bottom: 84px;
  box-sizing: border-box;
}
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 32px;
}
button,
a,
input,
textarea {
  font: inherit;
}
a {
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}
a:hover {
  transform: translateY(-1px);
}
button,
.write-button,
.btn {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}
button:hover,
.write-button:hover,
.btn:hover {
  transform: translateY(-1px);
}
.router-view-enter-active,
.router-view-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.router-view-enter-from,
.router-view-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
@media (max-width: 768px) {
  main {
    padding: 16px 14px 28px;
  }
}
</style>
