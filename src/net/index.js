import rate from './apis/rate';
import mine from './apis/mine';
import asset from './apis/asset';
import market from './apis/market';

const requests = Object.assign({}, rate, mine, asset, market);

export default requests;