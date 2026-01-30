<template>
  <div class="home-page">
    <!-- 背景粒子效果 -->
    <div class="particles-bg" ref="particlesRef"></div>
    
    <PageHeader
      title="首页"
      subtitle="欢迎来到我的创意空间 - 探索我的最新作品与设计"
      type="hero"
      :tags="['前端开发', '3D设计', '交互体验', '视觉创意']"
      :show-actions="true"
      
    />

    <!-- 主内容区 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="title glitch" data-text="DEMO SHOWCASE">
          DEMO SHOWCASE
        </h1>
        <p class="subtitle">创意开发者 · 视觉设计师 · 技术探索者</p>
        
        <!-- 视频展示区 -->
        <div class="video-showcase">
          <div class="video-container">
            <video
              ref="demoVideo"
              :src="demoVideoUrl"
              :poster="videoPoster"
              controls
              autoplay
              muted
              loop
              class="demo-video"
              @loadeddata="onVideoLoaded"
            ></video>
            
            <!-- 视频控制叠加层 -->
            <div class="video-overlay">
              <div class="video-info">
                <h3>{{ videoTitle }}</h3>
                <p>{{ videoDescription }}</p>
                <div class="video-tags">
                  <span v-for="tag in videoTags" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <div class="video-controls">
                <button @click="togglePlay" class="control-btn">
                  {{ isPlaying ? '⏸️' : '▶️' }}
                </button>
                <button @click="toggleMute" class="control-btn">
                  {{ isMuted ? '🔇' : '🔊' }}
                </button>
                <button @click="toggleFullscreen" class="control-btn">
                  ⛶
                </button>
              </div>
            </div>
          </div>
          
          <!-- 其他视频缩略图 -->
          <div class="video-thumbnails">
            <div
              v-for="(video, index) in otherVideos"
              :key="index"
              :class="['thumbnail', { active: currentVideo === index }]"
              @click="switchVideo(index)"
              @mouseenter="previewVideo(index)"
            >
              <img :src="video.thumbnail" :alt="video.title" />
              <div class="thumbnail-overlay">
                <span>{{ video.title }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 向下滚动提示 -->
        <div class="scroll-hint" @click="scrollToNext">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <p>向下滚动探索更多</p>
        </div>
      </div>
    </div>
    
    <!-- 特色展示 -->
    <div class="features-section">
      <div class="feature-cards">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const demoVideoUrl = ref('https://cdn.example.com/videos/main-demo.mp4')
const videoPoster = ref('https://images.unsplash.com/photo-1536240478700-b869070f9279')
const videoTitle = ref('3D场景互动展示')
const videoDescription = ref('使用Three.js和WebGL创建的交互式3D场景，展示了现代Web技术的可能性')
const videoTags = ref(['Three.js', 'WebGL', '交互设计', '动画'])

const otherVideos = ref([
  {
    url: 'https://cdn.example.com/videos/demo1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    title: '粒子系统效果'
  },
  // 更多视频...
])

const demoVideo = ref<HTMLVideoElement>()
const isPlaying = ref(true)
const isMuted = ref(true)
const currentVideo = ref(0)

const features = ref([
  {
    icon: '🎬',
    title: '视频制作',
    description: '专业的视频编辑和后期处理能力'
  },
  {
    icon: '🎨',
    title: '视觉设计',
    description: 'UI/UX设计和视觉创意表现'
  },
  {
    icon: '🕹️',
    title: '交互开发',
    description: '前沿的Web交互技术实现'
  },
  {
    icon: '📱',
    title: '响应式设计',
    description: '多设备适配和优化'
  }
])

const togglePlay = () => {
  if (demoVideo.value) {
    if (isPlaying.value) {
      demoVideo.value.pause()
    } else {
      demoVideo.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const toggleMute = () => {
  if (demoVideo.value) {
    demoVideo.value.muted = !demoVideo.value.muted
    isMuted.value = demoVideo.value.muted
  }
}

const toggleFullscreen = () => {
  if (demoVideo.value) {
    if (!document.fullscreenElement) {
      demoVideo.value.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
}

const switchVideo = (index: number) => {
  if (demoVideo.value && otherVideos.value[index]) {
    demoVideo.value.src = otherVideos.value[index].url
    videoTitle.value = otherVideos.value[index].title
    currentVideo.value = index
    demoVideo.value.play()
    isPlaying.value = true
  }
}

const previewVideo = (index: number) => {
  // 悬停预览逻辑
}

const scrollToNext = () => {
  // 触发父组件的页面切换
  const event = new CustomEvent('scroll-to-next')
  window.dispatchEvent(event)
}

const onVideoLoaded = () => {
  console.log('视频加载完成')
}

// 粒子背景效果
const particlesRef = ref<HTMLDivElement>()
const initParticles = () => {
  // 使用Canvas或Three.js创建粒子背景
}

onMounted(() => {
  initParticles()
})

onUnmounted(() => {
  // 清理资源
})
</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
  color: white;
  position: relative;
}

.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.3;
}

.hero-section {
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.hero-content {
  text-align: center;
  max-width: 1200px;
  padding: 0 20px;
}

.title {
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: glow 2s ease-in-out infinite alternate;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.8;
}

.video-showcase {
  max-width: 1000px;
  margin: 0 auto 4rem;
}

.video-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

.demo-video {
  width: 100%;
  height: auto;
  display: block;
}

.video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.video-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.video-info p {
  margin: 0 0 10px 0;
  opacity: 0.9;
}

.video-tags {
  display: flex;
  gap: 10px;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.video-controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.video-thumbnails {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.thumbnail {
  width: 120px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.7;
}

.thumbnail:hover,
.thumbnail.active {
  opacity: 1;
  transform: translateY(-5px);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px;
  font-size: 0.8rem;
  text-align: center;
}

.scroll-hint {
  margin-top: 40px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.scroll-hint:hover {
  opacity: 1;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 20px;
  margin: 0 auto 10px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 10px;
  background: white;
  border-radius: 2px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

.features-section {
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin: 0 0 15px 0;
  font-size: 1.5rem;
}

.feature-card p {
  margin: 0;
  opacity: 0.8;
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.5));
  }
  to {
    filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.5));
  }
}

@keyframes scroll {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(20px);
    opacity: 0;
  }
}
</style>