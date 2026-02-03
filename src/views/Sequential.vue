<template>
  <div>
    <section class="section peach">
      <h2>Fan Arts</h2>
      <div class="masonry-layout">
        <div class="masonry-item" v-for="i in 5" :key="i">
           <img src="@/assets/placeholder.jpg">
        </div>
      </div>
    </section>

    <section class="section gray">
      <h2>Daily Sketches</h2>
      <div class="masonry-layout">
        </div>
    </section>
  </div>
</template>

<style scoped>
.section { padding: 40px; }
.gray { background-color: #f4f3f2; }
.peach { background-color: #ffd8c6; }
h2 { text-align: center; margin-bottom: 30px; }

/* 瀑布流排版核心 CSS */
.masonry-layout {
  column-count: 3; /* 这里控制列数，可根据自由排版需求调整 */
  column-gap: 20px;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
}
.masonry-item img {
  width: 100%;
  border-radius: 4px;
}
</style>