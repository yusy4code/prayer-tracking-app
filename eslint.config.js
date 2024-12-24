import js from "@eslint/js";
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "off"
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  }
];