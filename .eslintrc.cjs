/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/html-indent': ['warn', 'tab'],
    'vue/no-reserved-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
  },
}
