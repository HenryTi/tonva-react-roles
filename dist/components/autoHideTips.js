"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoHideTips = void 0;
var react_1 = __importDefault(require("react"));
var mobx_react_1 = require("mobx-react");
function autoHideTips(tips, templet, timeout) {
    var timer;
    return react_1.default.createElement(mobx_react_1.observer(function () {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
        var t = tips.get();
        if (!t)
            return null;
        if (timeout === undefined)
            timeout = 3000;
        if (timeout > 0) {
            timer = setTimeout(function () {
                tips.set(null);
            }, timeout);
        }
        switch (typeof templet) {
            case 'undefined': return react_1.default.createElement(react_1.default.Fragment, null, t);
            case 'function': return templet(t);
            case 'string': return react_1.default.createElement(react_1.default.Fragment, null, templet);
            default: return templet;
        }
    }));
}
exports.autoHideTips = autoHideTips;
;
//# sourceMappingURL=autoHideTips.js.map