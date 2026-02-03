<template>
  <div class="page-container animation-projects">
    <div v-for="(item, index) in projects" :key="index" class="project-module">
      <h3 class="video-title">{{ item.title }}</h3>
      <div class="video-box">
        <video controls :src="item.videoUrl"></video>
      </div>
      <p class="video-desc">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 数据驱动，方便后期添加
const projects = ref([
  { title: 'Project Alpha', videoUrl: 'path/to/v1.mp4', description: 'Character animation study.' },
  { title: 'Project Beta', videoUrl: 'path/to/v2.mp4', description: 'Lip sync practice.' },
]);
</script>

<style scoped>
.page-container { background-color: #f4f3f2; padding: 50px 20px; }
.project-module { max-width: 800px; margin: 0 auto 80px; text-align: center; }
.video-box video { width: 100%; }
.video-title { font-size: 1.5rem; margin-bottom: 15px; }
.video-desc { margin-top: 15px; color: #555; }
</style>