const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  context: path.join(__dirname, "server"),
  entry: "./server.js",
  target: "node",
  output: {
    filename: "server_bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/build",
  },
  module: {
    rules: [
      { test: /\.?(jsx|js)$/, use: "babel-loader" },
      {
        test: /\.?css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader", // inject CSS to page
          },
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run postcss actions
            options: {
              plugins: function () {
                // postcss plugins, can be exported to postcss.config.js
                return [require("autoprefixer")];
              },
            },
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(tff|eot|svg|woff|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
          },
        },
      },
      {
        test: /\.(gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  externals: [webpackNodeExternals()],
};
