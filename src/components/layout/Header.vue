<template>
  <header class="site-header">
    <div class="header-inner">
      <router-link to="/" class="logo">TripCast</router-link>
      <nav>
        <router-link to="/">홈</router-link>
        <router-link to="/board">게시판</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
}
.site-header > .header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  gap: 12px;
}
.logo {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--color-primary);
  text-decoration: none;
}
nav {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
nav a {
  color: var(--color-muted);
  text-decoration: none;
  font-weight: 500;
  padding: 7px 12px;
  border-radius: 999px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
nav a:hover {
  background: var(--color-surface-2);
  color: var(--color-primary);
}
nav a.router-link-exact-active {
  color: #fff;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-strong) 100%);
}

@media (max-width: 768px) {
  .site-header > .header-inner {
    padding: 14px 16px;
  }

  .logo {
    font-size: 1.05rem;
  }

  nav {
    gap: 8px;
  }
}
</style>
