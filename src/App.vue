<template>
  <div id="app">
    <div class="app-container">
      <main class="main-content">
        <router-view />
      </main>

      <!-- Dock-style Sidebar -->
      <aside class="dock-sidebar">
        <router-link to="/" class="dock-icon" exact-data-tooltip="Home">
          🏠
        </router-link>
        <router-link to="/about" class="dock-icon"> ℹ️ </router-link>
        <router-link to="/todo" class="dock-icon"> 📝 </router-link>
        <router-link to="/project" class="dock-icon"> 📂 </router-link>
        <router-link to="/finance" class="dock-icon"> 💰 </router-link>
        <router-link to="/mail" class="dock-icon"> ✉️ </router-link>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #f2f7ff;
}

.main-content {
  flex: 1;
  padding: 40px;
}

/* Dock-style Sidebar */
.dock-sidebar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 12px 24px;
  background: rgba(44, 62, 80, 0.95);
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.dock-icon {
  font-size: 1.8em;
  color: white;
  text-decoration: none;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
  position: relative;
}

.dock-icon::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 4px 8px;
  font-size: 0.7rem;
  border-radius: 4px;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.2s;
}

.dock-icon:hover::after {
  opacity: 1;
}

.dock-icon:hover {
  transform: scale(1.4);
  color: #42b983;
}

.dock-icon.router-link-exact-active {
  transform: scale(1.2);
  color: #42b983;
}
</style>
