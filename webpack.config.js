const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ["./test/hello.js"],
	watch: true,
	output: {
		filename: "./dist/bundle.js",
	},
	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",
	devServer: {
		host: "0.0.0.0",
		port: "3000",
		historyApiFallback: true,
	},
	module: {
		loaders: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{
				test: /\.js?$/,
				loaders: ["babel"],
				exclude: /node_modules/,
			},
			{
				test: /\.json?$/,
				loader: "json",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			inject: true,
		}),
	],
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
};
