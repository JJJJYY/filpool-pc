const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addBundleVisualizer,
    overrideDevServer
} = require('customize-cra');
const path = require('path');

process.env.GENERATE_SOURCEMAP = "false";

const devServerConfig = () => config => {
    return {
        ...config,
        proxy: {
            '/public': {
                // target: 'http://localhost:8080/filpool',
                target: 'http://testapi.filpool.c28e9d7b637474c3a98b2ed559c29434c.cn-hongkong.alicontainer.com/',
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
            modifyVars: {
                '@primary-color': '#E49C3A',
                '@brand-primary': '#E49C3A'
            },
        }),
        addWebpackAlias({
            ['@']: path.resolve(__dirname, './src')
        }),
        // 添加 webpack-bundle-analyzer
        /*addBundleVisualizer()*/
    ),
    devServer: overrideDevServer(devServerConfig())
};