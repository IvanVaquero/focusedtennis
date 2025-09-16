<template>
  <section id="how-it-works" class="py-32 relative">
    <div 
      class="absolute inset-0 bg-no-repeat bg-cover image-steps"
      style="background-image: url('/src/assets/images/steps.JPG');"
    >
    </div>
    <div class="absolute inset-0 bg-black bg-opacity-25"></div>
    <div class="container-custom relative z-10">
      <div class="text-center mb-40">
        <h2 class="text-7xl font-bold text-black mb-8">
          Simple. Effective. Powerful.
        </h2>
      </div>

      <div class="relative">
      
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-32">
          <div class="relative">
            <!-- Step Number - Linear Style with Overflow -->
            <div class="absolute -top-20 left-1/2 transform -translate-x-1/2 z-20">
              <div class="w-[6.3rem] h-[6.3rem] bg-transparent text-white flex items-center justify-center text-5xl font-bold rounded-full border-2 border-white">
                1
              </div>
            </div>
            <!-- Content -->
            <div class="text-center pt-16">
              <h3 class="text-3xl font-bold text-white mb-6">Book a Pro Coach</h3>
              <p class="text-gray-200 text-xl">Connect with certified professionals</p>
            </div>
          </div>

          <div class="relative">
            <!-- Step Number - Linear Style with Overflow -->
            <div class="absolute -top-20 left-1/2 transform -translate-x-1/2 z-20">
              <div class="w-[6.3rem] h-[6.3rem] bg-transparent text-white flex items-center justify-center text-5xl font-bold rounded-full border-2 border-white">
                2
              </div>
            </div>
            
            <!-- Content -->
            <div class="text-center pt-16">
              <h3 class="text-3xl font-bold text-white mb-6">Get Expert Insights</h3>
              <p class="text-gray-200 text-xl">Real-time performance insights</p>
            </div>
          </div>

          <div class="relative">
            <!-- Step Number - Linear Style with Overflow -->
            <div class="absolute -top-20 left-1/2 transform -translate-x-1/2 z-20">
              <div class="w-[6.3rem] h-[6.3rem] bg-transparent text-white flex items-center justify-center text-5xl font-bold rounded-full border-2 border-white">
                3
              </div>
            </div>
            
            <!-- Content -->
            <div class="text-center pt-16">
              <h3 class="text-3xl font-bold text-white mb-6">Continuous Growth</h3>
              <p class="text-gray-200 text-xl">Personalized improvement plans</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

<style scoped>

.image-steps {
 background-position: 100% 3%;
}

</style>