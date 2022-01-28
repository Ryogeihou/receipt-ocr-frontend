module.exports={
    devServer:{
        port:1325,
        proxy:{
            "/api":{
            target:'http://127.0.0.1:9888',
            // target:'http://150.158.45.111:9888',
            // target:'http://192.168.1.122:9888',
            // target:'http://192.168.33.16:9888',
              changeOrigin:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },

    lintOnSave: false,
    publicPath: './'
}