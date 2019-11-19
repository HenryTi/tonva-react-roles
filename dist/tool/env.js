import { LocalMap } from './localDb';
const testingTags = ['/test', '/test/', '-test', '-test/'];
function isTesting() {
    let { pathname } = document.location;
    let pn = pathname.toLowerCase();
    for (let item of testingTags) {
        if (pn.endsWith(item) === true)
            return true;
    }
    return false;
}
export const env = (function () {
    let testing = isTesting();
    let localDb = new LocalMap(testing === true ? '$$' : '$');
    return {
        testing: testing,
        isDevelopment: process.env.NODE_ENV === 'development',
        localDb: localDb,
        setTimeout: (tag, callback, ms, ...args) => {
            //if (tag !== undefined) console.log('setTimeout ' + tag);
            return global.setTimeout(callback, ms, ...args);
        },
        clearTimeout: (handle) => {
            global.clearTimeout(handle);
        },
        setInterval: (callback, ms, ...args) => {
            return global.setInterval(callback, ms, ...args);
        },
        clearInterval: (handle) => {
            global.clearInterval(handle);
        }
    };
}());
//# sourceMappingURL=env.js.map