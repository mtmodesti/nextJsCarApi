module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true, // Usando as funcionalidades do ECMAScript 2021
  },
  extends: [
    "eslint:recommended", // Regras recomendadas do ESLint
    "plugin:react/recommended", // Regras recomendadas para React
    "plugin:react-hooks/recommended", // Regras recomendadas para React Hooks
    "prettier", // Desabilita as regras do ESLint que podem conflitar com o Prettier
  ],
  parser: "@babel/eslint-parser", // Usando o parser do Babel para analisar o código
  parserOptions: {
    ecmaVersion: "latest", // Suporte para as versões mais recentes do ECMAScript
    sourceType: "module", // Suporte para módulos ES6
    ecmaFeatures: {
      jsx: true, // Suporte para JSX (React)
    },
  },
  plugins: [
    "react", // Plugin para regras específicas do React
    "react-hooks", // Plugin para regras de React Hooks
    "prettier", // Integra o Prettier ao ESLint
  ],
  rules: {
    "prettier/prettier": ["error"], // Enforce Prettier formatting as error
    "react/prop-types": "off", // Desativa a necessidade de definir prop-types (opcional)
    "react/react-in-jsx-scope": "off", // Desativa a necessidade do React estar no escopo (com React 17+ não é mais necessário)
  },
  settings: {
    react: {
      version: "detect", // Detecta a versão do React automaticamente
    },
  },
};
