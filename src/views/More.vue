<template>
  <div class="more-container">
    <div class="split-block illustration" @click="$router.push('/illustration')">
      <h2>Illustration</h2>
    </div>
    <div class="split-block threed" @click="$router.push('/3d')">
      <h2>3D Model & Rigging</h2>
    </div>
  </div>
</template>

<style scoped>
.more-container { display: flex; height: 80vh; }
.split-block {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s;
  font-size: 2rem;
  font-weight: bold;
}
.split-block:hover { opacity: 0.8; }
.illustration { background-color: #ffd8c6; }
.threed { background-color: #f4f3f2; }
</style>