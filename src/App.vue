<template>
  <div class="app-container">
    <header class="main-header">
      <div class="site-branding">
        <h1 class="main-title">YOUR NAME</h1>
        <h2 class="sub-title">PORTFOLIO</h2>
      </div>
      
      <nav class="main-nav">
        <router-link to="/">DEMO REEL</router-link>
        <router-link to="/animation">ANIMATION PROJECTS</router-link>
        <router-link to="/storyboard">STORYBOARD | ANIMATIC</router-link>
        <router-link to="/concept-art">CONCEPT ART</router-link>
        <router-link to="/sequential">SEQUENTIAL</router-link>
        <router-link to="/resume">RESUME</router-link>
        <router-link to="/more">MORE</router-link>
      </nav>
    </header>

    <main class="page-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <ContactBar />
  </div>
</template>

<script setup>
import ContactBar from './components/ContactBar.vue';
</script>

<style lang="scss">
/* 全局重置 */
body { margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }

.main-header {
  background: white;
  padding: 40px 20px 20px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #eee;
}

.main-title { font-size: 2.5rem; letter-spacing: 2px; margin: 0; }
.sub-title { font-size: 1rem; color: #666; font-weight: normal; margin: 5px 0 20px; }

.main-nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.main-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  padding-bottom: 2px;
}

.main-nav a.router-link-active {
  border-bottom: 2px solid #000;
}

.page-content {
  min-height: 80vh; /* 保证内容撑开 */
  padding-bottom: 320px; /* 防止内容被 ContactBar 遮挡 */
}

/* 简单的淡入淡出动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>