module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // 支持最新的 ECMAScript 语法
    sourceType: "module", // 支持 ECMAScript 模块
    ecmaFeatures: {
      jsx: true, // 启用 JSX 支持
    },
  },
  env: {
    browser: true, // 启用浏览器环境中的全局变量
    es2021: true,  // 支持 ES2021 环境
  },
  extends: ["eslint:recommended", "plugin:react/recommended"], // 使用推荐的 ESLint 和 React 规则
  rules: {
    // 你的自定义规则
  },
};
