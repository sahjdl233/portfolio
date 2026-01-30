<template>
  <footer class="contact-footer" :class="{ 'is-active': isActive }">
    <div class="toggle-btn" @click="$emit('toggle')">
      <span class="icon">{{ isActive ? '✕' : '✉️' }}</span>
      <span class="text">{{ isActive ? '关闭' : '联系我' }}</span>
    </div>
    
    <div class="contact-content">
      <div class="contact-header">
        <h2>📨 发送消息</h2>
        <p>有项目合作意向或想要交流？请随时联系我</p>
      </div>
      
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">姓名 *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="请输入您的姓名"
            />
          </div>
          
          <div class="form-group">
            <label for="email">邮箱 *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="example@email.com"
            />
          </div>
          
          <div class="form-group">
            <label for="subject">主题</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              placeholder="消息主题"
            />
          </div>
          
          <div class="form-group full-width">
            <label for="message">消息内容 *</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="4"
              placeholder="请详细描述您的需求..."
            ></textarea>
          </div>
        </div>
        
        <div class="form-footer">
          <button type="submit" :disabled="isSubmitting" class="submit-btn">
            {{ isSubmitting ? '发送中...' : '发送消息' }}
          </button>
          
          <div class="contact-info">
            <div class="info-item">
              <span class="icon">📧</span>
              <span>contact@example.com</span>
            </div>
            <div class="info-item">
              <span class="icon">📱</span>
              <span>+86 138 0013 8000</span>
            </div>
          </div>
        </div>
      </form>
      
      <!-- 社交媒体链接 -->
      <div class="social-links">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          target="_blank"
          class="social-link"
          :title="social.name"
        >
          <span class="icon">{{ social.icon }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Props {
  isActive?: boolean
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const form = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const socialLinks = ref([
  { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
  { name: 'Bilibili', icon: '📺', url: 'https://bilibili.com' },
  { name: '知乎', icon: '💡', url: 'https://zhihu.com' },
  { name: '微博', icon: '🐦', url: 'https://weibo.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' }
])

const submitForm = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    // 这里可以对接后端API或使用EmailJS等第三方服务
    const response = await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    
    if (response.ok) {
      alert('消息发送成功！我会尽快回复您。')
      // 重置表单
      Object.assign(form, {
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } else {
      throw new Error('发送失败')
    }
  } catch (error) {
    alert('发送失败，请稍后重试或直接发送邮件联系我。')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(20, 20, 30, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1000;
}

.contact-footer:not(.is-active) {
  transform: translateY(calc(100% - 60px));
}

.toggle-btn {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  padding: 15px 30px;
  border-radius: 30px 30px 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  transition: all 0.3s;
  z-index: 1;
}

.toggle-btn:hover {
  transform: translateX(-50%) translateY(-5px);
}

.contact-content {
  padding: 40px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.contact-header h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.contact-header p {
  opacity: 0.8;
  font-size: 1.1rem;
}

.contact-form {
  margin-bottom: 40px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  color: white;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6a11cb;
  background: rgba(255, 255, 255, 0.15);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.submit-btn {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(106, 17, 203, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-info {
  display: flex;
  gap: 30px;
  color: white;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.9;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s;
  text-decoration: none;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .contact-info {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>