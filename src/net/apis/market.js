import {
    get,
    post,
    form
} from '../axios';

export default {
    // 行情
    getQuotation: (data) => get('Quotation.getPriceList', data),
}