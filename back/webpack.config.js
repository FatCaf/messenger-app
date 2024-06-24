const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const fs = require('fs');

const firebaseServiceAccount = fs.readFileSync(
	path.resolve(__dirname, 'firebase.service.account.json'),
	'utf-8'
);

module.exports = {
	entry: './src/server.ts',
	target: 'node',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/static/index.html',
			filename: 'index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/static/assets', to: 'assets' }],
		}),
		new Dotenv({
			path: path.resolve(__dirname, '.env'),
		}),
		new webpack.DefinePlugin({
			'process.env.FIREBASE_SERVICE_ACCOUNT': JSON.stringify(
				firebaseServiceAccount
			),
		}),
	],
};
