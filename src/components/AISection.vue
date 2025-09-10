<template>
  <section id="ai" class="py-32 bg-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div class="space-y-10">
          <h2 class="text-5xl font-bold text-gray-900">
            Your <span class="text-gradient">AI coach</span> 24/7
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed">
            Get instant feedback, track progress, and receive personalized training recommendations anytime.
          </p>

          <div class="space-y-8">
            <div class="flex items-center space-x-6">
              <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                <span class="text-2xl">🧠</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Smart Analysis</h3>
                <p class="text-gray-600">AI learns your playing style</p>
              </div>
            </div>

            <div class="flex items-center space-x-6">
              <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                <span class="text-2xl">⚡</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Instant Feedback</h3>
                <p class="text-gray-600">Real-time performance insights</p>
              </div>
            </div>
          </div>

          <button class="btn-primary text-xl px-10 py-5" @click="scrollTo('#waitlist')">
            Try AI coaching
          </button>
        </div>

        <!-- AI Chat Preview -->
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div class="bg-primary-500 text-white p-6 flex items-center space-x-4">
            <div class="text-3xl">🤖</div>
            <div>
              <h3 class="text-xl font-semibold">AI Coach</h3>
              <p class="text-primary-100">Online</p>
            </div>
          </div>

          <div class="p-8 space-y-6 h-96 bg-gray-50">
            <div class="flex space-x-4">
              <div class="text-3xl">🤖</div>
              <div class="bg-white rounded-2xl p-4 max-w-sm shadow-sm">
                <p class="text-gray-700">Great session today! Your backhand improved 15%. Ready for tomorrow's focus?</p>
              </div>
            </div>

            <div class="flex space-x-4 justify-end">
              <div class="bg-primary-500 text-white rounded-2xl p-4 max-w-sm">
                <p>Yes! What should I work on?</p>
              </div>
              <div class="text-3xl">👤</div>
            </div>

            <div class="flex space-x-4">
              <div class="text-3xl">🤖</div>
              <div class="bg-white rounded-2xl p-4 max-w-sm shadow-sm">
                <p class="text-gray-700">Let's focus on your serve placement. I've prepared 3 specific drills for you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollTo = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>