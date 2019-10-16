var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { env } from '../tool';
import { UqMan } from './uqMan';
var UQsMan = /** @class */ (function () {
    function UQsMan(tonvaAppName, tvs) {
        this.tvs = tvs || {};
        this.buildTVs();
        this.collection = {};
        var parts = tonvaAppName.split('/');
        if (parts.length !== 2) {
            throw new Error('tonvaApp name must be / separated, owner/app');
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.localMap = env.localDb.map(tonvaAppName);
        this.localData = this.localMap.child('uqData');
    }
    // to be removed in the future
    UQsMan.prototype.addUq = function (uq) {
        this.collection[uq.name] = uq;
    };
    UQsMan.prototype.buildTVs = function () {
        for (var i in this.tvs) {
            var uqTVs = this.tvs[i];
            if (uqTVs === undefined)
                continue;
            var l = i.toLowerCase();
            if (l === i)
                continue;
            this.tvs[l] = uqTVs;
            for (var j in uqTVs) {
                var en = uqTVs[j];
                if (en === undefined)
                    continue;
                var lj = j.toLowerCase();
                if (lj === j)
                    continue;
                uqTVs[lj] = en;
            }
        }
    };
    UQsMan.prototype.init = function (uqsData) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseInits, _i, uqsData_1, uqData, uqOwner, uqName, uqFullName, uq, lower;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promiseInits = [];
                        for (_i = 0, uqsData_1 = uqsData; _i < uqsData_1.length; _i++) {
                            uqData = uqsData_1[_i];
                            uqOwner = uqData.uqOwner, uqName = uqData.uqName;
                            uqFullName = uqOwner + '/' + uqName;
                            uq = new UqMan(this, uqData, undefined, this.tvs[uqFullName] || this.tvs[uqName]);
                            this.collection[uqFullName] = uq;
                            lower = uqFullName.toLowerCase();
                            if (lower !== uqFullName) {
                                this.collection[lower] = uq;
                            }
                            promiseInits.push(uq.init());
                        }
                        return [4 /*yield*/, Promise.all(promiseInits)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UQsMan.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var retErrors, promises, i, uq, results, _i, results_1, result, retError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retErrors = [];
                        promises = [];
                        for (i in this.collection) {
                            uq = this.collection[i];
                            promises.push(uq.loadEntities());
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                            result = results_1[_i];
                            retError = result;
                            if (retError !== undefined) {
                                retErrors.push(retError);
                                continue;
                            }
                        }
                        return [2 /*return*/, retErrors];
                }
            });
        });
    };
    UQsMan.prototype.buildUQs = function () {
        var uqs = {};
        for (var i in this.collection) {
            var uqMan = this.collection[i];
            //let n = uqMan.name;
            var uqName = uqMan.uqName;
            var l = uqName.toLowerCase();
            var entities = uqMan.entities;
            var keys = Object.keys(entities);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var entity = entities[key];
                var name_1 = entity.name, sName = entity.sName;
                if (name_1 !== sName)
                    entities[sName] = entity;
            }
            uqs[i] = entities;
            uqs[uqName] = entities;
            if (l !== uqName)
                uqs[l] = entities;
        }
        return uqs;
    };
    UQsMan.prototype.setTuidImportsLocal = function () {
        var ret = [];
        for (var i in this.collection) {
            var uq = this.collection[i];
            for (var _i = 0, _a = uq.tuidArr; _i < _a.length; _i++) {
                var tuid = _a[_i];
                if (tuid.isImport === true) {
                    var error = this.setInner(tuid);
                    if (error)
                        ret.push(error);
                }
            }
        }
        return ret;
    };
    UQsMan.prototype.setInner = function (tuidImport) {
        var from = tuidImport.from;
        var fromName = from.owner + '/' + from.uq;
        var uq = this.collection[fromName];
        if (uq === undefined) {
            //debugger;
            return "setInner(tuidImport: TuidImport): uq " + fromName + " is not loaded";
        }
        var iName = tuidImport.name;
        var tuid = uq.tuid(iName);
        if (tuid === undefined) {
            //debugger;
            return "setInner(tuidImport: TuidImport): uq " + fromName + " has no Tuid " + iName;
        }
        if (tuid.isImport === true) {
            //debugger;
            return "setInner(tuidImport: TuidImport): uq " + fromName + " Tuid " + iName + " is import";
        }
        tuidImport.setFrom(tuid);
    };
    return UQsMan;
}());
export { UQsMan };
//# sourceMappingURL=uqsMan.js.map