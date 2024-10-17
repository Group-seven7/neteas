const { config } = require("localforage");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:vue/vue3-essential", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    quotes: ["error", "double"],
    "import/no-extraneous-dependencies": "off",
    "vue/multi-word-component-names": "off",
    "arrow-body-style": ["off"],
    "no-console": "off",
    "import/prefer-default-export": "off",
  },
  settings: {
    "import/resolver": {
      // "vite":{
      //   "config":"vite.config.js"
      // },
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
};

