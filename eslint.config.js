import { defineConfig } from "eslint-define-config";
import eslintPluginReact from "eslint-plugin-react"; // Importando diretamente o plugin react
import eslintPluginReactHooks from "eslint-plugin-react-hooks"; // Importando diretamente o plugin react-hooks
import eslintPluginPrettier from "eslint-plugin-prettier"; // Importando diretamente o plugin prettier

export default defineConfig([
  {
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error"],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["*.jsx", "*.tsx"], // Adicionando regras específicas para esses arquivos
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
