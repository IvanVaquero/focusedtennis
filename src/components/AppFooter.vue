<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="brand-section">
          <div class="brand-logo">
            <q-avatar size="3rem" color="white" text-color="black" class="brand-avatar">
              <span class="brand-initials">FT</span>
            </q-avatar>
            <span class="brand-name">FocusedTennis</span>
          </div>
          <p class="brand-description">
            Elevate your tennis with professional coaching and AI-powered insights.
          </p>
          <div class="social-section">
            <q-btn 
              round 
              flat 
              icon="mdi-instagram" 
              size="md"
              color="grey-5"
              class="social-btn"
              href="https://instagram.com/focusedtennis"
              target="_blank"
              aria-label="Follow us on Instagram"
            />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="links-section">
          <h3 class="section-title">Quick Links</h3>
          <div class="links-list">
            <q-btn 
              v-for="link in quickLinks" 
              :key="link.label"
              flat 
              no-caps
              :href="link.href"
              class="footer-link"
            >
              {{ link.label }}
            </q-btn>
          </div>
        </div>

        <!-- Contact -->
        <div class="contact-section">
          <h3 class="section-title">Contact</h3>
          <div class="contact-info">
            <div class="contact-item">
              <q-icon name="email" class="contact-icon" />
              <a href="mailto:hello@focusedtennis.com" class="contact-link">
                hello@focusedtennis.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <q-separator class="footer-separator" />
      <div class="footer-bottom">
        <span class="copyright">
          © {{ currentYear }} FocusedTennis. All rights reserved.
        </span>
        <span class="tagline">Made with ❤️ for tennis players</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const quickLinks = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Waitlist', href: '#waitlist' }
]
</script>

<style scoped>
/* Footer Base */
.app-footer {
  @apply bg-black text-white;
}

.footer-container {
  @apply container-custom py-16;
}

.footer-content {
  @apply grid grid-cols-1 md:grid-cols-3 gap-12 mb-12;
}

/* Brand Section */
.brand-section {
  @apply space-y-6;
}

.brand-logo {
  @apply flex items-center gap-4;
}

.brand-avatar {
  @apply shadow-lg;
}

.brand-initials {
  @apply font-bold text-xl;
}

.brand-name {
  @apply text-2xl font-bold;
}

.brand-description {
  @apply text-gray-300 leading-relaxed max-w-sm;
}

.social-section {
  @apply flex gap-3;
}

.social-btn {
  @apply transition-all duration-300;
}

.social-btn:hover {
  @apply scale-110;
  color: #E1306C !important;
}

/* Links Section */
.links-section {
  @apply space-y-4;
}

.section-title {
  @apply text-xl font-semibold mb-4;
}

.links-list {
  @apply flex flex-col gap-1;
}

.footer-link {
  @apply justify-start text-gray-300 hover:text-white transition-colors duration-300;
  text-transform: none;
  padding-left: 0;
}

/* Contact Section */
.contact-section {
  @apply space-y-4;
}

.contact-info {
  @apply space-y-3;
}

.contact-item {
  @apply flex items-center gap-3;
}

.contact-icon {
  @apply text-blue-500 text-xl;
}

.contact-link {
  @apply text-gray-300 hover:text-white transition-colors duration-300;
}

/* Footer Bottom */
.footer-separator {
  @apply border-gray-700;
}

.footer-bottom {
  @apply flex flex-col md:flex-row justify-between items-center gap-4 pt-8;
}

.copyright {
  @apply text-gray-400 text-sm;
}

.tagline {
  @apply text-gray-400 text-sm;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    @apply grid-cols-1 gap-8;
  }
  
  .brand-logo {
    @apply gap-3;
  }
  
  .brand-name {
    @apply text-xl;
  }
  
  .footer-bottom {
    @apply text-center;
  }
}
</style>