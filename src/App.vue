<template>
  <div id="app" :class="currentPageClass">
    <!-- 固定顶部标题 -->
    <PageHeader 
      v-if="showFixedHeader"
      :title="currentPageTitle"
      :subtitle="currentPageSubtitle"
      :fixed-top="true"
      :tags="currentPageTags"
      :show-actions="false"
      class="fixed-header"
    />

    <!-- 导航栏 -->
    <Navigation 
      :pages="pages" 
      :current-page="currentPage"
      :is-open="isNavigationOpen"
      @navigate="goToPage"
      v-if="showNavigation && !showFixedHeader"
    />
    
    <!-- 分页指示器 -->
    <PageIndicator 
      :total="pages.length"
      :current="currentPage"
      @click="goToPage"
      class="page-indicator"
    />
    
    <!-- 页面容器 -->
    <div class="pages-container" ref="pagesContainer">
      <transition-group
        :name="transitionDirection"
        @enter="onPageEnter"
        @leave="onPageLeave"
        tag="div"
        class="pages-wrapper"
      >
        <div
          v-for="(page, index) in pages"
          :key="page.id"
          v-show="currentPage === index"
          :class="['page', `page-${page.id}`]"
          :data-page="index"
        >
          <component 
            :is="page.component" 
            :key="page.id"
            :class="{ 'active': currentPage === index }"
          />
        </div>
      </transition-group>
    </div>
    
    <!-- 固定底部联系表单 -->
    <ContactFooter 
      :is-active="showContactForm"
      @toggle="toggleContactForm"
    />
    
    <!-- 悬浮按钮 -->
    <FloatingButton
      @scroll-to-top="scrollToTop"
      @toggle-contact="toggleContactForm"
      @toggle-menu="toggleNavigation"
    />
  </div>
</template>

<script setup lang="ts">
import { 
  ref, 
  computed, 
  onMounted, 
  onUnmounted, 
  nextTick, 
  watch,
  defineAsyncComponent,
  type Component
} from 'vue'
import Navigation from '@/components/Navigation.vue'
import PageIndicator from '@/components/PageIndicator.vue'
import ContactFooter from '@/components/ContactFooter.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import PageHeader from '@/components/PageHeader.vue' // 新增导入

// 页面组件 - 使用动态导入提升性能（异步组件）
const HomePage = defineAsyncComponent(() => 
  import('@/components/HomePage.vue')
)
const AboutPage = defineAsyncComponent(() => 
  import('@/components/AboutPage.vue')
)
const PortfolioPage = defineAsyncComponent(() => 
  import('@/components/PortfolioPage.vue')
)
const SkillsPage = defineAsyncComponent(() => 
  import('@/components/SkillsPage.vue')
)
const ModelShowcase = defineAsyncComponent(() => 
  import('@/components/ModelShowcase.vue')
)

// 页面配置 - 类型定义
interface PageConfig {
  id: string
  title: string
  component: Component
  icon?: string
  subtitle?: string
  tags?: string[]
}

const pages: PageConfig[] = [
  { 
    id: 'home', 
    title: '首页', 
    component: HomePage,
    icon: '🏠',
    subtitle: '欢迎来到我的创意空间',
    tags: ['前端开发', '3D设计', '交互体验']
  },
  { 
    id: 'about', 
    title: '关于我', 
    component: AboutPage,
    icon: '👤',
    subtitle: '创意开发者 · 视觉设计师 · 技术探索者',
    tags: ['个人简介', '职业经历', '教育背景']
  },
  { 
    id: 'portfolio', 
    title: '作品集', 
    component: PortfolioPage,
    icon: '🎨',
    subtitle: '探索我的创意项目和视觉作品',
    tags: ['网页设计', '移动应用', '3D作品']
  },
  { 
    id: 'skills', 
    title: '技能', 
    component: SkillsPage,
    icon: '⚡',
    subtitle: '掌握现代Web开发的核心技术与工具',
    tags: ['前端开发', '3D图形', '设计']
  },
  { 
    id: 'models', 
    title: '3D作品', 
    component: ModelShowcase,
    icon: '🎮',
    subtitle: '交互式3D模型展示',
    tags: ['Three.js', 'WebGL', '3D建模']
  }
]

