const path = require("path");

const env = process.env.NODE_ENV;
console.log("Environment: " + env);

// Add the ExtractTextPlugin to move CSS out into their own files
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
	filename: "index.css",
});
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/ts/entries/index.tsx",
	},
	output: {
		filename: "webpack.entry.[name].js",
		path: path.resolve(__dirname, "dist")
	},

	// Enable sourcemaps for debugging webpack's output. Increases build time - faster options are available.
	devtool: "source-map",

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

			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader" // Translates CSS into JS
					}, {
						loader: "sass-loader" // Compiles SCSS
					}],
					// Use style-loader in development
					fallback: "style-loader" // Create styles from JS strings
				})
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(["dist"]),
		extractSass
	]

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	//externals: {
	//	"react": "React",
	//	"react-dom": "ReactDOM"
	//},
};