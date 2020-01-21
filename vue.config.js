const path = require('path')

function resolvePath(src) {
    return path.resolve(__dirname, src)
}

module.exports = {
    chainWebpack: config => {
        // 配置路径别名
        config.resolve
            .alias
            .set('@', resolvePath('src'))
    }
}
