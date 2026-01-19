// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-plugin-prettier");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    plugins: {
      prettier,
      "simple-import-sort": simpleImportSort,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      // Angular naming conventions
      "@angular-eslint/component-class-suffix": [
        "error",
        { suffixes: ["Component"] } 
      ],
      "@angular-eslint/directive-class-suffix": [
        "error",
        { suffixes: ["Directive"] }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      // Code quality
      // Imports
      "no-duplicate-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // Console
       "no-console": [
        "warn",
        { allow: ["warn", "error"] }
      ],
      // General
      "no-var": "error",
      "eqeqeq": ["warn", "smart"],
      // Disallow empty functions except constructors (needed for Angular DI)
      // This helps catch incomplete implementations and dead code
      "no-empty-function": [
        "error",
        {
          allow: ["constructors"]
        } 
      ],
      "no-unreachable": "error",
      "no-duplicate-case": "warn",
      "no-fallthrough": "error",
      "no-eval": "error",
      // Prettier
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  }
]);
