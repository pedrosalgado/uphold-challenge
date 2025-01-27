module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals', // Next.js-specific linting rules
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js
    'no-unused-vars': 'warn',
    semi: ['error', 'always'],
  },
};
