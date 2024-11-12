import eslintJs from "@eslint/js";

import parser from "@typescript-eslint/parser";

import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  eslintJs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
    languageOptions: {
        parser,
        parserOptions: {
            sourceType: "module"
        }
    }
  },
  {
    ignores: [
      "dist",
      "node_modules",
      "docs",
      "rollup.config.mjs",
      "eslint.config.mjs",
    ],
  },
  {
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "varsIgnorePattern": "^_",
          "argsIgnorePattern": "^_"
        }
      ],
      "@typescript-eslint/no-use-before-define": "off",
      "no-dupe-class-members": "off",
      "@typescript-eslint/no-dupe-class-members": "error",
      "no-unused-vars": "off",
      "curly": ["error", "multi-line"],
      "no-continue": "off",
      "no-plusplus": "off",
      "no-param-reassign": "off",
      "object-curly-newline": "off",
      "no-underscore-dangle": "off",
      "quotes": [
        "error",
        "single"
      ],
      "import/prefer-default-export": "off",
      "max-len": [
        "error",
        {
          "code": 150
        }
      ],
      "comma-dangle": [
        "error",
        "always-multiline"
      ],
      "eqeqeq": [
        "error",
        "always",
        {
          "null": "ignore"
        }
      ],
      "no-magic-numbers": "off",
      "newline-per-chained-call": [
        "off",
        {
          "ignoreChainWithDepth": 1
        }
      ]
    },
  },
];
