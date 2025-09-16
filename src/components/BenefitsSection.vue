<template>
  <section id="services" class="h-[80vh] bg-white">
    <div class="h-full flex">
      <div class="grid grid-cols-1 md:grid-cols-3 w-full">
        <!-- TODO - Mental + Tactical + Mentorship -->
        <!-- Technique Column -->
        <div class="relative group cursor-pointer h-full">
          <div class="relative h-full overflow-hidden">
            <!-- Background Image with Blur -->
            <div 
              class="absolute inset-0 bg-cover bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
              style="background-image: url('/src/assets/images/technique.jpg');"
            ></div>
            
            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors duration-300"></div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <h2 class="text-7xl font-bold text-black mb-4 group-hover:text-primary-300 transition-colors duration-300">Tactics</h2>
              <p class="text-white text-xl leading-relaxed">Perfect your strokes with AI-powered analysis</p>
            </div>
          </div>
        </div>

        <!-- Strategy Column -->
        <div class="relative group cursor-pointer h-full">
          <div class="relative h-full overflow-hidden">
            <!-- Background Image with Blur -->
            <div 
              class="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
              style="background-image: url('/src/assets/images/strategy.jpg');"
            ></div>
            
            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors duration-300"></div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <h2 class="text-7xl font-bold text-black mb-4 group-hover:text-primary-300 transition-colors duration-300">Mental</h2>
              <p class="text-white text-xl leading-relaxed">Develop winning game plans and tactics</p>
            </div>
          </div>
        </div>

        <!-- Mental Game Column -->
        <div class="relative group cursor-pointer h-full">
          <div class="relative h-full overflow-hidden">
            <!-- Background Image with Blur -->
            <div 
              class="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
              style="background-image: url('/src/assets/images/mental.png');"
            ></div>
            
            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors duration-300"></div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <h2 class="text-7xl font-bold text-black mb-4 group-hover:text-primary-300 transition-colors duration-300">Mentorship</h2>
              <p class="text-white text-xl leading-relaxed">Build confidence and competitive mindset</p>
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