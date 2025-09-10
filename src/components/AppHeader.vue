<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'">
    <nav class="container-custom py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">FT</span>
          </div>
          <span class="text-xl font-bold text-white">FocusedTennis</span>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#home" class="text-white hover:text-primary-600 font-medium transition-colors">Home</a>
          <a href="#services" class="text-white hover:text-primary-600 font-medium transition-colors">Services</a>
          <a href="#coaches" class="text-white hover:text-primary-600 font-medium transition-colors">Coaches</a>
          <a href="#how-it-works" class="text-white hover:text-primary-600 font-medium transition-colors">How it works</a>
          <a href="#ai" class="text-white hover:text-primary-600 font-medium transition-colors">AI</a>
          <a href="#faq" class="text-white hover:text-primary-600 font-medium transition-colors">FAQ</a>
        </div>

        <!-- CTA -->
        <button class="btn-primary hidden md:block" :class="isScrolled ? 'bg-white text-black': 'bg-black text-white'" @click="scrollTo('#waitlist')">
          Join waitlist
        </button>

        <!-- Mobile menu button -->
        <button class="md:hidden p-2" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
        <div class="flex flex-col space-y-4">
          <a href="#home" class="text-gray-700 hover:text-primary-600 font-medium px-4" @click="mobileMenuOpen = false">Home</a>
          <a href="#services" class="text-gray-700 hover:text-primary-600 font-medium px-4" @click="mobileMenuOpen = false">Services</a>
          <a href="#coaches" class="text-gray-700 hover:text-primary-600 font-medium px-4" @click="mobileMenuOpen = false">Coaches</a>
          <a href="#how-it-works" class="text-gray-700 hover:text-primary-600 font-medium px-4" @click="mobileMenuOpen = false">How it works</a>
          <a href="#ai" class="text-gray-700 hover:text-primary-600 font-medium px-4" @click="mobileMenuOpen = false">AI</a>
          <a href="#faq" class="text-gray-700 hover:text-primary-600 font-medium px-4" @click="mobileMenuOpen = false">FAQ</a>
          <button class="btn-primary mx-4" @click="scrollTo('#waitlist'); mobileMenuOpen = false">
            Join waitlist
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

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
