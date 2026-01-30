<template>
  <header 
    class="page-header" 
    :class="[type, { 'with-background': withBackground, 'fixed-top': fixedTop }]"
  >
    <div class="header-content">
      <div class="title-section">
        <div class="title-wrapper">
          <h1 class="main-title">{{ title }}</h1>
          <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
        </div>
        
        <div v-if="tags && tags.length" class="tags-section">
          <span 
            v-for="tag in tags" 
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      
      <div v-if="showActions" class="actions-section">
        <slot name="actions">
          <div class="default-actions">
            <div class="page-stats" v-if="stats">
              <div class="stat-item" v-for="stat in stats" :key="stat.label">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
            
            <div class="action-buttons">
              <button 
                v-for="action in actions" 
                :key="action.label"
                @click="action.handler"
                class="action-btn"
                :class="action.type"
              >
                <span class="action-icon">{{ action.icon }}</span>
                <span class="action-text">{{ action.label }}</span>
              </button>
            </div>
          </div>
        </slot>
      </div>
    </div>
    
    <!-- 装饰元素 -->
    <div v-if="showDecorations" class="decorations">
      <div class="decoration-line"></div>
      <div class="decoration-dots">
        <span v-for="i in 3" :key="i" class="dot"></span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Action {
  label: string
  icon: string
  type: 'primary' | 'secondary' | 'outline'
  handler: () => void
}

interface Stat {
  label: string
  value: string | number
}

interface Props {
  title: string
  subtitle?: string
  type?: 'default' | 'hero' | 'compact'
  withBackground?: boolean
  tags?: string[]
  showActions?: boolean
  actions?: Action[]
  stats?: Stat[]
  showDecorations?: boolean
  fixedTop?: boolean  // 新增属性：是否固定在顶部
}

withDefaults(defineProps<Props>(), {
  type: 'default',
  withBackground: true,
  tags: () => [],
  showActions: false,
  actions: () => [],
  stats: () => [],
  showDecorations: true,
  fixedTop: true // 默认不固定在顶部
})
</script>

<style scoped>
.page-header {
  padding: 40px 0 30px;
  position: relative;
  z-index: 1;
}

.page-header.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  margin: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: rgba(20, 20, 30, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page-header.fixed-top .header-content {
  padding: 0 40px;
}

.page-header.fixed-top .main-title {
  font-size: 1.8rem;
}

.page-header.fixed-top .subtitle {
  font-size: 1rem;
}

.page-header.with-background {
  background: linear-gradient(135deg, 
    rgba(20, 20, 30, 0.95) 0%, 
    rgba(26, 26, 46, 0.9) 100%
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.title-section {
  flex: 1;
}

.main-title {
  font-size: 3rem;
  margin: 0 0 15px 0;
  background: linear-gradient(45deg, #6a11cb, #2575fc, #00d2ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 3s ease infinite;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.tag {
  background: rgba(106, 17, 203, 0.2);
  color: #a855f7;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(106, 17, 203, 0.3);
}

.actions-section {
  flex-shrink: 0;
}

.page-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #6a11cb;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.7;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.action-btn.primary {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.outline {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(106, 17, 203, 0.3);
}

/* 装饰元素 */
.decorations {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  overflow: hidden;
}

.decoration-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(106, 17, 203, 0.5), 
    rgba(37, 117, 252, 0.5), 
    transparent
  );
}

.decoration-dots {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(106, 17, 203, 0.8);
}

/* 类型变体 */
.page-header.hero {
  padding: 60px 0 40px;
}

.page-header.hero .main-title {
  font-size: 3.5rem;
}

.page-header.hero .subtitle {
  font-size: 1.3rem;
}

.page-header.compact {
  padding: 20px 0;
}

.page-header.compact .main-title {
  font-size: 2rem;
  margin-bottom: 8px;
}

.page-header.compact .subtitle {
  font-size: 1rem;
}

/* 动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    gap: 30px;
    padding: 0 30px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .actions-section {
    width: 100%;
  }
  
  .page-header.fixed-top .header-content {
    flex-direction: row;
    align-items: center;
  }
  
  .page-header.fixed-top .title-section {
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 30px 0 20px;
  }
  
  .header-content {
    padding: 0 20px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .page-stats {
    justify-content: space-around;
  }
  
  .page-header.fixed-top .main-title {
    font-size: 1.5rem;
  }
  
  .page-header.fixed-top .header-content {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
  
  .tags-section {
    justify-content: center;
  }
  
  .page-header.fixed-top .main-title {
    font-size: 1.3rem;
  }
  
  .page-header.fixed-top .subtitle {
    display: none; /* 在小屏幕上隐藏副标题以节省空间 */
  }
}
</style>