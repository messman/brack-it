const path = require("path");

const webpack = require("webpack");

const buildTime = (new Date()).toString();

// Cleans a directory
const CleanWebpackPlugin = require("clean-webpack-plugin");

const htmlPluginOptions = {
	title: "Brack-It",
	template: "./src/index.template.ejs",
	minify: false,
	xhtml: true, // Use XHTML-compliance
	user: {
		buildTime: buildTime
	}
};

const baseWebpackOptions = {
	entry: {
		index: "./src/ts/entries/index.tsx",
		vendor: [
			"react",
			"react-dom"
		]
	},
	output: {
		filename: "entry.[name].[chunkhash].js",
		hashDigestLength: 10,
		path: path.resolve(__dirname, "./dist")
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions (so that you don't need to type out the extension yourself).
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader' and then 'babel-loader'.
			// ts-loader: convert typescript to javascript (tsconfig.json)
			// babel-loader: converts javascript to javascript (es5) (.babelrc)
			{
				test: /\.tsx?$/,
				exclude: ["./node_modules/"],
				loaders: ["babel-loader", "ts-loader"]
			},
		]
	},

	plugins: [
		// Clean the "dist" folder each time
		new CleanWebpackPlugin(["./dist"]),
		// Filter out all the vendor libraries and put that in its own chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		// Filter out all the "Webpack" manifest code and put that in its own chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: "runtime"
		})
	]
};

module.exports = {
	html: htmlPluginOptions,
	base: baseWebpackOptions
};