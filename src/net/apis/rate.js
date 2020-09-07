import { get, post } from '../axios';

export default {

    //商品列表
    getGoodList: () => get('Goods.List'),

    //商品详情
    getGoodDetail: (id) => get('Goods.Get', { id: id }),

    //确认订单
    postConfirmOrder: (data) => post('/purchase/confirmOrder', data),

    //订单详情
    getOrderDetail: (id) => get(`/purchase/orderDetails?id=${id}`),

    //下单
    postOrder: (data) => post('/purchase/order', data),

    //我的订单列表
    getMyOrderList: (data) => get(`Weight.OrderList`, data),

    //支持的价格
    // getRatePrice: () => get('/general/access/price'),

    //常见问题
    getRateProblem: () => get('/general/access/problem'),

    //关于我们 
    getGeneralBottom: (data) => get(`/general/access/bottom?key=${data}`),

    getGeneralBottomCode: () => get(`LinksInfo.Bottom`),

    //banner
    getGeneralBanner: () => get('Banner.List'),

    //advertisement
    getGeneralAdvertisement: (data) => get('LinksInfo.Advertisement', data),

    //notice
    getGeneralNotice: (data) => get('Announcement.List', data),

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
    getPowerByMiner: (address) => get('/api/v1/account/info', {address: address}),
    //获取图表数据
    getBlockWon: (data) => get('/api/v1/info/block_won', data),
    //获取矿工排行
    getMinerTop: () =>  get('/api/v1/miner/top'),
};
