<template>
  <section class="py-32 bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-20">
        <h2 class="text-5xl font-bold text-gray-900 mb-8">
          What our community says
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="bg-white rounded-3xl p-8 shadow-lg">
          <div class="flex items-center space-x-1 mb-6">
            <span v-for="star in 5" :key="star" class="text-yellow-400 text-2xl">⭐</span>
          </div>
          <blockquote class="text-gray-700 mb-8 text-lg leading-relaxed">
            "{{ testimonial.quote }}"
          </blockquote>
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 text-lg">{{ testimonial.name }}</h4>
              <p class="text-gray-600">{{ testimonial.level }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-20 bg-white rounded-3xl p-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div class="text-gray-600">Active players</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">95%</div>
            <div class="text-gray-600">Satisfaction</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div class="text-gray-600">Rating</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">85%</div>
            <div class="text-gray-600">Improve ranking</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    level: 'Intermediate',
    quote: 'Improved my backhand by 40% in just 3 months. The AI coaching is incredible!'
  },
  {
    id: 2,
    name: 'Carlos Mendez',
    level: 'Advanced',
    quote: 'The detailed analysis helped me understand my game like never before.'
  },
  {
    id: 3,
    name: 'Ana Garcia',
    level: 'Beginner',
    quote: 'Started from zero and now I feel confident on the court. Amazing coaches!'
  }
]
</script>