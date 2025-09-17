<template>
  <section id="how-it-works" class="how-it-works">
    <div class="how-it-works-background">
      <div class="how-it-works-overlay"></div>
    </div>
    
    <div class="how-it-works-content">
      <div class="how-it-works-header">
        <h2 class="how-it-works-title">
          Simple. Effective. Powerful.
        </h2>
      </div>

      <div class="how-it-works-steps">
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="step-item"
          :class="{ 'step-item--active': index === activeStep }"
          @mouseenter="activeStep = index"
          @mouseleave="activeStep = -1"
        >
          
          <div class="step-content">
            <div class="step-icon">
              <q-avatar 
                :size="stepIconSize"
                color="white"
                text-color="black"
                class="step-avatar"
              >
                <q-icon :name="step.icon" size="2rem" />
              </q-avatar>
            </div>
            
            <div class="step-info">
              <div class="step-number">{{ index + 1 }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeStep = ref(-1)

const steps = [
  {
    id: 1,
    icon: 'person_add',
    title: 'Book a Pro Coach',
    description: 'Connect with certified professionals who understand your unique playing style and goals.'
  },
  {
    id: 2,
    icon: 'insights',
    title: 'Get Expert Insights',
    description: 'Receive real-time performance analysis and personalized feedback during every session.'
  },
  {
    id: 3,
    icon: 'trending_up',
    title: 'Continuous Growth',
    description: 'Follow structured improvement plans designed specifically for your skill level and aspirations.'
  }
]

const stepIconSize = computed(() => {
  return '4rem'
})
</script>

<style scoped>
/* Section */
.how-it-works {
  @apply py-24 relative overflow-hidden;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.how-it-works-background {
  @apply absolute inset-0 bg-cover bg-center bg-no-repeat;
  background-image: url('/src/assets/images/steps.JPG');
  background-position: 100% 3%;
  background-size: cover;
}

.how-it-works-overlay {
  @apply absolute inset-0 bg-black bg-opacity-25;
}

.how-it-works-content {
  @apply container-custom relative z-10;
}

/* Header */
.how-it-works-header {
  @apply text-center mb-20;
}

.how-it-works-title {
  @apply text-6xl font-bold text-black mb-6;
}

/* Steps */
.how-it-works-steps {
  @apply flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12;
  position: relative;
}

.step-item {
  @apply flex flex-col items-center relative;
  flex: 1;
  max-width: 420px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  transform-origin: center center;
}

.step-item--active {
  transform: scale(1.2);
  opacity: 1;
  z-index: 10;
}

.step-content {
  @apply text-center relative z-10;
}

.step-icon {
  @apply mb-6 relative;
}

.step-info {
  @apply relative;
}

.step-number {
  @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold;
  background: rgba(0, 0, 0, 1);
  color: white;
  z-index: 2;
}

.step-title {
  @apply text-xl font-bold text-white mb-4;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 1);
  transition: all 0.3s ease;
}

.step-item--active .step-title {
  @apply text-xl;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 1);
}

.step-description {
  @apply text-lg text-white leading-relaxed;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 1);
  transition: all 0.3s ease;
}

.step-item--active .step-description {
  @apply text-white text-lg;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 1);
}


/* Responsive Design */
@media (max-width: 1024px) {
  .how-it-works-steps {
    @apply gap-16;
  }
  
  .step-item {
    @apply max-w-none;
  }
  
  .step-connector {
    @apply hidden;
  }
}

@media (max-width: 768px) {
  .how-it-works-title {
    @apply text-4xl;
  }
  
  .step-avatar {
    @apply w-16 h-16;
  }
  
  .step-title {
    @apply text-xl;
  }
  
  .step-item--active .step-title {
    @apply text-2xl;
  }
  
  .step-description {
    @apply text-base;
  }
  
  .step-item--active .step-description {
    @apply text-lg;
  }
}

/* Hover effects */
.step-item:hover {
  opacity: 1;
  z-index: 5;
}

.step-item--active:hover {
  z-index: 15;
}
</style>