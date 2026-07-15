<template>
  <router-link to="/board/new" class="write-button">글쓰기</router-link>
</template>

<style scoped>
.write-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 16px rgba(15, 118, 110, 0.2);
  transition: transform 0.15s ease;
}
.write-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(15, 118, 110, 0.24);
}

@media (max-width: 768px) {
  .write-button {
    position: static;
    padding: 9px 14px;
    font-size: 0.95rem;
    box-shadow: 0 8px 16px rgba(15, 118, 110, 0.2);
    align-self: center;
    margin-left: 8px;
  }
}
</style>
