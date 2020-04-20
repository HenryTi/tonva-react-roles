import * as React from 'react';
var en_AbcEntry = {
    entryA: {
        a: 'dd',
        b: 'a',
        c: React.createElement("div", null),
    }
};
var enAbcEntry = {
    _: en_AbcEntry,
};
var zhAbcEntry = {};
var resEntry = {
    _: en_AbcEntry,
    en: enAbcEntry,
    zh: zhAbcEntry,
};
function buildRes(res) {
    return res._ || {};
}
//# sourceMappingURL=res.js.map