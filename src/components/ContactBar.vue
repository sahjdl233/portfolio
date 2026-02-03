<template>
  <div class="contact-bar">
    <div class="contact-header" @click="toggleOpen">
      <h3>Contact Me</h3>
      <span class="toggle-icon">{{ isOpen ? '▼' : '▲' }}</span>
    </div>
    
    <div class="contact-content" v-show="isOpen">
      <div class="form-area">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Content"></textarea>
        <button>Send</button>
      </div>
      
      <div class="social-icons">
        <a href="https://x.com/yourid" target="_blank">X</a>
        <a href="https://instagram.com/yourid" target="_blank">IG</a>
        <a href="https://linkedin.com/in/yourid" target="_blank">In</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isOpen = ref(true);
const toggleOpen = () => isOpen.value = !isOpen.value;
</script>

<style scoped lang="scss">
.contact-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffd8c6;
  z-index: 200;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.contact-header {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  background: rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.contact-header h3 { margin: 0; font-size: 1.2rem; }

.contact-content {
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  max-width: 600px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  background: rgba(255,255,255,0.8);
}

.social-icons {
  display: flex;
  gap: 20px;
}
.social-icons a {
  font-weight: bold;
  text-decoration: none;
  color: #000;
  font-size: 1.2rem;
  padding: 10px;
  background: white;
  border-radius: 5px;
}
</style>