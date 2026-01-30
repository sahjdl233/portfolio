<template>
  <div class="about-page">
    <div class="page-container">
      <!-- 个人信息卡片 -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="头像" />
          </div>
          <div class="profile-info">
            <h1 class="name">张明</h1>
            <p class="title">前端开发者 & 视觉设计师</p>
            <p class="location">📍 上海, 中国</p>
          </div>
        </div>
        
        <div class="profile-content">
          <p class="bio">
            热爱创造美观且实用的数字体验。专注于现代Web技术，特别是Vue和Three.js。
            致力于将创意想法转化为引人入胜的交互式作品。
          </p>
          
          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">完成项目</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5+</span>
              <span class="stat-label">年经验</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">30+</span>
              <span class="stat-label">满意客户</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 时间线 -->
      <div class="timeline-section">
        <h2 class="section-title">🎯 职业生涯</h2>
        <div class="timeline">
          <div class="timeline-item" v-for="item in timeline" :key="item.year">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 教育背景 -->
      <div class="education-section">
        <h2 class="section-title">🎓 教育背景</h2>
        <div class="education-grid">
          <div class="education-card" v-for="edu in education" :key="edu.degree">
            <div class="edu-icon">{{ edu.icon }}</div>
            <h3>{{ edu.degree }}</h3>
            <p class="school">{{ edu.school }}</p>
            <p class="period">{{ edu.period }}</p>
            <p class="description">{{ edu.description }}</p>
          </div>
        </div>
      </div>
      
      <PageHeader
      title="关于我"
      subtitle="创意开发者 · 视觉设计师 · 技术探索者"
      type="hero"
      :tags="['前端开发', 'UI/UX设计', '3D图形', '交互设计']"
      
    />

      <!-- 兴趣爱好 -->
      <div class="hobbies-section">
        <h2 class="section-title">🌟 兴趣爱好</h2>
        <div class="hobbies-grid">
          <div class="hobby-card" v-for="hobby in hobbies" :key="hobby.name">
            <div class="hobby-icon">{{ hobby.icon }}</div>
            <h3>{{ hobby.name }}</h3>
            <p>{{ hobby.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface Education {
  degree: string
  school: string
  period: string
  description: string
  icon: string
}

interface Hobby {
  name: string
  description: string
  icon: string
}

const timeline = ref<TimelineItem[]>([
  {
    year: '2023',
    title: '高级前端开发工程师',
    description: '领导前端团队，负责复杂Web应用的架构设计和开发'
  },
  {
    year: '2021',
    title: '前端开发工程师',
    description: '专注于Vue.js和Three.js项目开发，实现交互式3D可视化'
  },
  {
    year: '2019',
    title: '全栈开发实习生',
    description: '学习并参与多个全栈项目的开发，积累实践经验'
  },
  {
    year: '2018',
    title: '计算机科学学士',
    description: '毕业于上海交通大学计算机科学与技术专业'
  }
])

const education = ref<Education[]>([
  {
    degree: '计算机科学学士',
    school: '上海交通大学',
    period: '2014 - 2018',
    description: '主修计算机科学，专注于图形学和交互设计',
    icon: '🎓'
  },
  {
    degree: 'Web开发证书',
    school: '慕课网',
    period: '2019',
    description: '完成高级Web开发和前端工程化课程',
    icon: '📚'
  },
  {
    degree: 'UI/UX设计课程',
    school: '设计学院',
    period: '2020',
    description: '学习现代UI/UX设计原则和最佳实践',
    icon: '🎨'
  }
])

const hobbies = ref<Hobby[]>([
  {
    name: '摄影',
    description: '用镜头捕捉生活中的美好瞬间',
    icon: '📷'
  },
  {
    name: '徒步',
    description: '探索大自然，寻找设计灵感',
    icon: '🥾'
  },
  {
    name: '音乐',
    description: '弹奏吉他，享受创作过程',
    icon: '🎸'
  },
  {
    name: '游戏开发',
    description: '业余时间尝试小型游戏项目',
    icon: '🎮'
  }
])
</script>

<style scoped>
.about-page {
  min-height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  overflow-y: auto;
  padding: 40px 20px;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 60px;
  animation: fadeIn 0.8s ease-out;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(106, 17, 203, 0.5);
  box-shadow: 0 10px 30px rgba(106, 17, 203, 0.2);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.title {
  font-size: 1.3rem;
  margin: 0 0 10px 0;
  opacity: 0.9;
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  opacity: 0.7;
}

.bio {
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 0 0 30px 0;
  max-width: 800px;
  opacity: 0.9;
}

.stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #6a11cb;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 5px;
}

.section-title {
  font-size: 2rem;
  margin: 0 0 30px 0;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border-radius: 3px;
}

.timeline-section {
  margin-bottom: 60px;
}

.timeline {
  position: relative;
  max-width: 800px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #6a11cb, #2575fc);
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  padding-left: 80px;
}

.timeline-year {
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
  background: rgba(106, 17, 203, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6a11cb;
  border: 2px solid #6a11cb;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 10px;
  border-left: 3px solid #6a11cb;
}

.timeline-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.timeline-content p {
  margin: 0;
  opacity: 0.8;
  line-height: 1.6;
}

.education-section {
  margin-bottom: 60px;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.education-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.education-card:hover {
  transform: translateY(-5px);
  border-color: #6a11cb;
  box-shadow: 0 10px 30px rgba(106, 17, 203, 0.2);
}

.edu-icon {
  font-size: 2rem;
  margin-bottom: 15px;
}

.education-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
}

.school {
  color: #6a11cb;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.period {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin: 0 0 15px 0;
}

.description {
  margin: 0;
  opacity: 0.8;
  line-height: 1.6;
}

.hobbies-section {
  margin-bottom: 60px;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.hobby-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hobby-card:hover {
  transform: translateY(-5px);
  background: rgba(106, 17, 203, 0.1);
  border-color: #6a11cb;
}

.hobby-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.hobby-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.hobby-card p {
  margin: 0;
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.5;
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

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .stats {
    justify-content: center;
    gap: 30px;
  }
  
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    padding-left: 60px;
  }
  
  .timeline-year {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
  
  .education-grid,
  .hobbies-grid {
    grid-template-columns: 1fr;
  }
}
</style>