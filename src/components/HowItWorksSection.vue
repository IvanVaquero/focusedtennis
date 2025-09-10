<template>
  <section id="how-it-works" class="py-32 bg-white">
    <div class="container-custom">
      <div class="text-center mb-32">
        <h2 class="text-5xl font-bold text-gray-900 mb-8">
          Simple. Effective. Powerful.
        </h2>
      </div>

      <div class="relative">
        <!-- Connecting Line -->
        <div class="hidden lg:block absolute top-48 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-32">
          <div class="relative">
            <!-- Step Number - Linear Style with Overflow -->
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
              <div class="w-28 h-28 bg-black text-white flex items-center justify-center text-4xl font-bold shadow-xl" style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);">
                1
              </div>
            </div>
            
            <!-- Image -->
            <div class="mt-8 mb-12">
              <div class="w-64 h-64 mx-auto overflow-hidden shadow-2xl">
                <img 
                  src="/src/assets/images/proCoach.jpg" 
                  alt="Professional tennis coach" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <!-- Content -->
            <div class="text-center">
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Book a Pro Coach</h3>
              <p class="text-gray-600 text-xl">Connect with certified professionals</p>
            </div>
          </div>

          <div class="relative">
            <!-- Step Number - Linear Style with Overflow -->
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
              <div class="w-28 h-28 bg-black text-white flex items-center justify-center text-4xl font-bold shadow-xl" style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);">
                2
              </div>
            </div>
            
            <!-- Image -->
            <div class="mt-8 mb-12">
              <div class="w-64 h-64 mx-auto overflow-hidden shadow-2xl">
                <img 
                  src="/src/assets/images/aiAnalysis.jpg" 
                  alt="AI analysis dashboard" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <!-- Content -->
            <div class="text-center">
              <h3 class="text-3xl font-bold text-gray-900 mb-6">AI Analysis</h3>
              <p class="text-gray-600 text-xl">Real-time performance insights</p>
            </div>
          </div>

          <div class="relative">
            <!-- Step Number - Linear Style with Overflow -->
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
              <div class="w-28 h-28 bg-black text-white flex items-center justify-center text-4xl font-bold shadow-xl" style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);">
                3
              </div>
            </div>
            
            <!-- Image -->
            <div class="mt-8 mb-12">
              <div class="w-64 h-64 mx-auto overflow-hidden shadow-2xl">
                <img 
                  src="/src/assets/images/growthTennis.jpg" 
                  alt="Tennis player improvement and growth" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <!-- Content -->
            <div class="text-center">
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Continuous Growth</h3>
              <p class="text-gray-600 text-xl">Personalized improvement plans</p>
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