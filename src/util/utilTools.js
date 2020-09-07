/*判断safari浏览器*/
const isSafari = () => {
    return /Apple/.test(navigator.vendor);
};
const formatDate = (dateStr, format) => {
    if (isSafari()) {
        dateStr = dateStr.replace(/(\d{2})(\d{2})$/, "$1:$2");
    }
    let dateObejct = new Date(dateStr);
    let date = {
        "M+": dateObejct.getMonth() + 1,
        "d+": dateObejct.getDate(),
        "h+": dateObejct.getHours(),
        "m+": dateObejct.getMinutes(),
        "s+": dateObejct.getSeconds(),
        "q+": Math.floor((dateObejct.getMonth() + 3) / 3),
        "S+": dateObejct.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (dateObejct.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

//参数转换处理
const stringify = (obj) => {
    let str = "";
    for (let i in obj) {
        str += i + '=' + unescape(obj[i]) + '&'
    }
    return str.slice(0, -1);
};
//获取url参数
const getSearchParams = (str) => {
    let searchStr = decodeURIComponent(str).replace('?', '');
    let arr = searchStr.split("&");
    let params = {};
    arr.forEach((item) => {
        let arr1 = item.split("=");
        params[arr1[0]] = arr1[1];
    })
    return params;
};
//监听路由
const listenRoouteChange  = (callback) => {
    let currentHash = window.location.hash;
    window.addEventListener("hashchange", () => {
        callback(window.location.hash, currentHash);
        currentHash = window.location.hash;
    })
};
/*处理字节大小*/
const bytesToSize = (size) => {
    if (!size || size === '0') {
        return size;
    }
    let num = 1024.00;
    let sizeList = ['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
    let index = Math.floor(Math.log(size)/Math.log(num));
    let precision = size>num?3:0;
    return (size / Math.pow(num, index)).toFixed(precision) + ` ${sizeList[index]}`;
};
/*以，分隔数字*/
const formatNumber = (amount, splitor = ",") => {
    if (Number(amount) > 1000 && !isNaN(amount)) {
        let numAry = String(amount).split('.');
        let numStr = numAry[0].split("").reverse().join("");
        let length = numStr.length;
        let newStr = numStr.replace(/\d{3}/gi, function(a, b){
            if (b/3 + 1 < Math.ceil(length/3)) {
                return a + splitor;
            } else {
                return a;
            }
        });
        return newStr.split("").reverse().join("") + (numAry[1]?`.${numAry[1]}`:'');
    }
    return amount;
};
/*随机颜色*/
const getRandomColor = function(){
    return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);
};
/*const getFormatTime = function (time) {
    const formatStr = this.$i18n.locale === 'en_US'
        ? "MMM Do YYYY HH:mm:ss (UTCZ)"
        : "YYYY-MM-DD HH:mm:ss (UTCZ)";
    return dayjs(time * 1000).format(formatStr);
};*/
/*动态字符串
* @param str 动态字符串
* @param obj 对象
*/
const regExpTemplate = (str, obj) => {
    return str.replace(/\${[^}]+}/g,  (variableStr) => {
        let variable = variableStr.replace(/\${(.+)}/, "$1");
        return obj[variable];
    })
};
const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
const isWeixin = !!/MicroMessenger/i.test(navigator.userAgent);

const removeRouteChange = (callback) => {
    window.removeEventListener("hashchange", callback);
};
export {
    formatDate,
    stringify,
    getSearchParams,
    listenRoouteChange,
    removeRouteChange,
    isSafari,
    isAndroid,
    isiOS,
    isWeixin,
    bytesToSize,
    formatNumber,
    getRandomColor,
    //getFormatTime,
    regExpTemplate
}