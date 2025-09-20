<template>
  <section id="waitlist" class="waitlist-section">
    <div class="waitlist-background">
      <div class="waitlist-overlay"></div>
    </div>
    
    <div class="waitlist-content">
      <!-- Success Screen -->
      <div v-if="formCompleted" class="waitlist-success">
        <q-card class="success-card">
          <q-card-section class="text-center">
            <div class="success-icon">✅</div>
            <h3 class="success-title">Welcome to FocusedTennis!</h3>
            <p class="success-message">You're on the list! We'll notify you when we launch.</p>
            <div class="success-actions">
              <q-btn
                label="Start Over"
                color="primary"
                size="md"
                rounded
                class="reset-btn"
                @click="resetForm"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div v-else class="waitlist-form-container">
        <div class="waitlist-form-card">
          <div class="form-header">
            <h3 class="form-title">Join the waitlist</h3>
            
            <!-- Progress Stepper -->
            <div v-if="showStepper" class="stepper-container">
              <div class="stepper-progress">
                <div 
                  v-for="(question, index) in additionalQuestions" 
                  :key="`question-${index}`"
                  class="step-indicator"
                  :class="{ 
                    'step-active': currentQuestion === index, 
                    'step-completed': currentQuestion > index 
                  }"
                >
                  <div class="step-circle">
                    <q-icon 
                      v-if="currentQuestion > index" 
                      name="check" 
                      size="xs" 
                    />
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <div class="step-label">{{ question.title }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Basic Information Form -->
          <div v-if="!showStepper">
            <form @submit.prevent="onSubmitBasicInfo" class="waitlist-form">
              <div class="form-group">
                <q-input
                  v-model="form.name"
                  label="Full Name"
                  required
                  outlined
                  class="form-input"
                  :rules="[val => !!val || 'Name is required']"
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
                  :rules="[val => !!val || 'Email is required', val => isValidEmail(val) || 'Invalid email format']"
                />
              </div>

              <div class="form-group">
                <div class="checkbox-container">
                  <q-checkbox
                    v-model="form.acceptTerms"
                    color="primary"
                    class="accept-checkbox"
                  />
                  <label class="checkbox-label" @click="form.acceptTerms = !form.acceptTerms">
                    I agree to receive updates about <span class="brand-highlight">FocusedTennis</span> and accept the terms of service
                  </label>
                </div>
              </div>

              <div class="form-actions">
                <q-btn 
                  type="submit" 
                  :loading="submitting"
                  :disable="!form.name || !form.email || !form.acceptTerms"
                  class="submit-button"
                  color="primary"
                  size="lg"
                  rounded
                  unelevated
                >
                  Continue
                </q-btn>
              </div>
            </form>
          </div>

          <!-- Additional Questions -->
          <div v-if="showStepper && currentQuestionData" class="stepper-section">
            <form @submit.prevent="onNextQuestion" class="waitlist-form">
              <div class="form-group">
                <!-- Practice Frequency -->
                <q-select
                  v-if="currentQuestionData.key === 'practiceFrequency'"
                  v-model="form.practiceFrequency"
                  :options="practiceOptions"
                  option-value="value"
                  option-label="label"
                  emit-value
                  map-options
                  label="How often do you practice tennis?"
                  outlined
                  class="form-select"
                />
                
                <!-- Match Frequency -->
                <q-select
                  v-else-if="currentQuestionData.key === 'matchFrequency'"
                  v-model="form.matchFrequency"
                  :options="matchOptions"
                  option-value="value"
                  option-label="label"
                  emit-value
                  map-options
                  label="How often do you play matches?"
                  outlined
                  class="form-select"
                />
                
                <!-- Struggles -->
                <q-input
                  v-else-if="currentQuestionData.key === 'struggles'"
                  v-model="form.struggles"
                  label="What do you struggle with the most?"
                  type="textarea"
                  rows="3"
                  outlined
                  class="form-input"
                  placeholder="Ex. Mental, tactical, match play, etc"
                />
                
                <!-- Expectations -->
                <q-input
                  v-else-if="currentQuestionData.key === 'expectations'"
                  v-model="form.expectations"
                  label="What do you expect to get from the platform?"
                  type="textarea"
                  rows="3"
                  outlined
                  class="form-input"
                  placeholder="Ex. Weekly coaching calls, match analysis with coaches, etc"
                />
              </div>

              <div class="form-actions">
                <q-btn
                  label="Back"
                  color="grey"
                  size="md"
                  rounded
                  outline
                  class="back-btn"
                  :disable="currentQuestion === 0"
                  @click="onPreviousQuestion"
                />
                <div class="form-spacer"></div>
                <q-btn
                  :label="currentQuestion === totalQuestions - 1 ? 'Join Waitlist' : 'Next'"
                  type="submit"
                  color="primary"
                  size="md"
                  rounded
                  class="next-btn"
                  :loading="submitting"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { checkEmail, joinWaitlist } from '../config/api'

const submitting = ref(false)
const showStepper = ref(false)
const currentQuestion = ref(0)
const formCompleted = ref(false)

const form = reactive({
  // Basic info
  name: '',
  email: '',
  acceptTerms: false,
  // Additional questions
  practiceFrequency: '',
  matchFrequency: '',
  struggles: '',
  expectations: ''
})

const additionalQuestions = [
  {
    key: 'practiceFrequency',
    title: 'Practice'
  },
  {
    key: 'matchFrequency', 
    title: 'Matches'
  },
  {
    key: 'struggles',
    title: 'Struggles'
  },
  {
    key: 'expectations',
    title: 'Goals'
  }
]

const practiceOptions = [
  { label: '1-2 times per week', value: '1-2' },
  { label: '3-4 times per week', value: '3-4' },
  { label: '5+ times per week', value: '5+' }
]

const matchOptions = [
  { label: '1-2 times per week', value: '1-2' },
  { label: '3-4 times per week', value: '3-4' },
  { label: '5+ times per week', value: '5+' }
]

const currentQuestionData = computed(() => {
  return additionalQuestions[currentQuestion.value] || null
})

const totalQuestions = computed(() => {
  return additionalQuestions.length
})

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const onSubmitBasicInfo = async () => {
  if (!form.name || !form.email || !form.acceptTerms) return
  
  submitting.value = true
  
  try {
    // Check if email already exists
    const emailCheck = await checkEmail(form.email)
    
    if (emailCheck.exists) {
      alert('This email is already on the waitlist!')
      submitting.value = false
      return
    }
    
    // Proceed to stepper questions
    showStepper.value = true
    currentQuestion.value = 0
  } catch (error) {
    console.error('Error checking email:', error)
    alert('There was an error. Please try again.')
  } finally {
    submitting.value = false
  }
}

const onNextQuestion = async () => {
  if (currentQuestion.value < totalQuestions.value - 1) {
    currentQuestion.value++
  } else {
    await onSubmitComplete()
  }
}

const onPreviousQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
  }
}

