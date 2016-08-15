const webpack = require("webpack");
const config = require("../webpack.config.prod");

webpack(config, (err, stats) => {
	if (err) console.warn(err);
});
