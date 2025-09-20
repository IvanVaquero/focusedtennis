<template>
  <div class="list-management-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">FocusedTennis</h1>
        <p class="page-subtitle">Waitlist Management Dashboard</p>
        <router-link to="/" class="back-link">
          <q-btn 
            label="← Back to Website" 
            color="primary" 
            size="md" 
            rounded 
            outline
            class="back-btn"
          />
        </router-link>
      </div>
    </div>
    
    <div class="manager-container">
      <WaitlistManager />
    </div>
  </div>
</template>

<script setup lang="ts">
import WaitlistManager from '../components/WaitlistManager.vue'
</script>

<style scoped>
.list-management-page {
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 2rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.page-subtitle {
  font-size: 1rem;
  color: #cbd5e1;
  margin: 0.25rem 0 0 0;
}

.back-link {
  text-decoration: none;
}

.back-btn {
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.manager-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .manager-container {
    padding: 1rem;
  }
}
</style>
