<template>
  <section id="waitlist" class="waitlist-section">
    <div class="waitlist-background">
      <div class="waitlist-overlay"></div>
    </div>
    
    <div class="waitlist-content">
      <div v-if="submitted" class="waitlist-success">
        <q-card class="success-card">
          <q-card-section class="text-center">
            <div class="success-icon">✅</div>
            <h3 class="success-title">Welcome to FocusedTennis!</h3>
            <p class="success-message">You're on the list! We'll notify you when we launch.</p>
          </q-card-section>
        </q-card>
      </div>

      <div v-else class="waitlist-form-container">
        <div class="waitlist-form-card">
          <div class="form-header">
            <h3 class="form-title">Join the waitlist</h3>
            <p class="form-subtitle">Be first to access FocusedTennis and get exclusive early-bird pricing</p>
          </div>
          
          <form @submit.prevent="submitForm" class="waitlist-form">
            <div class="form-group">
              <q-input
                v-model="form.name"
                label="Full Name"
                required
                outlined
                class="form-input"
                bg-color="white"
                color="primary"
                dense
              />
            </div>

            <div class="form-group">
              <q-input
                v-model="form.email"
                label="Email Address"
                type="email"
                required
                outlined
                class="form-input"
                bg-color="white"
                color="primary"
                dense
              />
            </div>

            <div class="form-group">
              <q-select
                v-model="form.level"
                label="Your Tennis Level"
                :options="tennisLevels"
                required
                outlined
                class="form-select"
                bg-color="white"
                color="primary"
                dense
              />
            </div>

            <div class="form-actions">
              <q-btn 
                type="submit" 
                :loading="submitting"
                :disable="submitting"
                class="submit-button"
                color="primary"
                size="lg"
                rounded
                unelevated
              >
                {{ submitting ? 'Joining...' : 'Join the Waitlist' }}
              </q-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const submitted = ref(false)
const submitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  level: ''
})

const tennisLevels = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Competitive', value: 'competitive' }
]

const submitForm = async () => {
  submitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('Waitlist submission:', form)
  localStorage.setItem('focusedtennis_waitlist', JSON.stringify(form))
  
  submitted.value = true
  submitting.value = false
}
</script>

<style scoped>
/* Waitlist Section Base */
.waitlist-section {
  @apply py-32 bg-cover bg-center bg-no-repeat relative;
  background-image: url('/src/assets/images/waitlistImg.JPG');
  background-position: 0% 3%;
  background-size: 140%;
}

.waitlist-background {
  @apply absolute inset-0;
}

.waitlist-overlay {
  @apply absolute inset-0 bg-black bg-opacity-20;
}

/* Content */
.waitlist-content {
  @apply container-custom relative z-10;
}

.waitlist-header {
  @apply text-center mb-24;
}

.waitlist-title {
  @apply text-7xl font-bold text-black mb-8;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.waitlist-subtitle {
  @apply text-2xl text-white max-w-3xl mx-auto;
  line-height: 1.6;
  font-weight: 400;
}

/* Success State */
.waitlist-success {
  @apply max-w-4xl mx-auto text-center relative z-10;
}

.success-card {
  @apply bg-green-50/95 backdrop-blur-sm border border-green-200/50 rounded-3xl p-16;
  box-shadow: 0 25px 50px -12px rgba(34, 197, 94, 0.25);
}

.success-icon {
  @apply text-9xl mb-8;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.success-title {
  @apply text-4xl font-bold text-gray-900 mb-6;
  letter-spacing: -0.01em;
}

.success-message {
  @apply text-gray-600 text-xl;
  line-height: 1.6;
}

/* Form */
.waitlist-form-container {
  @apply max-w-2xl mx-auto relative z-10;
}

.waitlist-form-card {
  @apply rounded-2xl p-12 shadow-2xl border border-white/30;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.form-header {
  @apply text-center mb-10;
}

.form-title {
  @apply text-5xl font-bold text-black mb-3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.form-subtitle {
  @apply text-lg text-white/90;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.waitlist-form {
  @apply space-y-6;
}

.form-group {
  @apply mb-6;
}

.form-input {
  @apply w-full;
}

.form-input .q-field__control {
  @apply rounded-xl;
  min-height: 3rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.form-input .q-field__control:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-1px);
  box-shadow: 
    0 6px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.form-input .q-field__control--focused {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 6px 25px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 0 2px rgba(255, 255, 255, 0.1);
}

.form-input .q-field__native {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.form-input .q-field__native::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-input .q-field__label {
  @apply text-white/90 font-medium;
  font-size: 0.95rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.form-select {
  @apply w-full;
}

.form-select .q-field__control {
  @apply rounded-xl;
  min-height: 3rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.form-select .q-field__control:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-1px);
  box-shadow: 
    0 6px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.form-select .q-field__control--focused {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 6px 25px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 0 2px rgba(255, 255, 255, 0.1);
}

.form-select .q-field__native {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.form-select .q-field__native::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-select .q-field__label {
  @apply text-white/90 font-medium;
  font-size: 0.95rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.form-actions {
  @apply mt-8;
}

.submit-button {
  @apply w-full;
  min-height: 3.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: none;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 6px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow: 
    0 10px 35px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 0 2px rgba(255, 255, 255, 0.1);
}

.submit-button:active {
  transform: translateY(0);
}
</style>