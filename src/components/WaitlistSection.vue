<template>
  <section id="waitlist" class="py-32 bg-cover bg-center bg-no-repeat relative" style="background-image: url('/src/assets/images/waitlistImg.JPG')">
    <!-- Overlay for better text readability -->
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    <div class="container-custom relative z-10">
      <div class="text-center mb-20">
        <h2 class="text-5xl font-bold text-white mb-8">
          Join the waitlist
        </h2>
        <p class="text-xl text-gray-200 max-w-2xl mx-auto">
          Be first to access FocusedTennis and get exclusive early-bird pricing
        </p>
      </div>

      <div v-if="submitted" class="max-w-2xl mx-auto text-center relative z-10">
        <div class="bg-green-50 border border-green-200 rounded-3xl p-12">
          <div class="text-8xl mb-6">✅</div>
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Welcome to FocusedTennis!</h3>
          <p class="text-gray-600 text-lg">You're on the list! We'll notify you when we launch.</p>
        </div>
      </div>

      <div v-else class="max-w-2xl mx-auto relative z-10">
        <div class="bg-white rounded-3xl p-12 shadow-xl">
          <form @submit.prevent="submitForm" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Name</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  required 
                  class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  placeholder="Your name"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  required 
                  class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  placeholder="your@email.com"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Tennis level</label>
              <select 
                v-model="form.level" 
                required 
                class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              >
                <option value="">Select your level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="competitive">Competitive</option>
              </select>
            </div>

            <button 
              type="submit" 
              :disabled="submitting"
              class="w-full btn-primary text-xl py-5 rounded-xl"
            >
              {{ submitting ? 'Joining...' : 'Join waitlist' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const submitted = ref(false)
const submitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  level: ''
})

const submitForm = async () => {
  submitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('Waitlist submission:', form)
  localStorage.setItem('focusedtennis_waitlist', JSON.stringify(form))
  
  submitted.value = true
  submitting.value = false
}
</script>