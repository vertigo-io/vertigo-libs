module.exports = {
    configureWebpack: {
        externals: {
            quasar: {
                commonjs: 'quasar',
                commonjs2: 'quasar',
                root: 'Quasar'
            },
            ol: {
                commonjs: 'ol',
                commonjs2: 'ol',
                root: 'ol'
            }
        }
    }
}