module.exports={
    devServer:{
        proxy:{
            "/api":{
            target:'https://127.0.0.1:8888',
              changeOrigin:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
  
    }
  }
  