const path = require("path");

module.exports = {
  entry: "./static/ts/index.tsx",
  target: "web",
  output: {
    path: path.resolve(__dirname, "static", "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      }
    ],
  },
};
