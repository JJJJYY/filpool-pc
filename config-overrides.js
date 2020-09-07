const { override, fixBabelImports, addLessLoader, addWebpackAlias, addBundleVisualizer, overrideDevServer } = require('customize-cra');
const path = require('path');

process.env.GENERATE_SOURCEMAP = "false";

const devServerConfig = () => config => {
    return {
        ...config,
        proxy: {
            // '/api/v1': {
            //     target:'http://47.57.10.160/',
            //     changeOrigin: true
            // },
            // '/': {
            //     target:'http://192.168.1.22:9008/',
            //     changeOrigin: true
            // }

            '/public': {
                target: 'http://localhost:8080/filpool',
                // target: 'http://ipfs123.zwb.pub',
                changeOrigin: true,
            },

        }
    };
};
module.exports = {
    webpack: override(
        fixBabelImports('antd-mobile', {
            libraryName: 'antd-mobile',
            libraryDirectory: 'es',
            style: true,
        }),
        fixBabelImports('antd', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#E49C3A', '@brand-primary': '#E49C3A' },
        }),
        addWebpackAlias({
            ['@']: path.resolve(__dirname, './src')
        }),
        // 添加 webpack-bundle-analyzer
        /*addBundleVisualizer()*/
    ),
    devServer: overrideDevServer(devServerConfig())
};
