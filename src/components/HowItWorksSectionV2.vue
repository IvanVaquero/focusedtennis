<template>
  <section id="how-it-works-v2" class="how-it-works-v2">
    <div class="how-it-works-v2-background"></div>
    <div class="how-it-works-v2-overlay"></div>
    
    <div class="how-it-works-v2-content">
      <div class="how-it-works-v2-header">
        <h2 class="how-it-works-v2-title">How It Works</h2>
        <p class="how-it-works-v2-subtitle">Get started in three simple steps</p>
      </div>

      <div class="how-it-works-v2-steps">
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          class="step-item"
          :class="{ 'step-item--active': index === activeStep }"
          @mouseenter="activeStep = index"
          @mouseleave="activeStep = -1"
        >
          <div class="step-connector" v-if="index < steps.length - 1"></div>
          
          <div class="step-content">
            <div class="step-icon">
              <q-avatar 
                :size="stepIconSize" 
                :color="step.iconColor" 
                text-color="white"
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
    icon: 'person_add',
    title: 'Create Your Profile',
    description: 'Sign up and tell us about your tennis experience, goals, and playing style.',
    iconColor: 'primary'
  },
  {
    icon: 'search',
    title: 'Find Your Coach',
    description: 'Browse through our network of certified professionals and find your perfect match.',
    iconColor: 'secondary'
  },
  {
    icon: 'schedule',
    title: 'Book & Play',
    description: 'Schedule your sessions and start improving your game with personalized coaching.',
    iconColor: 'positive'
  }
]

const stepIconSize = computed(() => {
  return '4rem'
})
</script>

<style scoped>
/* Section */
.how-it-works-v2 {
  @apply py-24 relative overflow-hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.how-it-works-v2-background {
  @apply absolute inset-0 bg-cover bg-center bg-no-repeat;
  background-image: url('/src/assets/images/steps.JPG');
  background-position: center center;
  background-size: cover;
}

.how-it-works-v2-overlay {
  @apply absolute inset-0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.how-it-works-v2-content {
  @apply container-custom relative z-10;
}

/* Header */
.how-it-works-v2-header {
  @apply text-center mb-20;
}

.how-it-works-v2-title {
  @apply text-6xl font-bold text-white mb-6;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.how-it-works-v2-subtitle {
  @apply text-2xl text-white/90 max-w-2xl mx-auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.6;
  font-weight: 400;
}

/* Steps */
.how-it-works-v2-steps {
  @apply flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12;
  position: relative;
}

.step-item {
  @apply flex flex-col items-center relative;
  flex: 1;
  max-width: 350px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0.95);
  opacity: 0.7;
  transform-origin: center center;
}

.step-item--active {
  transform: scale(1.05);
  opacity: 1;
  z-index: 10;
}

.step-connector {
  @apply hidden lg:block absolute top-1/2 left-full w-12 h-0.5;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%);
  transform: translateY(-50%);
  z-index: 1;
}

.step-connector::after {
  content: '';
  @apply absolute right-0 top-1/2 w-3 h-3 rounded-full;
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-50%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.step-content {
  @apply text-center relative z-10;
}

.step-icon {
  @apply mb-6 relative;
}

.step-avatar {
  @apply shadow-2xl;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 4px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.step-info {
  @apply relative;
}

.step-number {
  @apply absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.step-title {
  @apply text-2xl font-bold text-white mb-4;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.step-item--active .step-title {
  @apply text-3xl;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.step-description {
  @apply text-lg text-white/80 leading-relaxed;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.step-item--active .step-description {
  @apply text-white text-xl;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .how-it-works-v2-steps {
    @apply gap-16;
  }
  
  .step-item {
    @apply max-w-none;
  }
  
  .step-connector {
    @apply hidden;
  }
  
  .step-item--active {
    transform: scale(1.02);
  }
}

@media (max-width: 768px) {
  .how-it-works-v2-title {
    @apply text-4xl;
  }
  
  .how-it-works-v2-subtitle {
    @apply text-xl;
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
  transform: scale(1.02);
  opacity: 0.9;
  z-index: 5;
}

.step-item--active:hover {
  transform: scale(1.08);
  z-index: 15;
}
</style>
