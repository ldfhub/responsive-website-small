const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
	entry:'./src/main.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'bundle.js',
		// 对url路径处理
		publicPath:'dist/'
	},
	module:{
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.less$/,
				use: [{
						loader: "style-loader" // creates style nodes from JS strings
				}, {
						loader: "css-loader" // translates CSS into CommonJS
				}, {
						loader: "less-loader" // compiles Less to CSS
				}]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// 当图片大于limit,需要安装file-loader
							// 当小于时,会将图片转成base64字符串编码输出
							limit: 9090,
							// name:'images/[name].[hash:6].[ext]',
							name:'images/[name].[ext]',
							esModule: false
						}
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: utils.assetsPath('media/[name].[ext]'),
				}
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{ test: /\.vue$/, 
				loader: 'vue-loader' ,
			},
			{
				test: /\.(htm|html)$/i,
				use:[ 'html-withimg-loader']
			}
		]
	},
	resolve:{
		//alias别名
		alias:{
			'vue$':'vue/dist/vue.esm.js'
		}
	},
	plugins:[
		new webpack.BannerPlugin('最终版权归aaa所有'),
		new HtmlWebpackPlugin({
			template:'index.html'
		}),
		new UglifyjsWebpackPlugin()
	],
	devServer:{
		contentBase:'./dist',
		inline:true
	}
}