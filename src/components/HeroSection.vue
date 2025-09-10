<template>
  <section id="home" class="min-h-screen flex items-center relative pt-20 border-b-4 border-white">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover"
      style="background-image: url('/src/assets/images/heroImage2.JPG'); background-position: 70% center;"
    >
      <div class="absolute inset-0 bg-black/25"></div>
    </div>

    <!-- Content -->
    <div class="container-custom relative z-10">
      <div class="max-w-7xl">
        <div class="space-y-10">
          <!-- Main Heading -->
          <div class="space-y-6">
            <h1 class="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight">
              Elevate your 
              <span style="color: black;" class="font-extrabold">tennis</span> 
              with Top Coaches
            </h1>
            <p class="text-2xl text-white leading-relaxed max-w-5xl">
              Professional coaching meets artificial intelligence for the ultimate tennis experience.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6">
            <button class="font-bold text-xl px-12 py-5 rounded-xl transition-colors duration-200" 
                    style="background-color: black; color: #ffffff;" 
                    @click="scrollTo('#waitlist')"
                    onmouseover="this.style.backgroundColor='#2c5a9f'"
                    onmouseout="this.style.backgroundColor='black'">
              Join waitlist
            </button>
            <button class="border-2 font-semibold text-xl px-12 py-5 rounded-xl transition-all duration-200"
                    style="border-color: #ffffff; color: #ffffff;"
                    @click="scrollTo('#how-it-works')"
                    onmouseover="this.style.backgroundColor='#ffffff'; this.style.color='#000000'"
                    onmouseout="this.style.backgroundColor='transparent'; this.style.color='#ffffff'">
              Learn more
            </button>
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