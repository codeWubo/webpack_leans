const path = require("path"); //node核心模块，专门处理路径问题
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口 相对路径
  entry: "./src/main.js",
  // 输出
  output: {
    // path 需要绝对路径
    // __dirname 代表当前文件的绝对路径，dist 为目标文件夹，没有的话会自动创建
    path: path.resolve(__dirname, "../dist"),
    // 文件名
    filename: "main.js",
    // filename: "js/main.js",
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      // css
      {
        // 匹配.css 后缀文件,想到正则test方法
        test: /\.css$/,
        // 执行顺序，从右到左，从上到下
        // style-loader 将js中的css通过创建style标签添加到html文件
        // css-loader 将css资源编译成commonjs的模块到js
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // less
      {
        //  i 不区分大小写
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      //sass scss
      {
        //  i 不区分大小写
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      //stylus
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"], // 将 Stylus 文件编译为 CSS
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        // 小于3kb 图片转为base64
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3kb
          },
        },
        generator: {
          filename: "static/images/[hash:8][ext][query]",
        },
      },
      // iconfont
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        // resource 不会转base64
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      // babel js
      {
        test: /\.js$/,
        // 排除node_modules中的js文件
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // 已在babel.config.js配置
          // Options: {
          //   presets:['@babel/preset-env']
          // }
        },
      },
    ],
  },
  // plugins
  plugins: [
    //eslint
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
    }),
    // html
    new HtmlWebpackPlugin({
      // 以public/index.html为模板生成新的html文件，即保留DOM结构
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  //模式
  mode: "production",
};
