module.exports = {
    configureWebpack: {
    	output: {
    	  library: 'VertigoUi', // Add this line to expose the library in the devServer
    	  libraryTarget: 'umd'
    	},
	    devServer: {
	      headers: { 'Access-Control-Allow-Origin': '*' }
	    },
        externals: {
            vue: {
                commonjs: 'vue',
                commonjs2: 'vue',
                root: 'Vue'
            },
            quasar: {
                commonjs: 'quasar',
                commonjs2: 'quasar',
                root: 'Quasar'
            },
            axios: {
                commonjs: 'axios',
                commonjs2: 'axios',
                root: 'axios'
            },            
            ol: {
                commonjs: 'ol',
                commonjs2: 'ol',
                root: 'ol'
            }
        }
    }
}