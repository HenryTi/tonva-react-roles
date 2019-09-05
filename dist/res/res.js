import * as React from 'react';
const en_AbcEntry = {
    entryA: {
        a: 'dd',
        b: 'a',
        c: React.createElement("div", null),
    }
};
const enAbcEntry = {
    _: en_AbcEntry,
};
const zhAbcEntry = {};
let resEntry = {
    _: en_AbcEntry,
    en: enAbcEntry,
    zh: zhAbcEntry,
};
function buildRes(res) {
    return res._ || {};
}
//# sourceMappingURL=res.js.map