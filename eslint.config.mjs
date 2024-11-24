import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  {
    ignores: [
      "node_modules/*",
      "**/scripts",
      "**/metro.config.js",
      "*.props.ts",
    ],
  },
  includeIgnoreFile(gitignorePath),
  ...compat.extends(
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:tailwindcss/recommended",
  ),
  {
    plugins: {
      react,
      tailwindcss,
      reactHooks,
      "@typescript-eslint": typescriptEslint,
      "simple-import-sort": simpleImportSort,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        __DEV__: "readonly",
        NodeJS: "readonly",
        JSX: "readonly",
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },

      react: {
        version: "detect",
      },
    },

    rules: {
      ///Typescripts
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-empty-function": ["error"],
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      "@typescript-eslint/no-this-alias": "off",
      "no-bitwise": ["warn", { allow: ["~", ">>", "&"] }],
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",

      /// Import rules
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "import/no-cycle": ["error"],
      "import/named": ["error"],

      /// react eslint
      "react/prop-types": "off",
      "react/jsx-sort-props": [
        "error",
        {
          shorthandFirst: true,
          shorthandLast: false,
          ignoreCase: false,
          locale: "en",
          noSortAlphabetically: false,
          reservedFirst: ["ref", "key"],
          callbacksLast: true,
          multiline: "last",
        },
      ],
      "react/jsx-boolean-value": ["error"],

      "no-undef": "off",
      "no-shadow": "off",
      "consistent-this": "off",
      "no-param-reassign": "error",

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^(@constants)(/.*|$)", "^(@app)(/.*|$)"],
            ["^(@routes)(/.*|$)", "^(@pages)(/.*|$)"],
            ["^(@components)(/.*|$)"],
            ["^(@models)(/.*|$)", "^(@services)(/.*|$)", "^(@utils)(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^(@assets)(/.*|$)"],
          ],
        },
      ],

      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
  },
];
