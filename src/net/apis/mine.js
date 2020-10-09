import { get, post, form } from '../axios';

const auth = '/auth';

const setting = '/setting';

const message = '/message';

const distribution = '/distribution';

export default {

    // 图片 base64 验证码
    // getBase64Captcha: () => get(`${auth}/access/base64/captcha?r=${Math.random()}`),

    // 登录
    postLogin: data => post(`AuthUser.Login`, data),

    // 注册第二步
    postRegisterStep2: data => post(`AuthUser.Register`, data),

    // 重置密码
    postReset: data => post(`AuthUser.ResetPassword`, data),

    // 登录信息
    getLoginInfo: (url) => get('AuthUser.Info'),
    //刷新用户信息
    // getRefreshLoginInfo: () => get(`${auth}/refreshLoginInfo`),

    // logout
    getLogout: () => get(`AuthUser.Logout`),

    // 账号认证首页
    // postSettingInfo: data => post(`${setting}/info`, data),

    // kyc1 bindEmail
    postBindKyc2Email: data => post(`AuthUser.ModifyEmail`, data),

    // kyc1 email
    postSettingKyc1Email: data => post(`AuthUser.ModifyEmail`, data),

    // kyc1 phone
    postSettingKyc1Phone: data => post(`AuthUser.ModifyPhone`, data),

    // kyc2
    // postSettingKyc2: data => post(`${setting}/kyc2/auth_name`, data),

    // kyc3
    // postSettingKyc3: data => post(`${setting}/kyc3/upload`, data),

    // 设置语言
    postSettingLanguage: data => post(`${setting}/modify/language`, data),

    // 修改登录密码
    postSettingPassword: data => post('AuthUser.ModifyPassword', data),

    // 修改支付密码
    postSettingPayPwd: data => post(`AuthUser.ModifyPayPwd`, data),

    // 支付方式
    // postSettingPayType: data => post(`${setting}/modify/pay_type`, data),

    // 支付方式首页
    // postSettingPayTypeInfo: data => post(`${setting}/pay_type/info`, data),

    // 获取图片
    // getPic: (uuid, type) => get(`${setting}/access/get_pic?uuid=${uuid}&type=${type}`),

    // 获取七牛Token
    getToken: () => get(`Qiniu.Token`),
    // 上传图片
    postUpload: data => form(`https://up-z2.qiniup.com/`, data),
    //实名认证
    postActual: (data) => post('UserIdInfo.Submit', data),
    //获取实名认证信息
    getActualInfo: () => get('UserIdInfo.Get'),
    //项目动态和进阶小课堂
    getInfoList: (data) => post(`AdvertisementInfo.List`, data),
    //获取项目动态和进阶小课堂
    getInforDetail: (id) => get(`AdvertisementInfo.Detail`, { id, id }),

    //帮助中心
    getHelpDetail: (id) => get(`HelpInfo.Detail`, { id, id }),
    getHelpLists: (data) => post(`HelpInfo.List`, data),

    // 未登录验证码
    postAccessSend: data => post('SMS.Send', data),

    // 登录验证码
    postSend: data => post('SMS.AuthSend', data),

    // 获取GA密钥
    getGaSecret: () => get(`AuthUser.CreateGa`),

    // 绑定Ga
    postBindGa: data => post(`AuthUser.BindGa`, data),

    // 验证旧Ga
    getCheckOldGa: data => get(`AuthUser.CheckOldGa`, data),

    // 算力明细
    getMyWeight: (data) => get('Weight.MyWeight', data),
    getMyWeightApp: (data) => get('Weight.MyWeightGroup', data),

    // 收益
    getMyIncome: (data) => get('Income.UserIncome', data),

    // 查看分销详情
    getWeightDetail: () => get('AuthUser.DistributionDetail'),

    // 查看邀请纪录
    getWeightInviteRecord: () => get('AuthUser.InviteRecord'),

    // 查看邀请详情
    getWeightInviteDetail: () => get(`${distribution}/inviteDetail`),

    // 查看分销详情
    getWeightOrderRecord: () => get(`BalanceModify.RewardRecord`),

    // 等级规则
    getLevelRule: () => get('/general/access/levelRule'),
};