const onSubmitComplete = async () => {
  submitting.value = true
  
  try {
    // Submit complete form data to PHP API
    const response = await joinWaitlist({
      email: form.email,
      name: form.name,
      acceptTerms: form.acceptTerms,
      practiceFrequency: form.practiceFrequency,
      matchFrequency: form.matchFrequency,
      struggles: form.struggles,
      expectations: form.expectations
    })
    
    console.log('Waitlist submission successful:', response)
    
    // Show success screen
    formCompleted.value = true
    showStepper.value = false
    
    // Optional: Keep a local backup
    localStorage.setItem('focusedtennis_waitlist', JSON.stringify({
      ...form,
      submittedAt: new Date().toISOString(),
      id: response.id
    }))
    
  } catch (error) {
    console.error('Error submitting to waitlist:', error)
    alert('There was an error submitting your information. Please try again.')
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  formCompleted.value = false
  showStepper.value = false
  currentQuestion.value = 0
  
  // Reset form data
  form.name = ''
  form.email = ''
  form.acceptTerms = false
  form.practiceFrequency = ''
  form.matchFrequency = ''
  form.struggles = ''
  form.expectations = ''
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
  @apply backdrop-blur-sm border rounded-3xl p-16;
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
  @apply rounded-2xl p-12 shadow-2xl border border-white/20;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

.form-header {
  @apply text-center mb-10;
}

.form-title {
  @apply text-5xl font-bold text-gray-800 mb-3;
}

.form-subtitle {
  @apply text-lg text-gray-600;
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
  @apply rounded-xl bg-white;
  min-height: 3rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgb(0, 0, 0);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.form-input .q-field__control:hover {
  color: black;
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
  box-shadow: 
    0 8px 25px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.form-input .q-field__control--focused {
  color: black;
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 
    0 8px 25px rgba(59, 130, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input .q-field__native {
  @apply text-black;
  font-weight: 500;
}

.form-input .q-field__native::placeholder {
  @apply text-black;
}

.form-input .q-field__label {
  @apply text-black font-medium;
  font-size: 0.95rem;
}

.form-select {
  @apply w-full;
}

.form-select .q-field__control {
  @apply rounded-xl bg-white;
  min-height: 3rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgb(0, 0, 0);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.form-select .q-field__control:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
  box-shadow: 
    0 8px 25px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.form-select .q-field__control--focused {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 
    0 8px 25px rgba(59, 130, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-select .q-field__native {
  @apply text-gray-800;
  font-weight: 500;
}

.form-select .q-field__native::placeholder {
  @apply text-gray-400;
}

.form-select .q-field__label {
  @apply text-gray-600 font-medium;
  font-size: 0.95rem;
}

.form-actions {
  @apply mt-8 flex justify-between items-center;
}

.form-spacer {
  @apply flex-1;
}

.submit-button {
  @apply w-full text-white;
  min-height: 3.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: none;
  border-radius: 0.75rem;
  background: rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.4);
  box-shadow: 
    0 8px 32px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.submit-button:hover {
  background: rgba(59, 130, 246, 0.4);
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.submit-button:active {
  transform: translateY(0);
}

/* Stepper Styles */
.stepper-container {
  @apply mt-8;
}

.stepper-progress {
  @apply flex justify-center items-center gap-4 flex-wrap;
}

.step-indicator {
  @apply flex flex-col items-center gap-2;
  min-width: 60px;
}

.step-circle {
  @apply w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gray-200 text-gray-500;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.step-indicator.step-active .step-circle {
  @apply bg-blue-300 text-white;
  border-color: #93c5fd;
}

.step-indicator.step-completed .step-circle {
  @apply bg-green-500 text-white;
  border-color: #10b981;
}

.step-label {
  @apply text-xs font-medium text-gray-600 text-center;
  max-width: 60px;
  line-height: 1.2;
}

.step-indicator.step-active .step-label {
  @apply text-blue-600 font-semibold;
}

.step-indicator.step-completed .step-label {
  @apply text-green-600 font-semibold;
}

/* Question Section */
.stepper-section {
  @apply border-t border-white/20;
}

.question-header {
  @apply text-center mb-6;
}

.question-title {
  @apply text-2xl font-semibold text-gray-800 mb-2;
}

/* Checkbox Styling */
.checkbox-container {
  @apply flex items-start gap-3 mt-2;
}

.accept-checkbox {
  @apply mt-1 flex-shrink-0;
}

.checkbox-label {
  @apply text-sm text-gray-700 cursor-pointer flex-1;
  line-height: 1.4;
}

.brand-highlight {
  @apply text-black font-semibold;
}

/* Form Actions */
.back-btn {
  @apply text-white px-6;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.next-btn {
  @apply text-white px-8;
  background: rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.4);
  box-shadow: 
    0 8px 32px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 
    0 6px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.next-btn:hover {
  background: rgba(59, 130, 246, 0.4);
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-1px);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Success Actions */
.success-actions {
  @apply mt-6;
}

.reset-btn {
  @apply px-8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stepper-progress {
    @apply gap-2;
  }
  
  .step-circle {
    @apply w-7 h-7 text-xs;
  }
  
  .step-label {
    @apply text-xs;
    max-width: 50px;
  }
  
  .form-actions {
    @apply flex-col gap-4;
  }
  
  .form-spacer {
    @apply hidden;
  }
  
  .back-btn,
  .next-btn {
    @apply w-full;
  }
}
</style>