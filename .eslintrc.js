module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ["prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    quotes: [
      1,
      "double",
      {
        avoidEscape: true,
      },
    ],
    semi: 1,
    "arrow-parens": [1, "as-needed"],
    "@typescript-eslint/ban-ts-ignore": "off",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
};
