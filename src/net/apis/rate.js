import {
    get,
    post
} from '../axios';

export default {

    //商品列表
    getGoodList: () => get('Goods.List'),

    //商品详情
    getGoodDetail: (id) => get('Goods.Get', {
        id: id
    }),

    //确认订单
    postConfirmOrder: (data) => post('Weight.ConfirmOrder', data),

    //订单详情
    getOrderDetail: (id) => get('Weight.OrderDetails', {
        id: id
    }),

    //下单
    postOrder: (data) => post('Weight.Order', data),

    //我的订单列表
    getMyOrderList: (data) => get(`Weight.OrderList`, data),

    //支持的价格
    // getRatePrice: () => get('/general/access/price'),

    //常见问题
    getRateProblem: () => get('/general/access/problem'),

    //关于我们 
    getGeneralBottom: (key) => get(`TextInfo.Get`, {
        key: key
    }),

    getGeneralBottomCode: () => get(`LinksInfo.Bottom`),

    //banner
    getGeneralBanner: () => get('Banner.List'),

    //advertisement
    getGeneralAdvertisement: (data) => get('LinksInfo.Advertisement', data),

    //notice
    getGeneralNotice: (data) => get('Announcement.List', data),
    //获取公告详情
    getNoticeDetail: (data) => get(`Announcement.Detail`, data),

    //合作伙伴
    getGeneralPartner: () => get('PartnerInfo.List'),

    // 帮助中心
    getGeneralHelp: () => get('/general/access/help'),

    // 帮助详情
    getGeneralHelpDetail: (id) => get(`/general/access/helpDetail?id=${id}`),

    //友情链接
    getGeneralLink: () => get(`LinksInfo.List`),
    //获取区块信息
    getBlockInfo: () => get('/api/v1/info/base'),
    //获取矿工算力
    getPowerByMiner: (address) => get('/api/v1/account/info', {
        address: address
    }),
    //获取图表数据
    getBlockWon: (data) => get('/api/v1/info/block_won', data),
    //获取矿工排行
    getMinerTop: () => get('/api/v1/miner/top'),
    //
    getPoolInfo: (data) => get('PoolInfo.Info', data),
    // 抢购
    getPurchaseInfo: (data) => get('FlashSale.ShowPurchaseInfo', data),
    // 首页抢购列表页
    getHomePageSaleLatestInfo: () => get('FlashSale.showHomePageSaleLatestInfo'),
    // 开始抢购
    getPurchase: (data) => get('FlashSale.Purchase', data),
    // 刷新状态
    getCheckOrderStatus: (data) => get('FlashSale.CheckOrderStatus', data),
    // 获取抢购排队列表
    getListTopFlashUsers: (data) => get('FlashSale.ListTopFlashUsers', data),
    // 划转
    getTransfer: (data) => get('Balance.Transfer', data),
    // 抢购列表
    getFlashSaleOrderList: (data) => get('FlashSale.GetFlashSaleOrderList', data),
    // 算力记录
    getUserAdjPowerList: (data) => get('UserAdjPower.List', data),
    // 1 , 2 期
    getMyPowert: (data) => get('App.Weight.MyPower', data),
    // 划转质押
    getTransferPledged: (data) => get('App.Balance.TransferPledged', data),
};