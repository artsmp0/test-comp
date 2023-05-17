module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': [
      '^.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
      {
        message: '请使用BEM命名规范',
      },
    ],
    'no-invalid-double-slash-comments': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['plugin'],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': null,
  },
};
