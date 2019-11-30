const commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');

const prodConfig = {
    mode: 'production',
    /**
    * cheap:在生成source-map的时候可以不带列信息，只带行信息就可以了
    * 同时不要对我load代码的source-map。只要对我的业务代码进行source-map生成
    * 这种方式提示的错误比较全，打包速度比较快，
    */
    devtool: 'cheap-module-source-map'
}

module.exports = merge(commonConfig, prodConfig);
