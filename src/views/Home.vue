<template>
  <div>
    <AppHeader />
    <main>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <WaitlistSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import HeroSection from '../components/HeroSection.vue'
import BenefitsSection from '../components/BenefitsSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import WaitlistSection from '../components/WaitlistSection.vue'
</script>
