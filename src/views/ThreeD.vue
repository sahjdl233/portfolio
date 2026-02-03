<template>
  <div class="threed-page">

    <section class="section section-rigging">
      <h2 class="section-title">3D Rigging</h2>
      <div class="video-container">
        <video controls src="@/assets/rigging_demo.mp4" poster="@/assets/rigging_poster.jpg"></video>
        <p class="video-desc">Rigging Showreel 2024 - Maya / Blender</p>
      </div>
    </section>

    <section class="section section-modeling">
      <h2 class="section-title">3D Modeling & Rendering</h2>
      
      <div class="grid-gallery">
        <div class="grid-item" v-for="n in 12" :key="n">
          <div class="image-wrapper">
             <img src="@/assets/placeholder.jpg" loading="lazy" alt="3D Render">
             <div class="hover-info">Model Name {{ n }}</div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">
.threed-page { width: 100%; }

.section { padding: 60px 40px; }

.section-title {
  text-align: center;
  font-size: 2rem;
  letter-spacing: 1.5px;
  margin-bottom: 40px;
}

/* --- Rigging 板块 --- */
.section-rigging {
  background-color: #f4f3f2;
  text-align: center;
}

.video-container {
  max-width: 900px;
  margin: 0 auto;
  
  video {
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
}

.video-desc {
  margin-top: 15px;
  color: #666;
  font-size: 0.9rem;
}

/* --- Modeling 板块 --- */
.section-modeling {
  background-color: #ffd8c6;
}

.grid-gallery {
  display: grid;
  /* 自动填充：每张图最小宽度300px，不够换行，多了平分 */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.grid-item {
  background: white; /* 给图片加个白边框或背景 */
  padding: 10px;     /* 类似拍立得的效果 */
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.grid-item:hover {
  transform: translateY(-5px); /* 悬停轻微上浮 */
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    user-select: none; /* 防保存 */
  }
}

.hover-info {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 8px;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s;
  text-align: center;
}

.image-wrapper:hover .hover-info {
  opacity: 1;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .section { padding: 40px 20px; }
  .grid-gallery { grid-template-columns: 1fr; } /* 手机上一行一个 */
}
</style>