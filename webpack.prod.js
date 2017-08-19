console.log("~~~~~ PRODUCTION build ~~~~~");

const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

// Add the ExtractTextPlugin to move CSS out into their own files
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
	filename: "index.css",
});

module.exports = merge(baseConfig, {

	// Enable sourcemaps for debugging webpack's output. Increases build time - faster options are available.
	devtool: "source-map",

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader" // Translates CSS into JS
					}, {
						loader: "sass-loader" // Compiles SCSS
					}],
					fallback: "style-loader" // Create styles from JS strings
				})
			}
		]
	},

	plugins: [
		extractSass
	]
});