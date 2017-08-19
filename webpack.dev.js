console.log("~~~~~ DEVELOPMENT build ~~~~~");

const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {

	devtool: "cheap-module-source-map",

	module: {
		rules: [
			{
				test: /\.scss$/,
				loaders: [
					"style-loader", // Create styles from JS strings
					"css-loader", // Translates CSS into JS
					"sass-loader", // Compiles SCSS
				]
			}
		]
	}
});