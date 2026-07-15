<template>
  <header class="site-header">
    <div class="logo">TripCast</div>
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
}
.logo {
  font-weight: 700;
  font-size: 1.2rem;
}
nav a {
  margin-left: 16px;
  color: #333;
  text-decoration: none;
}
</style>
