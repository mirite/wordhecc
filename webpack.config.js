const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HoneybadgerWebpack = require('@honeybadger-io/webpack');

module.exports = {
	entry: {
		wordhecc: path.resolve(__dirname, 'src/index.tsx'),
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' }, // to inject the result into the DOM as a style block
					{ loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
					{ loader: 'css-loader', options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
		alias: {
			helpers: path.resolve(__dirname, 'src/helpers'),
		},
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	target: ['web', 'es5'],
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/static/index.html',
		}),
		new HoneybadgerWebpack({
			apiKey: 'hbp_ENX1M79SimYcIlUO4QtdeuxTx3xSIm4xeeVI',
			assetsUrl: 'https://wordhe.cc/wordhecc.bundle.js',
			deploy: {
				environment: process.env.NODE_ENV,
				repository: 'https://github.com/mirite/wordhecc',
			},
		}),
	],
};
