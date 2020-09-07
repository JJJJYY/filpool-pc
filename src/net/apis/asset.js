import { get, post } from '../axios';

const _pre = '/asset';

const distribution = '/distribution';

export default {

    // 获取充币地址
    getAssetAddress: (data) => get('DepositAddress.UserAddress', data),

    // 内部转账
    postAssetTransfer: (data) => post(`Balance.InternalTransfer`, data),

    // 我的资产
    getAssetMy: () => get(`Balance.My`),

    // 资产变动明细
    getAssetPipeline: (asset) => get(`${_pre}/pipeline?asset=${asset}`),

    // 平台支持的资产
    getAssetTokens: () => get(`Asset.Tokens`),

    // 提币
    postAssetWithdrawal: (data) => post(`Balance.Withdrawal`, data),

    // 算力兑换
    postDistribution: (data) => post(`${distribution}/exchange`, data),

    // 算力兑换比例
    getDistributionRate: () => get(`${distribution}/access/exchangeRate`),

    ///general/access/download
    // postDownload: (data) => post(`/general/access/download`, data),

};
