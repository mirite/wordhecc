import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";


import dotenv from "dotenv";
dotenv.config();

export default {
  entry: {
    wordhecc: path.resolve("src","index.tsx"),
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" }, // to inject the result into the DOM as a style block
          { loader: "css-loader", options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
    alias: {
      helpers: path.resolve("src","helpers"),
    },
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve("dist"),
  },
  target: ["web", "es5"],
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/static/index.html",
    }),
  ],
};
