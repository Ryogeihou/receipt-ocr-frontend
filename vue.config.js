module.exports={
    devServer:{
        proxy:{
            "/api":{
            target:'http://127.0.0.1:9888/',
            // target:'http://192.168.86.236:9888/',
              changeOrigin:true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        }

     }
}