import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([{
  files: [
    "**/*.{js,mjs,cjs}"
  ],
  plugins: {
    js
  },
  extends: [
    "js/recommended",
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'warn'
  },
  languageOptions: {
    globals: globals.browser
  }
},
]);
