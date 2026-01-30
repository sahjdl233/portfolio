<template>
  <div class="skills-page">
    <div class="particles-bg" ref="particlesRef"></div>
    
    <div class="page-container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">
          <span class="gradient-text">⚡ 技能专长</span>
        </h1>
        <p class="page-subtitle">掌握现代Web开发的核心技术与工具</p>
      </div>
      
      <!-- 技能分类 -->
      <div class="skills-categories">
        <div 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-tab', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
      
      <!-- 技能展示 -->
      <div class="skills-content">
        <!-- 前端技能 -->
        <div v-if="activeCategory === 'frontend'" class="skills-grid">
          <div 
            v-for="skill in frontendSkills" 
            :key="skill.name"
            class="skill-card"
            @mouseenter="highlightSkill(skill)"
          >
            <div class="skill-icon">
              {{ skill.icon }}
            </div>
            <h3 class="skill-name">{{ skill.name }}</h3>
            <div class="skill-level">
              <div class="level-bar">
                <div 
                  class="level-fill" 
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
              <span class="level-text">{{ skill.level }}%</span>
            </div>
            <p class="skill-desc">{{ skill.description }}</p>
          </div>
        </div>
        
        <!-- 3D技能 -->
        <div v-if="activeCategory === '3d'" class="skills-grid">
          <div 
            v-for="skill in threeDSkills" 
            :key="skill.name"
            class="skill-card"
          >
            <div class="skill-icon">
              {{ skill.icon }}
            </div>
            <h3 class="skill-name">{{ skill.name }}</h3>
            <div class="skill-level">
              <div class="level-bar">
                <div 
                  class="level-fill" 
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
              <span class="level-text">{{ skill.level }}%</span>
            </div>
            <p class="skill-desc">{{ skill.description }}</p>
          </div>
        </div>
        
        <!-- 设计技能 -->
        <div v-if="activeCategory === 'design'" class="skills-grid">
          <div 
            v-for="skill in designSkills" 
            :key="skill.name"
            class="skill-card"
          >
            <div class="skill-icon">
              {{ skill.icon }}
            </div>
            <h3 class="skill-name">{{ skill.name }}</h3>
            <div class="skill-level">
              <div class="level-bar">
                <div 
                  class="level-fill" 
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
              <span class="level-text">{{ skill.level }}%</span>
            </div>
            <p class="skill-desc">{{ skill.description }}</p>
          </div>
        </div>
        
        <!-- 工具技能 -->
        <div v-if="activeCategory === 'tools'" class="tools-grid">
          <div 
            v-for="tool in tools" 
            :key="tool.name"
            class="tool-card"
          >
            <div class="tool-icon">
              {{ tool.icon }}
            </div>
            <h3 class="tool-name">{{ tool.name }}</h3>
            <p class="tool-desc">{{ tool.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- 技能详情 -->
      <div v-if="highlightedSkill" class="skill-detail">
        <div class="detail-content">
          <h3>{{ highlightedSkill.name }} - 技能详情</h3>
          <div class="detail-info">
            <div class="detail-item">
              <span class="label">熟练度:</span>
              <span class="value">{{ highlightedSkill.level }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">使用经验:</span>
              <span class="value">{{ highlightedSkill.experience }}</span>
            </div>
            <div class="detail-item">
              <span class="label">应用项目:</span>
              <span class="value">{{ highlightedSkill.projects }}</span>
            </div>
          </div>
          <p class="detail-desc">{{ highlightedSkill.fullDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Skill {
  name: string
  icon: string
  level: number
  description: string
  experience?: string
  projects?: string
  fullDescription?: string
}

interface Tool {
  name: string
  icon: string
  description: string
}

interface Category {
  id: string
  name: string
  icon: string
}

const categories = ref<Category[]>([
  { id: 'frontend', name: '前端开发', icon: '💻' },
  { id: '3d', name: '3D图形', icon: '🎮' },
  { id: 'design', name: '设计', icon: '🎨' },
  { id: 'tools', name: '工具', icon: '🛠️' }
])

const frontendSkills = ref<Skill[]>([
  {
    name: 'Vue.js',
    icon: '🟢',
    level: 95,
    description: '熟练使用Vue 3及其生态系统',
    experience: '3年',
    projects: '20+个项目',
    fullDescription: '精通Vue 3 Composition API、Vue Router、Pinia等。熟悉Vue生态工具如Vite、Vue CLI。'
  },
  {
    name: 'TypeScript',
    icon: '🔷',
    level: 90,
    description: '强类型JavaScript超集',
    experience: '2年',
    projects: '15+个项目',
    fullDescription: '熟练使用TypeScript进行类型安全的开发，熟悉泛型、装饰器等高级特性。'
  },
  {
    name: 'React',
    icon: '⚛️',
    level: 85,
    description: '掌握React及其Hooks',
    experience: '2年',
    projects: '10+个项目',
    fullDescription: '熟悉React Hooks、Context API、React Router等。'
  },
  {
    name: 'JavaScript',
    icon: '🟨',
    level: 95,
    description: '现代JavaScript开发',
    experience: '5年',
    projects: '50+个项目',
    fullDescription: '精通ES6+特性，熟悉异步编程、模块化、函数式编程等。'
  },
  {
    name: 'CSS/SCSS',
    icon: '🎨',
    level: 90,
    description: '现代CSS与预处理器',
    experience: '5年',
    projects: '50+个项目',
    fullDescription: '熟练使用Flexbox、Grid、CSS动画，熟悉SCSS、CSS-in-JS等。'
  },
  {
    name: 'Node.js',
    icon: '🟩',
    level: 80,
    description: '服务端JavaScript运行环境',
    experience: '2年',
    projects: '8+个项目',
    fullDescription: '熟悉Express、Koa等框架，能够构建RESTful API。'
  }
])

const threeDSkills = ref<Skill[]>([
  {
    name: 'Three.js',
    icon: '🌟',
    level: 88,
    description: 'WebGL 3D库',
    experience: '2年',
    projects: '12+个项目',
    fullDescription: '能够创建复杂的3D场景、动画和交互效果。'
  },
  {
    name: 'WebGL',
    icon: '🎯',
    level: 75,
    description: '底层图形API',
    experience: '1年',
    projects: '5+个项目',
    fullDescription: '了解WebGL底层原理，能够进行性能优化。'
  },
  {
    name: 'Blender',
    icon: '🧊',
    level: 70,
    description: '3D建模与动画',
    experience: '1年',
    projects: '8+个项目',
    fullDescription: '能够进行基础的3D建模、材质和动画制作。'
  }
])

const designSkills = ref<Skill[]>([
  {
    name: 'UI设计',
    icon: '🎨',
    level: 85,
    description: '用户界面设计',
    experience: '3年',
    projects: '30+个项目',
    fullDescription: '熟悉设计原则，能够创建美观实用的用户界面。'
  },
  {
    name: 'UX设计',
    icon: '✨',
    level: 80,
    description: '用户体验设计',
    experience: '2年',
    projects: '20+个项目',
    fullDescription: '注重用户体验，能够进行用户研究和交互设计。'
  },
  {
    name: 'Figma',
    icon: '🎯',
    level: 90,
    description: '设计工具',
    experience: '2年',
    projects: '25+个项目',
    fullDescription: '熟练使用Figma进行UI设计和原型制作。'
  }
])

const tools = ref<Tool[]>([
  {
    name: 'Git',
    icon: '📘',
    description: '版本控制'
  },
  {
    name: 'Webpack',
    icon: '📦',
    description: '模块打包'
  },
  {
    name: 'Vite',
    icon: '⚡',
    description: '构建工具'
  },
  {
    name: 'Docker',
    icon: '🐳',
    description: '容器化'
  },
  {
    name: 'VS Code',
    icon: '💻',
    description: '代码编辑器'
  },
  {
    name: 'Postman',
    icon: '📬',
    description: 'API测试'
  }
])

const activeCategory = ref('frontend')
const highlightedSkill = ref<Skill | null>(null)

const highlightSkill = (skill: Skill) => {
  highlightedSkill.value = skill
}
</script>

<style scoped>
.skills-page {
  min-height: 100%;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  color: white;
  overflow-y: auto;
  padding: 40px 20px;
  position: relative;
}

.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0.3;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 15px;
  animation: gradient 3s ease infinite;
  background: linear-gradient(45deg, #6a11cb, #2575fc, #00d2ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.skills-categories {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
}

.category-tab:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
}

.category-tab.active {
  background: linear-gradient(45deg, rgba(106, 17, 203, 0.3), rgba(37, 117, 252, 0.3));
  border-color: rgba(106, 17, 203, 0.5);
  box-shadow: 0 5px 20px rgba(106, 17, 203, 0.2);
}

.category-icon {
  font-size: 1.5rem;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 500;
}

.skills-content {
  margin-bottom: 40px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.skill-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.skill-card:hover {
  transform: translateY(-8px);
  border-color: rgba(106, 17, 203, 0.5);
  box-shadow: 0 15px 35px rgba(106, 17, 203, 0.2);
  background: rgba(106, 17, 203, 0.1);
}

.skill-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.skill-name {
  margin: 0 0 15px 0;
  font-size: 1.3rem;
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.level-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border-radius: 4px;
  transition: width 1s ease-out;
}

.level-text {
  font-size: 0.9rem;
  font-weight: bold;
  color: #6a11cb;
  min-width: 40px;
}

.skill-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.8;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.tool-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tool-card:hover {
  transform: translateY(-5px);
  background: rgba(106, 17, 203, 0.1);
  border-color: #6a11cb;
}

.tool-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.tool-name {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.tool-desc {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.7;
}

.skill-detail {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(106, 17, 203, 0.5);
  margin-top: 40px;
  backdrop-filter: blur(10px);
}

.detail-content h3 {
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  color: #6a11cb;
}

.detail-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.label {
  opacity: 0.7;
}

.value {
  font-weight: bold;
  color: #6a11cb;
}

.detail-desc {
  margin: 0;
  line-height: 1.6;
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .detail-info {
    grid-template-columns: 1fr;
  }
  
  .skills-categories {
    flex-direction: column;
    align-items: stretch;
  }
  
  .category-tab {
    justify-content: center;
  }
}
</style>