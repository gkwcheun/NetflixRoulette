const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require("beautify-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.join(__dirname, "src"),
  output: {
    filename: "client_bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.?(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // {
      //   test: /\.?css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.?css$/i,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
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
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new BeautifyHtmlWebpackPlugin({
      indent_size: 2,
      indent_char: " ",
      indent_with_tabs: false,
      editorconfig: false,
      eol: "\n",
      end_with_newline: false,
      indent_level: 0,
      preserve_newlines: true,
      max_preserve_newlines: 2,
      space_in_paren: false,
      space_in_empty_paren: false,
      jslint_happy: false,
      space_after_anon_function: false,
      space_after_named_function: false,
      brace_style: "collapse",
      unindent_chained_methods: false,
      break_chained_methods: false,
      keep_array_indentation: false,
      unescape_strings: false,
      wrap_line_length: 0,
      e4x: false,
      comma_first: false,
      operator_position: "before-newline",
      indent_empty_lines: false,
      templating: ["auto"],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
