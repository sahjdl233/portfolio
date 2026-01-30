<template>
  <nav class="page-indicator">
    <div
      v-for="index in total"
      :key="index"
      :class="['dot', { active: current === index - 1 }]"
      @click="$emit('click', index - 1)"
      @mouseenter="hoverIndex = index - 1"
      @mouseleave="hoverIndex = null"
    >
      <div class="dot-inner"></div>
      <span class="dot-label">{{ getLabel(index - 1) }}</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  total: number
  current: number
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => []
})

const emit = defineEmits<{
  (e: 'click', index: number): void
}>()

const hoverIndex = ref<number | null>(null)

const getLabel = (index: number) => {
  return props.labels[index] || `Page ${index + 1}`
}
</script>

<style scoped>
.page-indicator {
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
}

.dot {
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dot-inner {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.3s;
}

.dot:hover .dot-inner,
.dot.active .dot-inner {
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
}

.dot.active .dot-inner {
  box-shadow: 0 0 15px rgba(106, 17, 203, 0.5);
}

.dot-label {
  position: absolute;
  right: 30px;
  white-space: nowrap;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s;
  pointer-events: none;
}

.dot:hover .dot-label {
  opacity: 1;
  transform: translateX(0);
}
</style>