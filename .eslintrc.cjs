module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true   // ✅ This enables Jest globals like "test", "expect"
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    // your existing custom rules here
  }
};
