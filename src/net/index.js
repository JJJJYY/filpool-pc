import rate from './apis/rate';
import mine from './apis/mine';
import asset from './apis/asset';

const requests = Object.assign({}, rate, mine, asset);

export default requests;
