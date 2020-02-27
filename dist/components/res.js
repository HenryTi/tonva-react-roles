import _ from 'lodash';
export const resOptions = {
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
    let lang, district;
    let language = (navigator.languages && navigator.languages[0]) // Chrome / Firefox
        || navigator.language; // ||   // All browsers
    //navigator.userLanguage; // IE <= 10
    if (!language) {
        lang = 'zh';
        district = 'CN';
    }
    else {
        let parts = language.split('-');
        lang = parts[0];
        if (parts.length > 1)
            district = parts[1].toUpperCase();
    }
    setResOptions(lang, district);
}());
export function resLang(res) {
    let { lang, district } = resOptions;
    let ret = {};
    if (res === undefined)
        return ret;
    _.merge(ret, res._);
    let l = res[lang];
    if (l === undefined)
        return ret;
    _.merge(ret, l._);
    let d = l[district];
    if (d === undefined)
        return ret;
    _.merge(ret, d);
    let { entity } = ret;
    if (entity !== undefined) {
        for (let i in entity) {
            entity[i.toLowerCase()] = entity[i];
        }
    }
    return ret;
}
const resGlobal = {};
export function setRes(taget, res) {
    if (res === undefined)
        return;
    let { $lang, $district } = resOptions;
    _.merge(taget, res);
    if ($lang !== undefined) {
        let l = res[$lang];
        if (l !== undefined) {
            _.merge(taget, l);
            let d = l[$district];
            if (d !== undefined) {
                _.merge(taget, d);
            }
        }
    }
}
export function setGlobalRes(res) {
    setRes(resGlobal, res);
}
export function t(str) {
    return resGlobal[str] || str;
}
//# sourceMappingURL=res.js.map