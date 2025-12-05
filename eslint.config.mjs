import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['lib/', 'node_modules/', '*.config.js', '*.config.mjs', 'babel.config.js', 'index.d.ts', '**/*.spec.ts']
  },
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts', 'index.d.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig
    ],
    languageOptions: {
      parser: tseslint.parser
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['**/*.spec.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jestPlugin.configs['flat/recommended'],
      prettierConfig
    ],
    languageOptions: {
      parser: tseslint.parser
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jest: jestPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  }
);
