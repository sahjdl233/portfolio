<!-- FloatingButton.vue -->
<template>
  <div class="floating-button-container">
    <button @click="$emit('toggle-menu')" class="floating-btn">
      ☰
    </button>
    <button @click="$emit('toggle-contact')" class="floating-btn">
      ✉️
    </button>
    <button @click="$emit('scroll-to-top')" class="floating-btn">
      ↑
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'toggle-menu'): void
  (e: 'toggle-contact'): void
  (e: 'scroll-to-top'): void
}>()
</script>

<style scoped>
.floating-button-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}

.floating-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
</style>