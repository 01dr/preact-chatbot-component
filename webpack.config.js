const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FaviconPlugin = require('favicons-webpack-plugin');

const postCSSNext = require('postcss-cssnext');
const postCSSClearfix = require('postcss-clearfix');
const postCSSFonts = require('postcss-font-magician')(require('./fonts'));
const postCSSPreCSS = require('precss');
const postCSSImport = require('postcss-import');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const devtool = isProd ? 'hidden-source-map' : 'cheap-eval-source-map';
const context = path.join(__dirname, './client');
const entry = {
	js: './index.js',
	vendor: ['react']
};
const output = {
	path: path.join(__dirname, './static'),
	filename: 'bundle.js'
};
const plugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: 'vendor.bundle.js'
	}),

	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),

	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false
	}),

	new webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
	}),

	new ExtractTextPlugin({
		filename: 'app.css',
		allChunks: true
	}),

	new FaviconPlugin({
		logo: './favicon.png',
		prefix: 'icons/'
	}),

	new HtmlPlugin({
		template: './index.html'
	})
];
const preLoaders = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		loader: ['eslint']
	}
];
const loaders = [
	{
		test: /\.pcss$/i,
		loader: ExtractTextPlugin.extract({
			notExtractLoader: 'style-loader',
			loader: 'css?-minimize&modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base26]!postcss'
		})
	},
	{
		test: /\.css$/,
		loaders: ['style-loader', 'css-loader']
	},
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		loader: ['babel'],
		query: { presets: ['es2015'] }
	},
	{
		test: /.*\.(gif|png|jpe?g|svg)$/i,
		loaders: [
			'file?hash=sha512&digest=hex&name=[hash].[ext]',
			{
				loader: 'image-webpack',
				query: {
					progressive: true,
					mozjpeg: {
						quality: 100
					}
				}
			}
		]
	}
];
const resolve = {
	extensions: ['', '.js', '.jsx'],
	modules: [
		path.resolve('./client'),
		path.resolve('./node_modules')
	]
};
const devServer = { contentBase: './client' };

module.exports = {
	devtool,
	entry,
	context,
	output,
	plugins,
	module: { preLoaders, loaders },
	resolve,
	devServer,
	postcss: () => [postCSSImport, postCSSNext, postCSSPreCSS, postCSSClearfix, postCSSFonts]
};