// 状态管理
const currentPage = ref(0)
const showContactForm = ref(false)
const showNavigation = ref(true)
const isNavigationOpen = ref(false)
const transitionDirection = ref('slide-next')
const isNavigating = ref(false)
const isScrolling = ref(false)
const pagesContainer = ref<HTMLElement>()
let wheelTimeout: number | null = null

// 新增：固定标题相关状态
const showFixedHeader = ref(true) // 控制是否显示固定标题

// 计算当前页面的标题信息
const currentPageTitle = computed(() => pages[currentPage.value].title)
const currentPageSubtitle = computed(() => pages[currentPage.value].subtitle || '')
const currentPageTags = computed(() => pages[currentPage.value].tags || [])

// 防抖滚轮处理
const handleWheel = (e: WheelEvent) => {
  if (isNavigating.value || isScrolling.value) return
  
  // 防止在联系表单打开时滚动
  if (showContactForm.value) {
    const contactForm = document.querySelector('.contact-footer')
    if (contactForm && contactForm.contains(e.target as Node)) {
      return
    }
  }
  
  e.preventDefault()
  
  // 滚轮防抖
  if (wheelTimeout) {
    clearTimeout(wheelTimeout)
  }
  
  isScrolling.value = true
  wheelTimeout = window.setTimeout(() => {
    isScrolling.value = false
  }, 800)
  
  if (e.deltaY > 0) {
    nextPage()
  } else {
    prevPage()
  }
}

// 触摸滑动支持
let touchStartY = 0
let touchStartX = 0

const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0].clientY
  touchStartX = e.touches[0].clientX
}

const handleTouchEnd = (e: TouchEvent) => {
  if (isNavigating.value || showContactForm.value) return
  
  const touchEndY = e.changedTouches[0].clientY
  const touchEndX = e.changedTouches[0].clientX
  const deltaY = touchStartY - touchEndY
  const deltaX = touchStartX - touchEndX
  
  // 垂直滑动优先
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    if (Math.abs(deltaY) > 50) { // 滑动阈值
      if (deltaY > 0) {
        nextPage()
      } else {
        prevPage()
      }
    }
  }
}

// 监听键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  // 忽略输入框中的按键
  const target = e.target as HTMLElement
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
  
  switch(e.key) {
    case 'ArrowDown':
    case ' ':
      e.preventDefault()
      nextPage()
      break
    case 'ArrowUp':
      e.preventDefault()
      prevPage()
      break
    case 'Home':
      e.preventDefault()
      goToPage(0)
      break
    case 'End':
      e.preventDefault()
      goToPage(pages.length - 1)
      break
    case 'Escape':
      showContactForm.value = false
      break
    case 'n':
    case 'N':
      e.preventDefault()
      toggleNavigation()
      break
  }
}

// 导航方法
const nextPage = () => {
  if (currentPage.value < pages.length - 1) {
    transitionDirection.value = 'slide-next'
    goToPage(currentPage.value + 1)
  } else {
    // 如果是最后一页，显示联系表单
    showContactForm.value = true
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    transitionDirection.value = 'slide-prev'
    goToPage(currentPage.value - 1)
  }
}

const goToPage = async (index: number) => {
  if (isNavigating.value || index === currentPage.value) return
  
  isNavigating.value = true
  transitionDirection.value = 
    index > currentPage.value ? 'slide-next' : 'slide-prev'
  
  // 先切换页面，再更新URL
  currentPage.value = index
  
  // 等待DOM更新完成
  await nextTick()
  
  // 更新URL hash
  window.history.replaceState(
    null, 
    '', 
    `${window.location.pathname}#${pages[index].id}`
  )
  
  // 触发页面切换事件
  window.dispatchEvent(new CustomEvent('page-change', {
    detail: { 
      pageId: pages[index].id,
      pageIndex: index 
    }
  }))
  
  // 添加页面加载的CSS类
  const pageElement = document.querySelector(`.page-${pages[index].id}`)
  if (pageElement) {
    pageElement.classList.add('page-loaded')
  }
}

