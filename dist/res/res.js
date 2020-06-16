import _ from 'lodash';
export var resOptions = {
    lang: undefined,
    $lang: undefined,
    district: undefined,
    $district: undefined,
};
export function setResOptions(lang, district) {
    resOptions.lang = lang;
    resOptions.$lang = '$' + lang;
    resOptions.district = district;
    resOptions.$district = '$' + district;
}
(function () {
    var lang, district;
    var language = (navigator.languages && navigator.languages[0]) // Chrome / Firefox
        || navigator.language; // ||   // All browsers
    //navigator.userLanguage; // IE <= 10
    if (!language) {
        lang = 'zh';
        district = 'CN';
    }
    else {
        var parts = language.split('-');
        lang = parts[0];
        if (parts.length > 1)
            district = parts[1].toUpperCase();
    }
    setResOptions(lang, district);
}());
export function resLang(res) {
    var lang = resOptions.lang, district = resOptions.district;
    var ret = {};
    if (res === undefined)
        return ret;
    _.merge(ret, res._);
    var l = res[lang];
    if (l === undefined)
        return ret;
    _.merge(ret, l._);
    var d = l[district];
    if (d === undefined)
        return ret;
    _.merge(ret, d);
    var entity = ret.entity;
    if (entity !== undefined) {
        for (var i in entity) {
            entity[i.toLowerCase()] = entity[i];
        }
    }
    return ret;
}
var resGlobal = {};
export function setRes(target, res) {
    if (res === undefined)
        return;
    var $lang = resOptions.$lang, $district = resOptions.$district;
    _.merge(target, res);
    if ($lang !== undefined) {
        var l = res[$lang];
        if (l !== undefined) {
            _.merge(target, l);
            var d = l[$district];
            if (d !== undefined) {
                _.merge(target, d);
            }
        }
    }
    return function (str) {
        return target[str] || str;
    };
}
export function setGlobalRes(res) {
    setRes(resGlobal, res);
}
export function t(str) {
    return resGlobal[str] || str;
}
//# sourceMappingURL=res.js.map