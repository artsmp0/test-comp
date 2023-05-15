module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'wip', 'fix', 'refactor', 'docs', 'test', 'style', 'perf', 'ci', 'revert', 'chore', 'publish']],
    'type-empty': [1, 'never'],
    'scope-empty': [1, 'never'],
    'subject-empty': [1, 'never'],
    'subject-case': [0],
    'scope-case': [0],
  },
};
