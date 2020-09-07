const userAgentInfo = window.navigator.userAgent;

export function isWeiXin() {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    const ua = userAgentInfo.toLowerCase();
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    return ua.match(/MicroMessenger/i) == 'micromessenger';
}

export function isPC() {
    const Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod'];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }

    return flag;
}

//设置cookies
export function setCookie (name,value, delay) {
    let date = new Date();
    date.setTime(date.getTime() + delay);
    document.cookie = name + "="+ escape (value) + ";expires=" + date.toGMTString();
}

//读取cookies
export function getCookie (name) {
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if(arr) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
//删除cookies
export function delCookie (name) {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var cval = getCookie(name);
    if(cval!=null) {
        document.cookie= name + "="+cval+";expires="+date.toGMTString();
    }
}

export function isIOS() {
    return !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
}
