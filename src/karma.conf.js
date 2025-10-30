// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["src/tests/**/*.spec.js"],
    preprocessors: {
      "src/tests/**/*.spec.js": ["webpack", "sourcemap"],
    },
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
      devtool: "inline-source-map",
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    singleRun: true,
    concurrency: Infinity,
  });
};
