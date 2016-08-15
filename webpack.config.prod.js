const webpack = require("webpack");

module.exports = {
	entry: ["./src/index.js"],
	watch: false,
	output: {
		filename: "index.js",
		path: "./dist",
		library: "RocketReact",
		libraryTarget: "umd",
	},
	target: "node",
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
/*		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
			},
		}),*/
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		//new webpack.optimize.UglifyJsPlugin(),
	],
	externals: {
		"tcomb": "tcomb",
	},
};
