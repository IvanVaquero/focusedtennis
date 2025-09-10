<template>
  <section id="faq" class="py-32 bg-white border-t-4 border-black">
    <div class="container-custom">
      <div class="text-center mb-20">
        <h2 class="text-5xl font-bold text-gray-900 mb-8">
          Common questions
        </h2>
      </div>

      <div class="max-w-4xl mx-auto space-y-6">
        <div v-for="(faq, index) in faqs" :key="faq.id" class="bg-gray-50 rounded-2xl overflow-hidden">
          <button 
            @click="toggleFAQ(index)" 
            class="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
          >
            <span class="font-semibold text-gray-900 text-lg">{{ faq.question }}</span>
            <span class="text-3xl text-gray-500">{{ openFAQ === index ? '−' : '+' }}</span>
          </button>
          <div v-show="openFAQ === index" class="px-8 pb-6">
            <p class="text-gray-700 leading-relaxed text-lg">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openFAQ = ref<number | null>(null)

const toggleFAQ = (index: number) => {
  openFAQ.value = openFAQ.value === index ? null : index
}

const faqs = [
  {
    id: 1,
    question: 'How long are coaching sessions?',
    answer: 'Sessions last 60-90 minutes, depending on your needs and availability.'
  },
  {
    id: 2,
    question: 'Is my data secure?',
    answer: 'Yes, we use end-to-end encryption and comply with GDPR regulations.'
  },
  {
    id: 3,
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. Cancel your subscription anytime without penalties.'
  },
  {
    id: 4,
    question: 'What devices are supported?',
    answer: 'FocusedTennis works on all modern devices - phone, tablet, and computer.'
  }
]
</script>