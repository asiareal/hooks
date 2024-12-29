const { getESLintConfig } = require('@applint/spec');

module.exports = getESLintConfig('react-ts', {
  rules: {
    'id-length': 'off',
    '@typescript-eslint/keyword-spacing': 'off',
  },
});
