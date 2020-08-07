const path = require('path')
const webpack = require('webpack')

function resolvePath(src) {
    return path.resolve(__dirname, src)
}

module.exports = {
    productionSourceMap: true,
    devServer: {
        open: true
    },
    chainWebpack: config => {
        // 配置路径别名
        config.resolve
            .alias
            .set('@', resolvePath('src'));
        config.when(process.env.NODE_ENV === 'development', // 开发环境
            // config => config.devtool('cheap-source-map') // 转换过的源码-快
            config => config.devtool('source-map') // 源码-慢
        )
    },
}
