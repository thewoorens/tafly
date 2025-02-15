const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    configureWebpack: {
      plugins: [
          new (require('webpack')).DefinePlugin({
              '__VUE_OPTIONS_API__': JSON.stringify(true),
              '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false)
          })
      ]
    },
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        require('tailwindcss'),
                        require('autoprefixer')
                    ]
                }
            }
        }
    },
    transpileDependencies: true,
})
