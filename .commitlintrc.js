// .commitlintrc.js
const { getCommitlintConfig } = require('@applint/spec');

// getCommitlintConfig(rule: 'common' | 'rax' | 'react' | 'vue', customConfig?: CommitlintUserConfig);
module.exports = getCommitlintConfig('react');