// 页面切换动画
const onPageEnter = (el: Element) => {
  el.classList.add('page-entering')
  setTimeout(() => {
    isNavigating.value = false
    el.classList.remove('page-entering')
    el.classList.add('page-active')
  }, 100)
}

const onPageLeave = (el: Element) => {
  el.classList.remove('page-active')
  el.classList.add('page-leaving')
  setTimeout(() => {
    el.classList.remove('page-leaving')
  }, 800)
}

// 切换联系表单
const toggleContactForm = () => {
  showContactForm.value = !showContactForm.value
  if (showContactForm.value) {
    // 表单打开时，暂时禁用页面滚动
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 切换导航栏显示/隐藏
const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value
  
  // 如果需要可以添加动画类
  const nav = document.querySelector('.navigation')
  if (nav) {
    nav.classList.toggle('hidden', !showNavigation.value)
  }
}

// 滚动到顶部
const scrollToTop = () => {
  if (pagesContainer.value) {
    pagesContainer.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

// 监听URL hash变化
const handleHashChange = () => {
  const hash = window.location.hash.slice(1)
  const pageIndex = pages.findIndex(p => p.id === hash)
  if (pageIndex !== -1 && pageIndex !== currentPage.value) {
    goToPage(pageIndex)
  }
}

// 监听页面切换事件（用于其他组件响应）
const handlePageChange = (e: CustomEvent) => {
  console.log('切换到页面:', e.detail.pageId)
  // 这里可以添加页面切换后的逻辑，比如发送分析事件等
}

// 计算当前页面的类名
const currentPageClass = computed(() => `page-${pages[currentPage.value].id}`)

// 监听联系表单状态，调整页面容器高度
watch(showContactForm, (newValue) => {
  const pagesContainerEl = pagesContainer.value
  if (pagesContainerEl) {
    if (newValue) {
      pagesContainerEl.style.height = 'calc(100vh - 400px)' // 表单展开时的高度
    } else {
      pagesContainerEl.style.height = 'calc(100vh - 80px)' // 表单收起时的高度
    }
  }
})

onMounted(() => {
  // 初始化hash
  const hash = window.location.hash.slice(1)
  const initialPage = pages.findIndex(p => p.id === hash)
  if (initialPage !== -1) {
    goToPage(initialPage)
  } else {
    window.history.replaceState(
      null, 
      '', 
      `${window.location.pathname}#${pages[0].id}`
    )
  }
  
  // 添加事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('hashchange', handleHashChange)
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
  
  // 监听自定义事件
  window.addEventListener('scroll-to-next', () => nextPage())
  window.addEventListener('toggle-contact', () => toggleContactForm())
  
  // 阻止浏览器默认滚动行为
  document.addEventListener('touchmove', (e) => {
    if (isNavigating.value) {
      e.preventDefault()
    }
  }, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('hashchange', handleHashChange)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  window.removeEventListener('scroll-to-next', () => nextPage())
  window.removeEventListener('toggle-contact', () => toggleContactForm())
  
  if (wheelTimeout) {
    clearTimeout(wheelTimeout)
  }
})
</script>

<style scoped>
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-bottom: 0;
}

.pages-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  transition: height 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* 如果显示固定头部，则调整页面容器高度 */
#app:has(.fixed-header) .pages-container {
  height: calc(100vh - 150px);
}

.pages-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* 移动端顺滑滚动 */
}

/* 页面切换动画 */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 页面加载动画 */
.page-entering {
  animation: pageEnter 0.5s ease-out;
}

.page-leaving {
  animation: pageLeave 0.5s ease-out;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pageLeave {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* 美化滚动条 */
.page::-webkit-scrollbar {
  width: 8px;
}

.page::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.page::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border-radius: 4px;
}

.page::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2575fc, #6a11cb);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .pages-container {
    height: calc(100vh - 120px);
  }
  
  #app {
    overflow-y: auto; /* 移动端允许滚动 */
  }
  
  .page {
    overflow-y: auto;
    padding-bottom: 20px; /* 为移动端底部留出空间 */
  }
}
</style>

<style>
/* 全局样式 */
.navigation.hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

.navigation {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>