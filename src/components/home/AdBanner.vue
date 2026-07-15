<template>
  <section class="ad-banner">
    <div class="ad-content">
      <p class="eyebrow">대전 지역 커뮤니티</p>
      <h2>LocalHub</h2>
      <p class="description">
        대전의 주민과 관광객들이 지역 정보, 맛집, 숨은 명소, 생활팁을 자유롭게 공유하고 소통하는
        익명 커뮤니티입니다.
      </p>
      <div class="tag-list">
        <span>익명 소통</span>
        <span>지역 정보</span>
        <span>관광 추천</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ad-banner {
  padding: 28px 24px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ecfeff 0%, #fef3c7 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}
.ad-content {
  text-align: left;
}
.eyebrow {
  display: inline-block;
  margin: 0 0 8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #0f766e;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
h2 {
  margin: 0 0 8px;
  color: #0f172a;
  font-size: 1.6rem;
}
.description {
  margin: 0 0 14px;
  color: #334155;
  line-height: 1.6;
  font-size: 1rem;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-list span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #0f766e;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .ad-banner {
    padding: 20px 18px;
    margin-bottom: 16px;
  }

  h2 {
    font-size: 1.35rem;
  }

  .description {
    font-size: 0.95rem;
  }
}
</style>
