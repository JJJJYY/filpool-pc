export default {
    numberFilter: v => v.replace(/[^\d]/g, ''),
    phoneCheck: v => (/^\d{8,11}$/).test(v),
    emailCheck: v => (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/).test(v),
    passCheck: v => (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,17}$/).test(v),
    num6Check: v => (/^\d{6}$/).test(v),
};
