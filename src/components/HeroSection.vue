<template>
  <section id="home" class="hero">
    <!-- Background Image -->
    <div class="hero-background">
      <div class="hero-overlay"></div>
    </div>

    <!-- Content -->
    <div class="hero-content">
      <div class="hero-container">
        <div class="hero-text-section">
          <!-- Main Heading -->
          <div class="hero-heading">
            <h1 class="hero-title">
              Elevate your 
              <span class="hero-title-accent">tennis</span> 
              with Top Coaches
            </h1>
            <p class="hero-subtitle">
              Learn Elite Pro Insights from top coaches and apply world-class strategies to your game
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="hero-actions">
            <button class="btn-primary-hero" @click="scrollTo('#waitlist')">
              Join waitlist
            </button>
            <button class="btn-secondary-hero" @click="scrollTo('#how-it-works')">
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

<style scoped>
/* Hero Section Base */
.hero {
  @apply min-h-screen flex items-center relative pt-20;
}

/* Background */
.hero-background {
  @apply absolute inset-0 bg-cover;
  background-image: url('/src/assets/images/heroImage2.JPG');
  background-position: 70% center;
}

.hero-overlay {
  @apply absolute inset-0 bg-black/25;
}

/* Content */
.hero-content {
  @apply container-custom relative z-10;
}

.hero-container {
  @apply max-w-7xl;
}

.hero-text-section {
  @apply space-y-10;
}

/* Heading */
.hero-heading {
  @apply space-y-6;
}

.hero-title {
  @apply text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight;
}

.hero-title-accent {
  @apply font-extrabold;
  color: black;
}

.hero-subtitle {
  @apply text-2xl text-white leading-relaxed max-w-5xl;
}

/* Actions */
.hero-actions {
  @apply flex flex-col sm:flex-row gap-6;
}

/* Buttons */
.btn-primary-hero {
  @apply font-bold text-xl px-12 py-5 rounded-xl transition-colors duration-200;
  background-color: black;
  color: #ffffff;
}

.btn-primary-hero:hover {
  background-color: #2563eb;
}

.btn-secondary-hero {
  @apply border-2 font-semibold text-xl px-12 py-5 rounded-xl transition-all duration-200;
  border-color: #ffffff;
  color: #ffffff;
  background-color: transparent;
}

.btn-secondary-hero:hover {
  background-color: #ffffff;
  color: #000000;
}
</style>