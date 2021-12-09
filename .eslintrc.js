  module.exports = {
    env: {
      commonjs: true,
      node: true,
      browser: true,
      es6: true,
      jest: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    globals: {},
    parser: "babel-eslint",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["react", "import", "react-hooks"],
    ignorePatterns: ["node_modules/"],
    rules: {
        "prettier/prettier": "error",
        "arrow-body-style": "warn",
        "prefer-arrow-callback": "warn",
        "import/no-unresolved": 2,
        "import/no-commonjs": 2,
        "import/extensions": [2, "ignorePackages"],
        "indent": ["error", "tab"],
        "semi": ["error", "always"]
    },
    settings: {
      react: {
        version: "latest", // "detect" automatically picks the version you have installed.
      },
    },
  };