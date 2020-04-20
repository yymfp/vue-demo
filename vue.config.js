const path = require('path')
const webpack = require('webpack')

function resolvePath(src) {
    return path.resolve(__dirname, src)
}

module.exports = {
    chainWebpack: config => {
        // 配置路径别名
        config.resolve
            .alias
            .set('@', resolvePath('src'))
    },
    // configureWebpack: {
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             jQuery: 'jquery',
    //         })
    //     ]
    // }
}
