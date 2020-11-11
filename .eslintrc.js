module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier', 'jest'],
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}
