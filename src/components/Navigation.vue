<template>
  <header class="navigation" :class="{ 'is-scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo" @click="goToHome">
        <span class="logo-text">Portfolio</span>
        <span class="logo-dot">.</span>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <a
          v-for="(page, index) in pages"
          :key="page.id"
          :class="['nav-item', { active: currentPage === index }]"
          @click="$emit('navigate', index)"
        >
          <span class="nav-icon">{{ page.icon }}</span>
          <span class="nav-text">{{ page.title }}</span>
        </a>
      </nav>
      
      <!-- 右侧操作 -->
      <div class="nav-actions">
        <button class="theme-toggle" @click="toggleTheme">
          {{ themeIcon }}
        </button>
        <button class="contact-toggle" @click="toggleContact">
          💬
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Page {
  id: string
  title: string
  icon?: string
}

interface Props {
  pages: Page[]
  currentPage: number
  isOpen?: boolean 
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'navigate', index: number): void
}>()

const isScrolled = ref(false)
const isDarkTheme = ref(true)

const themeIcon = computed(() => {
  return isDarkTheme.value ? '☀️' : '🌙'
})

const goToHome = () => {
  emit('navigate', 0)
}

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  document.documentElement.setAttribute(
    'data-theme',
    isDarkTheme.value ? 'dark' : 'light'
  )
}

const toggleContact = () => {
  const event = new CustomEvent('toggle-contact')
  window.dispatchEvent(event)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
  z-index: 1000;
  transition: all 0.3s;
  background: transparent;
}

.navigation.is-scrolled {
  background: rgba(20, 20, 30, 0.9);
  backdrop-filter: blur(10px);
  padding: 15px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.logo-text {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.logo-dot {
  color: #6a11cb;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
}

.nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  color: white;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
}

.nav-actions {
  display: flex;
  gap: 15px;
}

.theme-toggle,
.contact-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
}

.theme-toggle:hover,
.contact-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

</style>
