import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Disable ESLint rules that conflict with Prettier
  prettierConfig,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Prettier errors show as ESLint errors
      'prettier/prettier': 'error',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      'react/react-in-jsx-scope': 'off',
    },
  },
);
