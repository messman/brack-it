console.log("~~~~~ DEVELOPMENT build ~~~~~");

const merge = require("webpack-merge");
const base = require("./webpack.base.js");

// Creates the HTML file for you
const HTMLWebpackPlugin = require("html-webpack-plugin");

const totalHTMLPluginOptions = merge(base.html,
	{
		title: "Brack-It (Dev)"
	}
);

module.exports = merge(base.base, {

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
	},

	plugins: [
		new HTMLWebpackPlugin(totalHTMLPluginOptions)
	]
});