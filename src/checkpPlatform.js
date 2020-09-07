import { isiOS, isAndroid, isWeixin } from '@/util/utilTools';
import { h5Origin } from '@/config';
window.addEventListener("resize", relink);

function relink() {
    if (isiOS || isAndroid || isWeixin) {
        let hashs = ["#/download", "#/login", "#/register", "#/rate","#/rate_detail"];
        let useHash = false;
        let routeHash = window.location.hash;
        hashs.forEach((item) => {
            if (routeHash.indexOf(item) === 0) {
                useHash = true;
            }
        });
        if (useHash) {
            window.location.href = h5Origin + routeHash;
        } else {
            window.location.href = h5Origin;
        }
    }
}

relink();