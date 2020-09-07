export default {
    regPhone: (data) => {
        const exp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        return exp.test(data)
    },

    regMail: (data) => {
        const exp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return exp.test(data)
    },

    regPassword: (data) => {
        const exp = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/;
        return exp.test(data)
    },

    regInt: (data) => {
        const exp = /^[0-9]{0,8}$/;
        return exp.test(data)
    },

    regFloat:(data) => {
        const exp = /^(0|([1-9]\d*))(\.\d+)?$/;
        return exp.test(data)
    }
}
