module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  'globals': {
    'BJY': 'readonly',
    'Yox': 'readonly'
  },
/*   extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ], */
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
