import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/coverage/**",
      "**/node_modules/**",
      "**/.angular/**",
      "**/test-results/**",
      "**/playwright-report/**",
      ".husky/**",
      "commitlint.config.js",
    ],
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Angular conventions
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["app", "lmn"],
          style: "kebab-case",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "lmn",
          style: "camelCase",
        },
      ],
      "@angular-eslint/prefer-standalone": "error",

      // TypeScript quality
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Console only allowed in app, not library
      "no-console": [
        "error",
        { allow: ["warn", "error"] },
      ],

      // General best practices
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
  },
  {
    // Allow console in demo app and e2e tests
    files: ["src/**/*.ts", "tests/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
);
