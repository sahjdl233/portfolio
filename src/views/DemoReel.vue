<template>
  <div class="page-container demo-reel">
    <h2 class="page-title">DEMO REEL</h2>
    <div class="video-wrapper">
      <!-- 使用 public 目录下的静态路径，避免构建时报找不到本地文件。
           请将你自己的 demo 视频命名为 demo.mp4，封面图命名为 poster.jpg，
           放到项目根目录的 public/ 下面即可生效。 -->
      <video controls src="/demo.mp4" poster="/poster.jpg"></video>
    </div>
  </div>
</template>

<style scoped>
.page-container { background-color: #f4f3f2; min-height: 100vh; padding: 40px; text-align: center; }
.page-title { margin-bottom: 30px; }
.video-wrapper video { width: 80%; max-width: 1000px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
</style>