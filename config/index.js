module.exports={
    devServer:{
        proxy:{
            "/api":{
            target:'http://127.0.0.1:9888',
              changeOrigin:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },
    build: {
        index: path.resolve(__dirname,  'dist/index.html' ),
        assetsRoot: path.resolve(__dirname,  'dist' ),
        assetsSubDirectory:  'static' ,
        assetsPublicPath:  './' ,
        productionSourceMap:  true
      },
    lintOnSave: false,
    publicPath: './'
}
// module.exports={
//     devServer:{
//         proxy:{
//             "/api":{
//             target:'http://127.0.0.1:8888/',
//               changeOrigin:true,
//                 pathRewrite: {
//                     "^/api": ''
//                 }
//             }
//         }

//      }
// }
// module.exports={
//     devServer:{
//         proxy:{
//             ["/api"]:{
//             target:'http://127.0.0.1:8888',
//               changeOrigin:true,
//                 pathRewrite: {
//                     ['^' + "/api"]: ''
//                 }
//             }
//         }

//      }
// }
// module.exports = {
//     devServer: {
//         proxy: {
//             "/api": {
//                 target: 'https://127.0.0.1:8888',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }

//     }
// }


// proxyTable: {
//     '/proxy': {

//         target: 'http://192.168.2.141:8080',

//             changeOrigin: true,

//                 pathRewrite: {
//             '^/proxy': ''
//         }
//     }
// }

// module.exports = merge(prodEnv, {
//     NODE_ENV: '"development"',
//     BASE_API: '"/proxy"'
// })

