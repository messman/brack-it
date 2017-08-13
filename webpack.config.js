const path = require("path");

module.exports = {
	entry: {
		index: "./src/entries/index.tsx",
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
			}
		]
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	//externals: {
	//	"react": "React",
	//	"react-dom": "ReactDOM"
	//},
};