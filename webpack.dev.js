const commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');


/* Configure BrowserSync */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BrowserSyncPluginConfig = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'http://localhost:8080/'
}, config = {
    reload: false
});

const devConfig = {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'inline-source-map',
    plugins: [
        BrowserSyncPluginConfig
    ]
}
module.exports = merge(commonConfig, devConfig);
