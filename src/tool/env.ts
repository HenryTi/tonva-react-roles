import { LocalMap } from './localDb';

const testingTags:string[] = ['/test', '/test/', '-test', '-test/'];
function isTesting():boolean {
    let {pathname} = document.location;
    let pn = pathname.toLowerCase();
    for (let item of testingTags) {
        if (pn.endsWith(item) === true) return true;
    }
    return false;
}

export const env = (function () {
    let testing = isTesting();
    let localDb = new LocalMap(testing===true? '$$':'$');
    return {
        testing: testing,
        isDevelopment: process.env.NODE_ENV === 'development',
        localDb: localDb,
        setTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]):NodeJS.Timer => {
            console.log('setTimeout');
            return setTimeout(callback, ms, ...args);
        },
        clearTimeout: (handle:NodeJS.Timer):void => {
            console.log('clearTimeout');
            clearTimeout(handle);
        },
        setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer => {
            console.log('setInterval');
            return setInterval(callback, ms, ...args);
        },
        clearInterval: (handle:NodeJS.Timer):void => {
            console.log('clearInterval');
            clearInterval(handle);
        }
    }
}());
