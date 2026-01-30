<template>
  <div class="model-page">
    <!-- 3D Canvas 容器 -->
    <div class="canvas-container" ref="canvasContainer">
      <canvas ref="canvas" class="model-canvas"></canvas>
      
      <!-- 加载指示器 -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <p>加载3D模型中...</p>
      </div>
      
      <!-- 控制面板 -->
      <div class="controls-panel">
        <div class="controls-group">
          <button @click="toggleAutoRotate" class="control-btn">
            {{ autoRotate ? '⏸️' : '🔄' }}
          </button>
          <button @click="resetCamera" class="control-btn">🏠</button>
          <button @click="toggleWireframe" class="control-btn">
            {{ showWireframe ? '🔲' : '⬜' }}
          </button>
          <button @click="toggleLights" class="control-btn">
            {{ lightsEnabled ? '💡' : '🌙' }}
          </button>
        </div>
      </div>
      
      <!-- 模型选择器 -->
      <div class="model-selector">
        <div 
          v-for="model in availableModels" 
          :key="model.id"
          :class="['model-thumbnail', { active: currentModel.id === model.id }]"
          @click="loadModel(model)"
        >
          <img :src="model.thumbnail" :alt="model.name" />
          <div class="thumbnail-label">{{ model.name }}</div>
        </div>
      </div>
    </div>
    
    <!-- 模型信息 -->
    <div class="model-info">
      <div class="info-content">
        <h1 class="model-title">{{ currentModel.name }}</h1>
        <p class="model-description">{{ currentModel.description }}</p>
        
        <div class="model-specs">
          <div class="spec-item">
            <span class="spec-label">顶点数:</span>
            <span class="spec-value">{{ modelStats.vertices.toLocaleString() }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">面数:</span>
            <span class="spec-value">{{ modelStats.faces.toLocaleString() }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">文件大小:</span>
            <span class="spec-value">{{ modelStats.size }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">格式:</span>
            <span class="spec-value">{{ currentModel.format }}</span>
          </div>
        </div>
        
        <div class="model-controls">
          <div class="slider-group">
            <label>旋转速度</label>
            <input 
              type="range" 
              min="0" 
              max="2" 
              step="0.1"
              v-model="rotationSpeed"
              class="slider"
            />
          </div>
          
          <div class="slider-group">
            <label>缩放</label>
            <input 
              type="range" 
              min="0.5" 
              max="3" 
              step="0.1"
              v-model="modelScale"
              class="slider"
            />
          </div>
          
          <div class="color-picker">
            <label>模型颜色</label>
            <input 
              type="color" 
              v-model="modelColor"
              class="color-input"
            />
          </div>
        </div>
        
        <div class="model-actions">
          <button @click="downloadModel" class="action-btn">
            ⬇️ 下载模型
          </button>
          <button @click="toggleFullscreen" class="action-btn">
            ⛶ 全屏查看
          </button>
          <button @click="captureScreenshot" class="action-btn">
            📸 截图
          </button>
        </div>
        
        <div v-if="screenshotUrl" class="screenshot-preview">
          <img :src="screenshotUrl" alt="截图预览" />
          <a :href="screenshotUrl" download="3d-model-screenshot.png" class="download-link">
            下载截图
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface ModelInfo {
  id: string
  name: string
  description: string
  format: string
  thumbnail: string
  size?: string
}

interface ModelStats {
  vertices: number
  faces: number
  size: string
}

const availableModels = ref<ModelInfo[]>([
  {
    id: 'robot',
    name: '机械机器人',
    description: '未来风格的机械机器人模型，具有详细的关节和动画能力',
    format: 'GLTF',
    thumbnail: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4',
    size: '5.2 MB'
  },
  {
    id: 'spaceship',
    name: '宇宙飞船',
    description: '科幻风格的宇宙飞船，适合太空探索场景',
    format: 'GLB',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06',
    size: '3.8 MB'
  },
  {
    id: 'architecture',
    name: '现代建筑',
    description: '现代风格建筑模型，展示精细的材质和光照效果',
    format: 'FBX',
    thumbnail: 'https://images.unsplash.com/photo-1487956382158-bb926046304a',
    size: '7.1 MB'
  },
  {
    id: 'character',
    name: '3D角色',
    description: '带有骨骼动画的游戏角色模型',
    format: 'GLTF',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    size: '4.5 MB'
  }
])

const currentModel = ref<ModelInfo>(availableModels.value[0])
const isLoading = ref(false)
const autoRotate = ref(true)
const showWireframe = ref(false)
const lightsEnabled = ref(true)
const rotationSpeed = ref(1)
const modelScale = ref(1)
const modelColor = ref('#6a11cb')
const screenshotUrl = ref('')
const modelStats = ref<ModelStats>({
  vertices: 12546,
  faces: 23418,
  size: '5.2 MB'
})

// Three.js 相关变量
const canvas = ref<HTMLCanvasElement>()
const canvasContainer = ref<HTMLElement>()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let currentMesh: THREE.Mesh | null = null
let animationId: number

onMounted(() => {
  initThreeJS()
  loadDefaultModel()
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
})

const initThreeJS = () => {
  if (!canvas.value) return
  
  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a)
  
  // 创建相机
  const container = canvasContainer.value
  const width = container?.clientWidth || 800
  const height = container?.clientHeight || 600
  
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvas.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  
  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  // 添加方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 10, 5)
  scene.add(directionalLight)
  
  // 响应窗口大小变化
  window.addEventListener('resize', onWindowResize)
}

const onWindowResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return
  
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const loadDefaultModel = () => {
  // 创建一个简单的默认几何体作为占位符
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x6a11cb,
    roughness: 0.4,
    metalness: 0.6
  })
  
  if (currentMesh) {
    scene.remove(currentMesh)
  }
  
  currentMesh = new THREE.Mesh(geometry, material)
  scene.add(currentMesh)
  
  updateMaterial()
}

