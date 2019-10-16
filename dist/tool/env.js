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
    };
}());
//# sourceMappingURL=env.js.map