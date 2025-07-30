import js from '@eslint/js';
import globals from 'globals';
import { flatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import standard from 'eslint-config-standard';

const compat = flatCompat(); // for CommonJS-style configs

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    // Compatibility for legacy configs like 'standard'
    ...compat.config({
      extends: ['standard'],
    }),
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
