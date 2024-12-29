const { getESLintConfig } = require('@applint/spec');

module.exports = getESLintConfig('react-ts', {
  extends: ['prettier'],
  rules: {
    'id-length': 'off',
    '@typescript-eslint/keyword-spacing': 'off',
  },
});
