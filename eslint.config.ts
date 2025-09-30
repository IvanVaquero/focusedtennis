import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  
  // Configure Vue-specific rules
  {
    name: 'vue-rules',
    files: ['**/*.vue'],
    rules: {
      // Allow any CSS in style blocks
      'vue/no-unused-vars': 'off',
      'vue/valid-template-root': 'off',
      // Disable CSS-related warnings
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
)
