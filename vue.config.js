module.exports = {
    devServer: {
        //npm run serve で使うポート
        port: 1325,
        //バックエンドへとの通信設定をカプセルする
        proxy: {
            // http請求のurlの"/api"文字列をバックエンドのurlに書き直す。
            // 書き直す後の例: /api/upload/img イコール http://127.0.0.1:9888/upload/img
            "/api": {
                target: 'http://127.0.0.1:9888',
                //CORS error対応
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },
    //アウトプットのセッティング
    lintOnSave: false,
    publicPath: './'
}
    // target:'http://150.158.45.111:9888',
    // target:'http://192.168.1.122:9888',
    // target:'http://192.168.33.16:9888',
