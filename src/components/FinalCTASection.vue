<template>
  <section class="py-32 bg-primary-500 text-white">
    <div class="container-custom text-center">
      <h2 class="text-5xl font-bold mb-8">
        Ready to elevate your game?
      </h2>
      <p class="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
        Join hundreds of players already improving with FocusedTennis
      </p>
      <button 
        @click="scrollTo('#waitlist')"
        class="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-5 px-12 rounded-xl text-xl transition-colors duration-200"
      >
        Join waitlist
      </button>
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