<template>
  <div id="app">
    <AppHeader />
    <main>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <CoachesSection />
      <!-- <AISection /> -->
      <!-- <TestimonialsSection /> -->
      <!-- <FAQSection /> -->
      <WaitlistSection />
      <!-- <FinalCTASection /> -->
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import HeroSection from './components/HeroSection.vue'
import BenefitsSection from './components/BenefitsSection.vue'
import HowItWorksSection from './components/HowItWorksSection.vue'
import CoachesSection from './components/CoachesSection.vue'
// import AISection from './components/AISection.vue'
// import TestimonialsSection from './components/TestimonialsSection.vue'
// import FAQSection from './components/FAQSection.vue'
import WaitlistSection from './components/WaitlistSection.vue'
import FinalCTASection from './components/FinalCTASection.vue'
</script>