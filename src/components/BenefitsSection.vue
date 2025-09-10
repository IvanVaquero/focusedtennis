<template>
  <section id="services" class="h-[80vh] bg-white border-b-4 border-black">
    <div class="h-full flex">
      <div class="grid grid-cols-1 md:grid-cols-3 w-full">
        <!-- TODO - Mental + Tactical + Mentorship -->
        <!-- Technique Column -->
        <div class="relative group cursor-pointer h-full">
          <div class="relative h-full overflow-hidden">
            <!-- Background Image with Blur -->
            <div 
              class="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
              style="background-image: url('/src/assets/images/technique2.jpg');"
            ></div>
            
            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <h3 class="text-3xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">Tactics</h3>
              <p class="text-white/90 text-lg leading-relaxed">Perfect your strokes with AI-powered analysis</p>
            </div>
          </div>
        </div>

        <!-- Strategy Column -->
        <div class="relative group cursor-pointer h-full border-r-4 border-white border-l-4 border-white">
          <div class="relative h-full overflow-hidden">
            <!-- Background Image with Blur -->
            <div 
              class="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
              style="background-image: url('/src/assets/images/strategy.jpg');"
            ></div>
            
            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <h3 class="text-3xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">Mental Game</h3>
              <p class="text-white/90 text-lg leading-relaxed">Develop winning game plans and tactics</p>
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
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
            
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <h3 class="text-3xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">Mentorship</h3>
              <p class="text-white/90 text-lg leading-relaxed">Build confidence and competitive mindset</p>
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