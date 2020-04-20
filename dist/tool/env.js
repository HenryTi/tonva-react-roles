var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { LocalMap } from './localDb';
var testingTags = ['/test', '/test/', '-test', '-test/'];
function isTesting() {
    var pathname = document.location.pathname;
    var pn = pathname.toLowerCase();
    for (var _i = 0, testingTags_1 = testingTags; _i < testingTags_1.length; _i++) {
        var item = testingTags_1[_i];
        if (pn.endsWith(item) === true)
            return true;
    }
    return false;
}
export var env = (function () {
    var testing = isTesting();
    var localDb = new LocalMap(testing === true ? '$$' : '$');
    return {
        testing: testing,
        isDevelopment: process.env.NODE_ENV === 'development',
        localDb: localDb,
        setTimeout: function (tag, callback, ms) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            //if (tag !== undefined) console.log('setTimeout ' + tag);
            return global.setTimeout.apply(global, __spreadArrays([callback, ms], args));
        },
        clearTimeout: function (handle) {
            global.clearTimeout(handle);
        },
        setInterval: function (callback, ms) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return global.setInterval.apply(global, __spreadArrays([callback, ms], args));
        },
        clearInterval: function (handle) {
            global.clearInterval(handle);
        }
    };
}());
//# sourceMappingURL=env.js.map