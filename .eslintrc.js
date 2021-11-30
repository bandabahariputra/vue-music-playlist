module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'arrow-parens': [2, 'always'],
    'vue/multi-word-component-names': 'off',
  },
};
