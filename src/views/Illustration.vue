<template>
  <div class="illustration-page">
    
    <section class="section section-original">
      <div class="masonry-layout">
        <div class="art-item" v-for="n in 6" :key="'orig-'+n">
          <img src="@/assets/placeholder.jpg" loading="lazy" alt="Original Art">
        </div>
      </div>
    </section>

    <section class="section section-fanart">
      <h2 class="section-title">Fan Art</h2>
      <div class="masonry-layout">
        <div class="art-item" v-for="n in 8" :key="'fan-'+n">
          <img src="@/assets/placeholder.jpg" loading="lazy" alt="Fan Art">
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">
/* 基础布局 */
.illustration-page {
  width: 100%;
}

.section {
  padding: 60px 40px;
}

.section-original {
  background-color: #f4f3f2; /* 灰色底 */
  min-height: 400px; /* 防止内容为空时太塌 */
}

.section-fanart {
  background-color: #ffd8c6; /* 肉粉色底 */
}

.section-title {
  text-align: center;
  font-size: 2rem;
  letter-spacing: 2px;
  margin-bottom: 40px;
  color: #333;
}

/* --- 核心：自由排版 (瀑布流) --- */
.masonry-layout {
  column-count: 3; /* 默认3列 */
  column-gap: 20px; /* 列间距 */
}

.art-item {
  break-inside: avoid; /* 防止图片被切断 */
  margin-bottom: 20px; /* 图片上下间距 */
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
    transition: transform 0.3s ease;
    
    /* 继承之前的防保存设置 */
    user-select: none;
    pointer-events: none; 
  }
}

/* 响应式调整：手机端变为1列，平板2列 */
@media (max-width: 768px) {
  .masonry-layout { column-count: 2; }
}
@media (max-width: 480px) {
  .masonry-layout { column-count: 1; }
  .section { padding: 40px 20px; }
}
</style>