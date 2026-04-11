import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  devtool: "source-map",
  entry: {
    wordhecc: path.resolve("src", "index.tsx"),
  },
  module: {
    rules: [
      { loader: "ts-loader", test: /\.tsx?$/ },
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
  output: {
    chunkFilename: "[name].bundle.js",
    filename: "[name].bundle.js",
    path: path.resolve("dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/static/index.html",
    }),
  ],
  resolve: {
    alias: {
      helpers: path.resolve("src", "helpers"),
    },
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  target: ["web", "es5"],
};
