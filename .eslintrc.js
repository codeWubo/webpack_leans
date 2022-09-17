module.exports = {
  root: true,
  parserOptions: {
    // parser: "babel-eslint",
    ecmaVersion: 6,
    sourceType: "module",
  },
  env: {
    browser: true, //全局变量
    node: true, //全局变量
    es6: true,
  },
  // "plugin:vue/recommended", 
   //   继承规则
  extends: ["eslint:recommended"],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "no-var": 2, //不能使用var
  },
};
