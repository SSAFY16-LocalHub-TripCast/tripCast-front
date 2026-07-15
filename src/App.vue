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
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css');

:root {
  color: #0f172a;
  background: #f8fafc;
  --font-sans:
    'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo',
    'Segoe UI', 'Roboto', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', sans-serif;
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-2: #f1f5f9;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-primary: #0f766e;
  --color-primary-strong: #14b8a6;
  --color-shadow: rgba(15, 23, 42, 0.08);
}
html {
  font-family: var(--font-sans);
  font-display: swap;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 20px 32px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
}
p,
span,
li,
label,
button,
a,
input,
textarea {
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
}
button,
a,
input,
textarea {
  font: inherit;
}
button,
.write-button,
.btn {
  border: 1px solid transparent;
  border-radius: 12px;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 4px 12px var(--color-shadow);
}
button:hover,
.write-button:hover,
.btn:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 18px rgba(15, 118, 110, 0.16);
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

.card,
.post-card,
.board-card,
.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 8px 24px var(--color-shadow);
}

.primary-btn {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-strong) 100%);
  color: #fff;
  border: none;
  box-shadow: 0 8px 18px rgba(15, 118, 110, 0.2);
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
