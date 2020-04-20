export var mobileRegex = /^[0-9]*$/;
export var emailRegex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
// /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
export var EmailFieldRule = function (value) {
    if (emailRegex.test(value) === false)
        return '电子邮件格式错误';
};
export var MobileFieldRule = function (value) {
    if (emailRegex.test(value) === false)
        return '手机格式错误';
};
//# sourceMappingURL=index.js.map