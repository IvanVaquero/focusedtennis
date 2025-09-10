<template>
  <section id="coaches" class="py-32 bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-20">
        <h2 class="text-5xl font-bold text-gray-900 mb-8">
          Transform your tennis with Elite Pro Insights
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn directly from top coaches and apply world-class strategies to your game
        </p>
        <!-- Join List button instead of images -->
      </div>

      <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="coach in coaches" :key="coach.id" class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div class="h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span class="text-8xl">{{ coach.emoji }}</span>
          </div>
          <div class="p-8 text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ coach.name }}</h3>
            <p class="text-primary-600 font-semibold mb-4">{{ coach.title }}</p>
            <div class="flex justify-center space-x-6 text-sm text-gray-500">
              <span>{{ coach.experience }} years</span>
              <span>{{ coach.students }} students</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
const coaches = [
  {
    id: 1,
    name: 'Maria Gonzalez',
    title: 'Technique Specialist',
    emoji: '👩‍🏫',
    experience: '15+',
    students: '200+'
  },
  {
    id: 2,
    name: 'Carlos Rodriguez',
    title: 'Strategy Expert',
    emoji: '👨‍🏫',
    experience: '12+',
    students: '150+'
  },
  {
    id: 3,
    name: 'Ana Martinez',
    title: 'Mental Coach',
    emoji: '👩‍⚕️',
    experience: '10+',
    students: '180+'
  }
]
</script>