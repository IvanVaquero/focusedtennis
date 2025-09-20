<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Left Side: Brand Section -->
        <div class="footer-left">
          <div class="brand-section">
            <div class="brand-logo">
              <q-avatar size="2.5rem" color="white" text-color="black" class="brand-avatar">
                <span class="brand-initials">FT</span>
              </q-avatar>
              <span class="brand-name">FocusedTennis</span>
            </div>
            <p class="brand-description">
              Elevate your tennis with professional coaching and AI-powered insights.
            </p>
          </div>
        </div>

        <!-- Right Side: Quick Links & Contact -->
        <div class="footer-right">
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

          <!-- Contact & Social -->
          <div class="contact-section">
            <h3 class="section-title">Contact</h3>
            <div class="contact-info">
              <div class="contact-item">
                <q-icon name="email" class="contact-icon" />
                <a href="mailto:hello@focusedtennis.com" class="contact-link">
                  hello@focusedtennis.com
                </a>
              </div>
              <div class="social-cta">
                <div class="contact-item">
                  <img 
                    src="/src/assets/images/instagram.png" 
                    alt="Instagram" 
                    class="instagram-icon"
                  />
                  <a 
                    href="https://instagram.com/focusedtennis"
                    target="_blank"
                    class="contact-link"
                    aria-label="Follow us on Instagram"
                  >
                    Follow us on Instagram
                  </a>
                </div>
              </div>
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
  @apply container-custom py-8;
}

.footer-content {
  @apply flex flex-col md:flex-row justify-between items-start gap-16 mb-8;
}

/* Footer Layout */
.footer-left {
  @apply flex-1;
}

.footer-right {
  @apply flex gap-16;
}

/* Brand Section */
.brand-section {
  @apply space-y-4;
}

.brand-logo {
  @apply flex items-center gap-3;
}

.brand-avatar {
  @apply shadow-lg;
}

.brand-initials {
  @apply font-bold text-lg;
}

.brand-name {
  @apply text-xl font-bold;
}

.brand-description {
  @apply text-gray-300 leading-relaxed max-w-xs text-sm;
}

/* Links Section */
.links-section {
  @apply space-y-3;
}

.section-title {
  @apply text-lg font-semibold mb-3;
}

.links-list {
  @apply flex flex-col gap-1;
}

.footer-link {
  @apply justify-start text-gray-300 hover:text-white transition-colors duration-300 text-sm;
  text-transform: none;
  padding-left: 0;
}

/* Contact Section */
.contact-section {
  @apply space-y-3;
}

.contact-info {
  @apply space-y-4;
}

.contact-item {
  @apply flex items-center gap-3;
}

.contact-icon {
  @apply text-white text-lg;
}

.contact-link {
  @apply text-gray-300 hover:text-white transition-colors duration-300 text-sm;
}

/* Social CTA */
.social-cta {
  @apply mt-4;
}

.social-item {
  @apply flex items-center gap-3;
}

.social-btn {
  @apply transition-all duration-300;
}

.social-btn:hover {
  @apply scale-110;
}

.instagram-icon {
  @apply w-5 h-5 object-contain;
  transition: all 0.3s ease;
}

.social-text {
  @apply text-gray-300 text-sm;
}

/* Footer Bottom */
.footer-separator {
  @apply border-gray-700;
}

.footer-bottom {
  @apply flex flex-col items-start justify-start gap-2 pt-6 text-left;
}

.copyright {
  @apply text-gray-400 text-xs;
}

.tagline {
  @apply text-gray-400 text-xs;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    @apply flex-col gap-12;
  }
  
  .footer-right {
    @apply flex-col gap-8;
  }
  
  .brand-logo {
    @apply gap-3;
  }
  
  .brand-name {
    @apply text-lg;
  }
  
  .social-item {
    @apply justify-start;
  }
}
</style>