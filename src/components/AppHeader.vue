<template>
  <header class="header" :class="headerClasses">
    <nav class="nav">
      <div class="nav-container">
        <!-- Logo and Text - Left -->
        <div class="logo-section">
          <img src="/src/assets/images/logo.png" alt="FocusedTennis Logo" class="logo">
          <span class="brand-text">FocusedTennis</span>
        </div>

        <!-- Navigation - Center -->
        <div class="nav-menu">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="nav-link">
            {{ item.label }}
          </a>
        </div>

        <!-- CTA and Mobile Menu - Right -->
        <div class="nav-actions">
          <q-btn 
            class="cta-button" 
            size="md"
            unelevated
            @click="scrollTo('#waitlist')"
          >
            Join waitlist
          </q-btn>
          <q-btn 
            class="mobile-menu-btn" 
            flat 
            round 
            icon="menu"
            color="white"
            @click="mobileMenuOpen = !mobileMenuOpen" 
          />
        </div>
      </div>

      <!-- Mobile menu -->
      <q-slide-transition>
        <div v-show="mobileMenuOpen" class="mobile-menu">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="mobile-nav-link" @click="mobileMenuOpen = false">
            {{ item.label }}
          </a>
          <q-btn 
            class="mobile-cta-button" 
            color="primary" 
            size="md"
            rounded
            unelevated
            @click="scrollTo('#waitlist'); mobileMenuOpen = false"
          >
            Join waitlist
          </q-btn>
        </div>
      </q-slide-transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#coaches', label: 'Coaches' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#ai', label: 'AI' },
  { href: '#faq', label: 'FAQ' }
]

const headerClasses = computed(() => ({
  'header--scrolled': isScrolled.value
}))

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollTo = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Header Base Styles */
.header {
  @apply fixed top-0 left-0 right-0 z-50 transition-all duration-300;
}

.header--scrolled {
  background: rgba(0, 0, 0, 0.95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Navigation Container */
.nav {
  @apply container-custom py-4;
}

.nav-container {
  @apply flex items-center justify-between w-full;
}

/* Logo Section */
.logo-section {
  @apply flex items-center space-x-3;
}

.logo {
  @apply w-10 h-10 object-contain;
}

.brand-text {
  @apply text-xl font-bold text-white drop-shadow-lg;
}

/* Navigation Menu */
.nav-menu {
  @apply hidden lg:flex items-center space-x-6 flex-1 justify-center;
}

.nav-link {
  @apply text-white hover:text-primary-400 font-medium transition-colors drop-shadow-md px-4 py-2 rounded-lg hover:bg-white/10 text-sm;
}

/* Navigation Actions */
.nav-actions {
  @apply flex items-center space-x-4;
}

.cta-button {
  @apply hidden lg:block;
  background-color: black;
  color: #ffffff;
  padding: 5px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #2c5a9f;
}

.header--scrolled .cta-button {
  background-color: #ffffff;
  color: #000000;
}

.header--scrolled .cta-button:hover {
  background-color: #2c5a9f;
}

.mobile-menu-btn {
  @apply lg:hidden;
}

/* Mobile Menu */
.mobile-menu {
  @apply lg:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-lg shadow-xl;
}

.mobile-nav-link {
  @apply text-gray-700 hover:text-primary-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors block;
}

.mobile-cta-button {
  @apply mx-4 mt-2;
}
</style>
