module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/eslint-recommended'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-empty': 'warn',
    'no-unreachable': 'warn',
    'use-isnan': 'warn',
    eqeqeq: 'warn',
    'no-alert': 'warn',
    'no-else-return': 'warn',
    'no-multi-spaces': 'warn',
    'no-self-compare': 'warn',
    'no-useless-return': 'warn',
    'no-undef-init': 'warn',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'warn',
    'no-plusplus': 'warn',
    'no-trailing-spaces': 'warn',
    'semi-spacing': 'warn',
    'linebreak-style': 'off',
    'no-continue': 'off',
    'no-console': 'off',
    'comma-dangle': 'off',
    'no-useless-constructor': 'off',
    'max-classes-per-file': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'max-len': 'off',
    'no-new': 'off',
    'new-cap': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'no-shadow': 'off',
    'consistent-return': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    indent: 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'no-return-await': 'off',
    'no-useless-escape': 'off',
    'no-new-func': 'off',
    'no-restricted-syntax': 'off',
    'no-extra-boolean-cast': 'off',
    'import/no-duplicates': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
