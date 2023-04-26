import { FlatCompat } from '@eslint/eslintrc';
import flowPlugin from 'eslint-plugin-flowtype';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  ...compat.config({
    ...flowPlugin.configs.recommended,
    parser: '@babel/eslint-parser',
  }),
  ...compat.extends('airbnb', 'plugin:storybook/recommended'),
  ...compat.plugins('flowtype', 'jest'),
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          legacyDecorators: true,
        },
        babelOptions: {
          configFile: './babel.config.common.cjs',
        },
      },
      globals: {
        ...globals.jest,
        ...globals.browser,
      },
    },
    rules: {
      'import/no-extraneous-dependencies': 0,
      'import/no-webpack-loader-syntax': 0,
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'no-confusing-arrow': ['error', { allowParens: true }],
      'arrow-parens': ['error', 'as-needed'],
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': 0,
      'react/prefer-exact-props': 0,
      'react/static-property-placement': ['warn', 'static public field'],
      'react/no-multi-comp': 0,
      'react/function-component-definition': 0,
      'no-restricted-exports': 0,
      'import/prefer-default-export': 0,
      'object-curly-newline': ['error', { consistent: true }],
      'no-bitwise': ['error', { int32Hint: true }],
      'no-mixed-operators': 0,
    },
    settings: {
      'import/parsers': {
        '@babel/eslint-parser': ['.js', '.cjs', '.mjs'],
      },
      'import/resolver': {
        node: {
          moduleDirectory: ['./'],
        },
        webpack: {
          config: './.storybook/webpack.config.cjs',
        },
        alias: [
          ['@psychobolt/react-rollup-boilerplate', './src/index.js'],
          ['@psychobolt/default-export', './packages/default-export/src/index.js'],
        ],
      },
    },
  },
  {
    ignores: [
      '.yarn/',
      'coverage/',
      'flow-deps-modules/',
      'packages/react-cache/',
      '**/dist/',
      'shared/flow-typed/npm/',
      'storybook-static/',
      '.pnp.cjs',
      '.pnp.loader.mjs',
    ],
  },
];
