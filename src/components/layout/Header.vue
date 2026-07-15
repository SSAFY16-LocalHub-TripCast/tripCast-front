<template>
  <header class="site-header">
    <router-link to="/" class="logo">TripCast</router-link>
    <nav>
      <router-link to="/">홈</router-link>
      <router-link to="/board">게시판</router-link>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #ececec;
  background: #fff;
  gap: 12px;
}
.logo {
  font-weight: 700;
  font-size: 1.2rem;
  color: #0f766e;
  text-decoration: none;
}
nav {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
nav a {
  color: #334155;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 8px;
  border-radius: 999px;
}
nav a:hover {
  background: #f0fdfa;
  color: #0f766e;
}
nav a.router-link-exact-active {
  color: #0f766e;
  font-weight: 700;
  background: #ecfeff;
}

@media (max-width: 768px) {
  .site-header {
    padding: 14px 16px;
  }

  .logo {
    font-size: 1.05rem;
  }

  nav {
    gap: 12px;
  }
}
</style>
