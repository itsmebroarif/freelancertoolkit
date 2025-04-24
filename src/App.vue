<template>
  <div id="app">
    <div class="app-container">
      <aside class="sidebar">
        <h4 class="text-title">Freelance Tool</h4>
        <hr />
        <div class="d-flex flex-column">
          <router-link to="/" class="nav-link text-center" exact>
            <span class="icon">🏠</span> Home
          </router-link>
          <router-link to="/about" class="nav-link text-center">
            <span class="icon">ℹ️</span> About Developer
          </router-link>
        </div>
        <hr />
        <!-- Todo List -->
        <router-link to="/todo" class="nav-link text-center">
          <span class="icon">📝</span> Todo List
        </router-link>
        <!-- Project List -->
        <router-link to="/project" class="nav-link text-center">
          <span class="icon">📂</span> Project List
        </router-link>
        <!-- Count budgeting, balance, Income & Expenses -->
        <router-link to="/finance" class="nav-link text-center">
          <span class="icon">💰</span> Finance
        </router-link>
        <!-- Mail contract Builder -->
        <router-link to="/mail" class="nav-link text-center">
          <span class="icon">✉️</span> Mail Builder
        </router-link>
      </aside>

      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  overflow: hidden;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.sidebar {
  width: 220px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.4em;
  margin-bottom: 30px;
  font-weight: bold;
  color: #42b983;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.nav-link.router-link-exact-active,
.nav-link:hover {
  color: #42b983;
}

.icon {
  width: 20px;
  height: 20px;
}

.main-content {
  flex: 1;
  padding: 40px;
  background: #f5f7fa;
}
</style>
