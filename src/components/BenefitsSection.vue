<template>
  <section id="benefits" class="benefits-section">
    <div class="benefits-container">
      <div class="benefits-grid">
        <!-- Tactics Column -->
        <div class="benefit-card group" @click="scrollTo('#how-it-works')">
          <div class="benefit-image tactics-bg">
            <div class="benefit-overlay"></div>
            <div class="benefit-content">
              <h2 class="benefit-title">Tactics</h2>
              <p class="benefit-description">Perfect your strokes with AI-powered analysis</p>
            </div>
          </div>
        </div>

        <!-- Mental Column -->
        <div class="benefit-card group" @click="scrollTo('#how-it-works')">
          <div class="benefit-image mental-bg">
            <div class="benefit-overlay"></div>
            <div class="benefit-content">
              <h2 class="benefit-title">Mental</h2>
              <p class="benefit-description">Develop winning game plans and tactics</p>
            </div>
          </div>
        </div>

        <!-- Mentorship Column -->
        <div class="benefit-card group"@click="scrollTo('#how-it-works')">
          <div class="benefit-image mentorship-bg">
            <div class="benefit-overlay"></div>
            <div class="benefit-content">
              <h2 class="benefit-title">Mentorship</h2>
              <p class="benefit-description">Build confidence and competitive mindset</p>
            </div>
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
/* Benefits Section Base */
.benefits-section {
  @apply h-[80vh] bg-white;
}

.benefits-container {
  @apply h-full flex;
}

.benefits-grid {
  @apply grid grid-cols-1 md:grid-cols-3 w-full;
}

/* Benefit Card */
.benefit-card {
  @apply relative cursor-pointer h-full overflow-hidden;
  position: relative;
}

.benefit-card:hover .benefit-image {
  transform: scale(1.05);
}

.benefit-card:hover .benefit-overlay {
  @apply bg-black/50;
}

.benefit-card:hover .benefit-title {
  @apply text-primary-300;
}

.benefit-image {
  @apply relative h-full overflow-hidden bg-cover bg-no-repeat;
  transition: transform 0.5s ease;
}

.benefit-overlay {
  @apply absolute inset-0 bg-black/25;
  transition: background-color 0.3s ease;
}

/* Benefit Content */
.benefit-content {
  @apply absolute inset-0 flex flex-col items-center justify-center text-center p-8;
}

.benefit-title {
  @apply text-7xl font-bold text-black mb-4;
  transition: color 0.3s ease;
}

.benefit-description {
  @apply text-white text-xl leading-relaxed;
}

/* Background Images */
.tactics-bg {
  background-image: url('/src/assets/images/technique.jpg');
}

.mental-bg {
  background-image: url('/src/assets/images/strategy.jpg');
  background-position: center;
}

.mentorship-bg {
  background-image: url('/src/assets/images/mental.png');
  background-position: center;
}
</style>