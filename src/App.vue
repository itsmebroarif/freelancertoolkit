<template>
  <div id="app">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: isCollapsed }]">
      <button class="toggle-btn" @click="isCollapsed = !isCollapsed">
        <span v-if="isCollapsed">➡️</span>
        <span v-else>Freelancer toolkit ‎  ⬅️</span>
      </button>

      <router-link to="/" class="sidebar-item">
        <span class="icon">🏠</span>
        <span v-if="!isCollapsed" class="text">Beranda</span>
      </router-link>
      <router-link to="/about" class="sidebar-item">
        <span class="icon">ℹ️</span>
        <span v-if="!isCollapsed" class="text">Tentang</span>
      </router-link>
      <router-link to="/todo" class="sidebar-item">
        <span class="icon">📝</span>
        <span v-if="!isCollapsed" class="text">Todo</span>
      </router-link>
      <router-link to="/project" class="sidebar-item">
        <span class="icon">📂</span>
        <span v-if="!isCollapsed" class="text">Proyek</span>
      </router-link>
      <router-link to="/finance" class="sidebar-item">
        <span class="icon">💰</span>
        <span v-if="!isCollapsed" class="text">Keuangan</span>
      </router-link>
      <router-link to="/mail" class="sidebar-item">
        <span class="icon">✉️</span>
        <span v-if="!isCollapsed" class="text">Invoice</span>
      </router-link>
      <router-link to="/chat" class="sidebar-item">
        <span class="icon">💭</span>
        <span v-if="!isCollapsed" class="text">Contact Developer</span>
      </router-link>

      <!-- Donate button -->
      <a
        href="https://trakteer.id/itsmebroarif/tip?open=true"
        target="_blank"
        class="sidebar-item donate-link"
      >
        <span class="icon">☕</span>
        <span v-if="!isCollapsed" class="text">Donate</span>
      </a>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* background: #f3f6fa; */
}

/* Sidebar Fix */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background: #2c3e50;
  color: white;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s;
}

.sidebar-item:hover {
  background: #34495e;
}

.sidebar-item.router-link-exact-active {
  background: #42b983;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2em;
  margin-bottom: 16px;
  cursor: pointer;
  align-self: flex-end;
}

.donate-link {
  margin-top: auto;
  background: #e67e22;
}

.donate-link:hover {
  background: #d35400;
}

/* Main Content shift */
.main-content {
  margin-left: 220px;
  padding: 40px;
  transition: margin-left 0.3s ease;
}

.sidebar.collapsed ~ .main-content {
  margin-left: 60px;
}

/* Optional: transition for collapse */
</style>


