<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p>© 2026 TripCast</p>
      <p>대전의 이야기를 함께 나누는 LocalHub</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  box-sizing: border-box;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}
.site-footer > .footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  color: var(--color-muted);
}
.site-footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .site-footer > .footer-inner {
    flex-direction: column;
    gap: 6px;
    padding: 14px 16px;
    text-align: center;
  }
}
</style>
