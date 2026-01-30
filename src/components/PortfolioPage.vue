<template>
  <div class="portfolio-page">
    <!-- 背景装饰 -->
    <div class="bg-pattern"></div>
    
    <div class="page-container">
      <!-- 标题 -->
      <div class="page-header fade-in">
        <h1 class="page-title">
          <span class="gradient-text">🎨 作品集</span>
        </h1>
        <p class="page-subtitle">探索我的创意项目和视觉作品</p>
      </div>
      
      <!-- 作品分类 -->
      <div class="portfolio-categories">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-btn', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          {{ category.name }}
          <span class="count">{{ category.count }}</span>
        </button>
      </div>
      
      <!-- 作品展示网格 -->
      <div class="portfolio-grid">
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="portfolio-item"
          @click="openProject(item)"
        >
          <div class="item-image">
            <img 
              :src="item.image" 
              :alt="item.title"
              loading="lazy"
            />
            <div class="item-overlay">
              <span class="view-btn">查看项目</span>
            </div>
          </div>
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="item-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 作品详情模态框 -->
      <div v-if="selectedProject" class="project-modal" @click.self="closeProject">
        <div class="modal-content">
          <button class="close-btn" @click="closeProject">×</button>
          <h2>{{ selectedProject.title }}</h2>
          <div class="modal-body">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
            <div class="project-details">
              <p>{{ selectedProject.description }}</p>
              <div class="project-links">
                <a 
                  v-if="selectedProject.demoUrl" 
                  :href="selectedProject.demoUrl" 
                  target="_blank"
                  class="demo-link"
                >
                  🚀 在线演示
                </a>
                <a 
                  v-if="selectedProject.codeUrl" 
                  :href="selectedProject.codeUrl" 
                  target="_blank"
                  class="code-link"
                >
                  💻 查看代码
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface PortfolioItem {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  demoUrl?: string
  codeUrl?: string
}

const categories = ref([
  { id: 'all', name: '全部作品', count: 8 },
  { id: 'web', name: '网页设计', count: 4 },
  { id: 'mobile', name: '移动应用', count: 2 },
  { id: '3d', name: '3D作品', count: 2 }
])

const portfolioItems = ref<PortfolioItem[]>([
  {
    id: 1,
    title: '交互式数据可视化',
    description: '使用D3.js和Vue创建的实时数据可视化仪表板',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tags: ['Vue', 'D3.js', '数据可视化'],
    category: 'web',
    demoUrl: 'https://example.com/demo1',
    codeUrl: 'https://github.com/example/project1'
  },
  {
    id: 2,
    title: '移动端社交应用',
    description: 'React Native开发的跨平台社交应用',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    tags: ['React Native', '移动端', 'UI/UX'],
    category: 'mobile',
    demoUrl: 'https://example.com/demo2'
  },
  {
    id: 3,
    title: '3D产品展示',
    description: 'Three.js实现的交互式3D产品展示',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    tags: ['Three.js', '3D', 'WebGL'],
    category: '3d',
    demoUrl: 'https://example.com/demo3'
  },
  // 添加更多作品...
  {
    id: 4,
    title: '电商平台设计',
    description: '完整的电商平台前端实现',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    tags: ['Vue', 'TypeScript', '电商'],
    category: 'web'
  },
  {
    id: 5,
    title: 'AR导航应用',
    description: '基于ARKit的增强现实导航应用',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620',
    tags: ['ARKit', 'iOS', 'AR'],
    category: 'mobile'
  },
  {
    id: 6,
    title: '粒子动画系统',
    description: 'Canvas实现的粒子效果动画系统',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
    tags: ['Canvas', '动画', '粒子系统'],
    category: 'web'
  },
  {
    id: 7,
    title: '建筑可视化',
    description: '建筑项目的3D可视化展示',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    tags: ['Three.js', '建筑', '可视化'],
    category: '3d'
  },
  {
    id: 8,
    title: '数据仪表盘',
    description: '企业级数据监控仪表盘',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tags: ['Vue', 'ECharts', '管理后台'],
    category: 'web'
  }
])

const activeCategory = ref('all')
const selectedProject = ref<PortfolioItem | null>(null)

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') {
    return portfolioItems.value
  }
  return portfolioItems.value.filter(item => item.category === activeCategory.value)
})

const openProject = (item: PortfolioItem) => {
  selectedProject.value = item
  document.body.style.overflow = 'hidden'
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.portfolio-page {
  min-height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  color: white;
  position: relative;
  overflow-y: auto;
  padding: 40px 20px;
}

.bg-pattern {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(106, 17, 203, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 80% 20%, rgba(37, 117, 252, 0.1) 0%, transparent 20%);
  pointer-events: none;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
}

.portfolio-categories {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.category-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.category-btn.active {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  box-shadow: 0 4px 20px rgba(106, 17, 203, 0.3);
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.portfolio-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.portfolio-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(106, 17, 203, 0.5);
}

.item-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.portfolio-item:hover .item-image img {
  transform: scale(1.05);
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(106, 17, 203, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.portfolio-item:hover .item-overlay {
  opacity: 1;
}

.view-btn {
  background: white;
  color: #6a11cb;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
}

.item-info {
  padding: 20px;
}

.item-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
}

.item-info p {
  margin: 0 0 15px 0;
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.5;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(106, 17, 203, 0.2);
  color: #a855f7;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
}

.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #1a1a2e;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  position: relative;
  border: 1px solid rgba(106, 17, 203, 0.5);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-content h2 {
  margin: 0 0 20px 0;
  font-size: 2rem;
  color: white;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.modal-body img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.project-details p {
  margin: 0 0 25px 0;
  line-height: 1.6;
  font-size: 1.1rem;
  opacity: 0.9;
}

.project-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.demo-link, .code-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.demo-link {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
}

.code-link {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.demo-link:hover, .code-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(106, 17, 203, 0.3);
}

/* 动画 */
.fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .portfolio-categories {
    flex-direction: column;
    align-items: stretch;
  }
  
  .category-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>