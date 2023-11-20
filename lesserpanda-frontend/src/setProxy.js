const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/*", {
            target: "http://43.202.247.199:8080",
            changeOrigin: true,
        })
    );
};