const loadModel = (model: ModelInfo) => {
  isLoading.value = true
  currentModel.value = model
  
  // 模拟加载延迟
  setTimeout(() => {
    // 这里应该加载真实的3D模型文件
    // 由于我们使用示例，这里创建一个随机几何体
    createRandomModel()
    isLoading.value = false
  }, 1500)
}

const createRandomModel = () => {
  if (currentMesh) {
    scene.remove(currentMesh)
  }
  
  // 随机选择一种几何体
  const geometries = [
    () => new THREE.IcosahedronGeometry(1.5, 2),
    () => new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
    () => new THREE.OctahedronGeometry(1.5, 1),
    () => new THREE.DodecahedronGeometry(1.5, 1)
  ]
  
  const randomGeometry = geometries[Math.floor(Math.random() * geometries.length)]()
  
  const material = new THREE.MeshStandardMaterial({ 
    color: modelColor.value,
    roughness: 0.3,
    metalness: 0.7
  })
  
  currentMesh = new THREE.Mesh(randomGeometry, material)
  scene.add(currentMesh)
  
  // 更新模型统计信息
  modelStats.value = {
    vertices: randomGeometry.attributes.position.count,
    faces: randomGeometry.index ? randomGeometry.index.count / 3 : 0,
    size: currentModel.value.size || 'N/A'
  }
  
  updateMaterial()
}

const updateMaterial = () => {
  if (!currentMesh) return
  
  const material = currentMesh.material as THREE.MeshStandardMaterial
  material.color.setStyle(modelColor.value)
  material.wireframe = showWireframe.value
  
  if (lightsEnabled.value) {
    material.emissive.set(0x000000)
    material.emissiveIntensity = 0
  } else {
    material.emissive.setStyle(modelColor.value)
    material.emissiveIntensity = 0.2
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  if (autoRotate.value && currentMesh) {
    currentMesh.rotation.y += 0.01 * rotationSpeed.value
  }
  
  controls.update()
  renderer.render(scene, camera)
}

const toggleAutoRotate = () => {
  autoRotate.value = !autoRotate.value
}

const resetCamera = () => {
  controls.reset()
  camera.position.set(0, 0, 5)
}

const toggleWireframe = () => {
  showWireframe.value = !showWireframe.value
  updateMaterial()
}

const toggleLights = () => {
  lightsEnabled.value = !lightsEnabled.value
  updateMaterial()
}

watch(modelColor, () => {
  updateMaterial()
})

watch(modelScale, (newScale) => {
  if (currentMesh) {
    currentMesh.scale.setScalar(newScale)
  }
})

const downloadModel = () => {
  // 这里应该提供真实模型的下载链接
  alert(`下载模型: ${currentModel.value.name}`)
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement && canvasContainer.value) {
    canvasContainer.value.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const captureScreenshot = () => {
  if (!renderer) return
  
  renderer.render(scene, camera)
  const dataURL = renderer.domElement.toDataURL('image/png')
  screenshotUrl.value = dataURL
}
</script>

<style scoped>
.model-page {
  display: flex;
  height: 100%;
  color: white;
}

.canvas-container {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  overflow: hidden;
}

.model-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #6a11cb;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.controls-panel {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 10px;
  z-index: 10;
}

.controls-group {
  display: flex;
  gap: 10px;
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(106, 17, 203, 0.5);
  transform: scale(1.1);
}

.model-selector {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
}

.model-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.model-thumbnail:hover {
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.model-thumbnail.active {
  border-color: #6a11cb;
  box-shadow: 0 0 15px rgba(106, 17, 203, 0.5);
}

.model-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px;
  font-size: 0.7rem;
  text-align: center;
}

.model-info {
  width: 400px;
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(10px);
  padding: 30px;
  overflow-y: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.info-content {
  height: 100%;
}

.model-title {
  font-size: 2rem;
  margin: 0 0 15px 0;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.model-description {
  margin: 0 0 30px 0;
  line-height: 1.6;
  opacity: 0.9;
}

.model-specs {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-item:last-child {
  border-bottom: none;
}

.spec-label {
  opacity: 0.7;
}

.spec-value {
  font-weight: bold;
  color: #6a11cb;
}

.model-controls {
  margin-bottom: 30px;
}

.slider-group {
  margin-bottom: 20px;
}

.slider-group label {
  display: block;
  margin-bottom: 8px;
  opacity: 0.8;
}

.slider {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #6a11cb;
  border-radius: 50%;
  cursor: pointer;
}

.color-picker {
  margin-bottom: 20px;
}

.color-picker label {
  display: block;
  margin-bottom: 8px;
  opacity: 0.8;
}

.color-input {
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
}

.model-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.action-btn {
  flex: 1;
  padding: 15px;
  background: rgba(106, 17, 203, 0.2);
  border: 1px solid rgba(106, 17, 203, 0.5);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-btn:hover {
  background: rgba(106, 17, 203, 0.4);
  transform: translateY(-2px);
}

.screenshot-preview {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.screenshot-preview img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.download-link {
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: bold;
  transition: all 0.3s;
}

.download-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
}

@media (max-width: 1024px) {
  .model-page {
    flex-direction: column;
  }
  
  .model-info {
    width: 100%;
    height: 400px;
  }
  
  .model-selector {
    top: auto;
    bottom: 100px;
    right: 20px;
    flex-direction: row;
    transform: none;
  }
  
  .model-thumbnail {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 768px) {
  .model-info {
    padding: 20px;
  }
  
  .model-actions {
    flex-direction: column;
  }
  
  .model-selector {
    display: none; /* 移动端隐藏模型选择器 */
  }
}
</style>