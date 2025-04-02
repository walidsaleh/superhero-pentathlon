import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginImport from 'eslint-plugin-import'
import pluginPlaywright from 'eslint-plugin-playwright'
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

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    plugins: {
      import: pluginImport
    },
    rules: {
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'type',
          'index'
        ],
        'pathGroups': [
          {
            'pattern': 'vue',
            'group': 'external',
            'position': 'before'
          },
          {
            'pattern': '@/stores/**',
            'group': 'internal',
            'position': 'before'
          },
          {
            'pattern': '@/types/**',
            'group': 'type'
          },
          {
            'pattern': '@/components/**',
            'group': 'internal',
            'position': 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['vue'],
        'newlines-between': 'never',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        },
        'warnOnUnassignedImports': true
      }]
    }
  },
  
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  skipFormatting,
)
