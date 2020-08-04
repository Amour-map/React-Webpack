const path = require("path");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ESLINT_ENABLE = true;
const STYLELINT_ENABLE = true;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      // JSX
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"]
            }
          },
          ...ESLINT_ENABLE ? 
          [{
            loader: "eslint-loader"
          }] : []
        ]
      },
      // 样式
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
      // 文件
      // 图片
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "[hash:8].[name].[ext]",
            outputPath: "imgs/"
          }
        }
      },
      // 字体
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
            name: "[hash:8].[name].[ext]",
            outputPath: "fonts/"
          }
        }
      }
    ]
  },
  plugins: [
    ...STYLELINT_ENABLE ? [new StyleLintPlugin({
      files: ['**/*.css', '**/*.less', '**/*.scss', '**/*.html', '**/*.vue']
    })]:[],
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: './index.html'
    })
  ],
  devtool: "source-map",
  devServer: {
    open: true,
    port: 8000
  }
}
