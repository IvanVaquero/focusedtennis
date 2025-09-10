<template>
  <footer class="bg-gray-900 text-white">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span class="text-black font-bold text-lg">FT</span>
            </div>
            <span class="text-xl font-bold">FocusedTennis</span>
          </div>
          <p class="text-gray-300 mb-6 max-w-md">
            Elevate your tennis with professional coaching and the power of artificial intelligence. 
            Improve your technique, tactics, and psychology with 1:1 sessions and an AI agent that accompanies you daily.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
              🐦
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Instagram">
              📸
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              💼
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200" aria-label="YouTube">
              📺
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick links</h3>
          <ul class="space-y-2">
            <li><a href="#services" class="text-gray-300 hover:text-white transition-colors duration-200">Services</a></li>
            <li><a href="#coaches" class="text-gray-300 hover:text-white transition-colors duration-200">Coaches</a></li>
            <li><a href="#how-it-works" class="text-gray-300 hover:text-white transition-colors duration-200">How it works</a></li>
            <li><a href="#ai" class="text-gray-300 hover:text-white transition-colors duration-200">AI & Chat Bot</a></li>
            <li><a href="#faq" class="text-gray-300 hover:text-white transition-colors duration-200">FAQ</a></li>
          </ul>
        </div>

        <!-- Contact & Legal -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <span class="text-primary-400">📧</span>
              <a href="mailto:hello@focusedtennis.com" class="text-gray-300 hover:text-white transition-colors duration-200">
                hello@focusedtennis.com
              </a>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-primary-400">📞</span>
              <span class="text-gray-300">+1 (555) 123-4567</span>
            </div>
          </div>

          <div class="mt-6">
            <h4 class="text-sm font-semibold mb-2 text-gray-400">Legal</h4>
            <ul class="space-y-1">
              <li><a href="#" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Privacy policy</a></li>
              <li><a href="#" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Terms of service</a></li>
              <li><a href="#" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} FocusedTennis. All rights reserved.
        </p>
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <span class="text-gray-400 text-sm">Made with ❤️ for tennis players</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>