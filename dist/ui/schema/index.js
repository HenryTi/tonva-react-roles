export function toUiSelectValues(items) {
    let ret = [];
    for (let item of items) {
        let p = item.indexOf(':');
        if (p < 0)
            throw 'not valid item: ' + item;
        ret.push({
            value: Number(item.substr(0, p)),
            title: item.substr(p + 1),
        });
    }
    return ret;
}
//# sourceMappingURL=index.js.map