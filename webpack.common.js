const path = require('path');

/* Configure HTMLWebpack plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

/* Configure ProgressBar */
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ProgressBarPluginConfig = new ProgressBarPlugin();

/* Configure CleanWebpack 清理dist目录 */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CleanWebpackPluginConfig = new CleanWebpackPlugin(
    {
        root: __dirname,//根目录
        verbose: true,//开启在控制台输出信息
        dry: false//启用删除文件
    }
);

module.exports = {
    entry: {
        main: './src/app/Main.ts'
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            exclude: /[\/\\]src[\/\\]/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    }
                },
                { loader: 'css-loader' }
            ]
        }, {
            test: /\.css$/,
            exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                    }
                }
            ]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle_[name]_[hash].js',
        path: path.resolve(__dirname, './dist/')
    },
    plugins: [HTMLWebpackPluginConfig, ProgressBarPluginConfig, CleanWebpackPluginConfig],
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};
