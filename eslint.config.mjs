import antfu from "@antfu/eslint-config"
import nextTs from "eslint-config-next/typescript"
import nextVitals from "eslint-config-next/core-web-vitals"

export default antfu({
  type: "app",
  react: true,
  nextjs: true,
  formatters: true,
  typescript: true,
  stylistic: {
    semi: false,
    indent: 2,
    quotes: "double",
  },
  ignores: [
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ],
  rules: {
    "antfu/if-newline": "off",
    "no-empty": "error",
    "no-empty-function": "error",
    "node/no-process-env": "error",
    "node/no-process-exit": "error",
    "node/prefer-global/process": "off",
    "prefer-const": "error",
    "perfectionist/sort-imports": "off",
    "react-refresh/only-export-components": "off",
    "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
    "style/arrow-parens": "off",
    "style/jsx-curly-newline": "off",
    "style/max-len": ["error", { code: 120 }],
    "style/multiline-ternary": "off",
    "style/operator-linebreak": "off",
    "style/quotes": "error",
    "ts/no-unused-vars": ["error", {
      args: "all",
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    }],
    "ts/no-explicit-any": "error",
    "ts/no-unused-expressions": "off",
    "ts/consistent-type-definitions": "off",
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md", "LICENSE"],
    }],
  },
  ...nextVitals,
  ...nextTs,
})
