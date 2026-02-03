<template>
  <div>
    <section class="section gray">
      <h2>COLOR SCRIPT</h2>
      <div class="gallery">
        <div v-for="n in 3" :key="n" class="protected-img">
          <img src="@/assets/placeholder.jpg" alt="Color Script">
          <div class="overlay"></div> </div>
      </div>
    </section>

    <section class="section peach">
      <h2>CHARACTER DESIGN</h2>
      <div class="gallery">
        </div>
    </section>

    <section class="section gray">
      <h2>LAYOUT & ENVIRONMENT</h2>
      </section>
  </div>
</template>

<style scoped lang="scss">
.section { padding: 40px; text-align: center; }
.gray { background-color: #f4f3f2; }
.peach { background-color: #ffd8c6; }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.protected-img {
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none; /* 禁止鼠标交互 */
    user-select: none;    /* 禁止选中 */
  }

  /* 透明遮罩层，彻底屏蔽右键保存 */
  .overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 10;
  }
}
</style>