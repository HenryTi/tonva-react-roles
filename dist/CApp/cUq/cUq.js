var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
//import _ from 'lodash';
import { Controller, resLang } from '../../components';
import { PureJSONContent } from '../tools';
import { UqMan } from '../../uq';
import { CLink } from '../link';
import { CBook } from '../book';
import { CSheet } from '../sheet';
import { CAction } from '../action';
import { CQuery, CQuerySelect } from '../query';
import { CTuidMain, CTuidInfo, CTuidSelect, CTuidEdit, CTuidList } from '../tuid';
import { CMap } from '../map';
import { VUq } from './vUq';
import { CHistory } from '../history';
import { CPending } from '../pending';
import { TuidWithUIRes, ReactBoxId } from './reactBoxId';
function lowerPropertyName(entities) {
    if (entities === undefined)
        return;
    for (var i in entities)
        entities[i.toLowerCase()] = entities[i];
}
var CUq = /** @class */ (function (_super) {
    __extends(CUq, _super); /* implements Uq*/
    //constructor(cApp:CApp, uq:string, appId:number, uqId:number, access:string, ui:UqUI) {
    function CUq(cApp, uqData, ui) {
        var _this = _super.call(this, resLang(ui.res)) || this;
        _this.tuidURs = {};
        _this.createBoxId = function (tuid, id) {
            var name = tuid.name;
            var tuidUR = _this.tuidURs[name];
            if (tuidUR === undefined) {
                var _a = _this.getUI(tuid), ui = _a.ui, res = _a.res;
                _this.tuidURs[name] = tuidUR = new TuidWithUIRes(tuid, ui, res);
            }
            return new ReactBoxId(tuidUR, id);
        };
        _this.isSysVisible = false;
        _this.cApp = cApp;
        //this.id = uqId;
        // 每一个ui都转换成小写的key的版本
        lowerPropertyName(ui.tuid);
        lowerPropertyName(ui.sheet);
        lowerPropertyName(ui.map);
        lowerPropertyName(ui.query);
        lowerPropertyName(ui.action);
        lowerPropertyName(ui.book);
        lowerPropertyName(ui.history);
        lowerPropertyName(ui.pending);
        _this.ui = ui;
        _this.CTuidMain = ui.CTuidMain || CTuidMain;
        _this.CTuidEdit = ui.CTuidEdit || CTuidEdit;
        _this.CTuidList = ui.CTuidList || CTuidList;
        _this.CTuidSelect = ui.CTuidSelect || CTuidSelect;
        _this.CTuidInfo = ui.CTuidInfo || CTuidInfo;
        _this.CQuery = ui.CQuery || CQuery;
        _this.CQuerySelect = ui.CQuerySelect || CQuerySelect;
        _this.CMap = ui.CMap || CMap;
        _this.CAction = ui.CAction || CAction;
        _this.CSheet = ui.CSheet || CSheet;
        _this.CBook = ui.CBook || CBook;
        _this.CHistory = ui.CHistory || CHistory;
        _this.CPending = ui.CPending || CPending;
        _this.uq = new UqMan(cApp.uqs, uqData, _this.createBoxId, undefined);
        return _this;
    }
    CUq.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CUq.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uq.init()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CUq.prototype.loadEntities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.uq.loadEntities()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CUq.prototype.getQuerySearch = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var query, returns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.uq.query(name);
                        if (!(query === undefined)) return [3 /*break*/, 1];
                        alert("QUERY " + name + " \u6CA1\u6709\u5B9A\u4E49!");
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, query.loadSchema()];
                    case 2:
                        _a.sent();
                        returns = query.returns;
                        if (returns.length > 1) {
                            alert("QUERY " + name + " \u8FD4\u56DE\u591A\u5F20\u8868, \u65E0\u6CD5\u505AQuerySearch");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, query];
                }
            });
        });
    };
    CUq.prototype.getTuidPlaceHolder = function (tuid) {
        var _a = this.res, tuidPlaceHolder = _a.tuidPlaceHolder, entity = _a.entity;
        var name = tuid.name;
        //let type:string;
        if (entity !== undefined) {
            var en = entity[name];
            if (en !== undefined) {
                //type = en.label;
            }
        }
        return (tuidPlaceHolder || 'Select');
    };
    CUq.prototype.getNone = function () {
        var none = this.res.none;
        return none || 'none';
    };
    CUq.prototype.isVisible = function (entity) {
        return entity.sys !== true || this.isSysVisible;
    };
    CUq.prototype.navSheet = function (sheetTypeId, sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var sheet, cSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sheet = this.uq.sheetFromTypeId(sheetTypeId);
                        if (sheet === undefined) {
                            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
                            return [2 /*return*/];
                        }
                        cSheet = this.cSheet(sheet);
                        return [4 /*yield*/, cSheet.startSheet(sheetId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CUq.prototype.sheet = function (entityName) { return this.uq.sheet(entityName); };
    CUq.prototype.action = function (entityName) { return this.uq.action(entityName); };
    CUq.prototype.query = function (entityName) { return this.uq.query(entityName); };
    CUq.prototype.book = function (entityName) { return this.uq.book(entityName); };
    CUq.prototype.map = function (entityName) { return this.uq.map(entityName); };
    CUq.prototype.history = function (entityName) { return this.uq.history(entityName); };
    CUq.prototype.pending = function (entityName) { return this.uq.pending(entityName); };
    CUq.prototype.tuid = function (entityName) { return this.uq.tuid(entityName); };
    CUq.prototype.tuidDiv = function (entityName, divName) {
        return this.uq.tuidDiv(entityName, divName);
    };
    CUq.prototype.cSheetFromName = function (entityName) {
        var entity = this.uq.sheet(entityName);
        if (entity !== undefined)
            return this.cSheet(entity);
    };
    CUq.prototype.cActionFromName = function (entityName) {
        var entity = this.uq.action(entityName);
        if (entity !== undefined)
            return this.cAction(entity);
    };
    CUq.prototype.cQueryFromName = function (entityName) {
        var entity = this.uq.query(entityName);
        if (entity !== undefined)
            return this.cQuery(entity);
    };
    CUq.prototype.cBookFromName = function (entityName) {
        var entity = this.uq.book(entityName);
        if (entity !== undefined)
            return this.cBook(entity);
    };
    CUq.prototype.cMapFromName = function (entityName) {
        var entity = this.uq.map(entityName);
        if (entity !== undefined)
            return this.cMap(entity);
    };
    CUq.prototype.cHistoryFromName = function (entityName) {
        var entity = this.uq.history(entityName);
        if (entity !== undefined)
            return this.cHistory(entity);
    };
    CUq.prototype.cPendingFromName = function (entityName) {
        var entity = this.uq.pending(entityName);
        if (entity !== undefined)
            return this.cPending(entity);
    };
    CUq.prototype.cTuidMainFromName = function (entityName) {
        var entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidMain(entity);
    };
    CUq.prototype.cTuidEditFromName = function (entityName) {
        var entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidEdit(entity);
    };
    CUq.prototype.cTuidInfoFromName = function (entityName) {
        var entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidInfo(entity);
    };
    CUq.prototype.cTuidSelectFromName = function (entityName) {
        var entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidSelect(entity);
    };
    CUq.prototype.cFromName = function (entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                var sheet = this.uq.sheet(entityName);
                if (sheet === undefined)
                    return;
                return this.cSheet(sheet);
            case 'action':
                var action = this.uq.action(entityName);
                if (action === undefined)
                    return;
                return this.cAction(action);
            case 'tuid':
                var tuid = this.uq.tuid(entityName);
                if (tuid === undefined)
                    return;
                return this.cTuidMain(tuid);
            case 'query':
                var query = this.uq.query(entityName);
                if (query === undefined)
                    return;
                return this.cQuery(query);
            case 'book':
                var book = this.uq.book(entityName);
                if (book === undefined)
                    return;
                return this.cBook(book);
            case 'map':
                var map = this.uq.map(entityName);
                if (map === undefined)
                    return;
                return this.cMap(map);
            case 'history':
                var history_1 = this.uq.history(entityName);
                if (history_1 === undefined)
                    return;
                return this.cHistory(history_1);
            case 'pending':
                var pending = this.uq.pending(entityName);
                if (pending === undefined)
                    return;
                return this.cPending(pending);
        }
    };
    CUq.prototype.linkFromName = function (entityType, entityName) {
        return this.link(this.cFromName(entityType, entityName));
    };
    CUq.prototype.getUI = function (t) {
        var ui, res;
        var name = t.name, typeName = t.typeName;
        if (this.ui !== undefined) {
            if (typeName === 'div') {
                var tuidDiv = t;
                var ownerTuid = tuidDiv.owner;
                var tUIs = this.ui[ownerTuid.typeName];
                if (tUIs) {
                    var tUI = tUIs[ownerTuid.name];
                    if (tUI) {
                        var divs = tUI.divs;
                        if (divs) {
                            ui = divs[name];
                        }
                    }
                }
            }
            else {
                var tUI = this.ui[typeName];
                if (tUI !== undefined) {
                    ui = tUI[name];
                }
            }
        }
        var entity = this.res.entity;
        if (entity !== undefined) {
            res = entity[name];
        }
        return { ui: ui || {}, res: res || {} };
    };
    CUq.prototype.link = function (cEntity) {
        return new CLink(cEntity);
    };
    Object.defineProperty(CUq.prototype, "tuidLinks", {
        get: function () {
            var _this = this;
            return this.uq.tuidArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) { return _this.link(_this.cTuidMain(v)); });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.cTuidMain = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CTuidMain) || this.CTuidMain)(this, tuid, ui, res);
    };
    CUq.prototype.cTuidEdit = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CTuidEdit) || this.CTuidEdit)(this, tuid, ui, res);
    };
    CUq.prototype.cTuidList = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CTuidList) || this.CTuidList)(this, tuid, ui, res);
    };
    CUq.prototype.cTuidSelect = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CTuidSelect) || this.CTuidSelect)(this, tuid, ui, res);
    };
    CUq.prototype.cTuidInfo = function (tuid) {
        var _a = this.getUI(tuid), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CTuidInfo) || this.CTuidInfo)(this, tuid, ui, res);
    };
    CUq.prototype.cSheet = function (sheet /*, sheetUI?:SheetUI, sheetRes?:any*/) {
        var _a = this.getUI(sheet), ui = _a.ui, res = _a.res;
        //if (sheetUI !== undefined) ui = sheetUI;
        //if (sheetRes !== undefined) res = sheetRes;
        //return new (ui && ui.CSheet || this.CSheet)(this, sheet, sheetUI, sheetRes);
        return new ((ui && ui.CSheet) || this.CSheet)(this, sheet, ui, res);
    };
    Object.defineProperty(CUq.prototype, "sheetLinks", {
        get: function () {
            var _this = this;
            return this.uq.sheetArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cSheet(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.cAction = function (action) {
        var _a = this.getUI(action), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CAction) || this.CAction)(this, action, ui, res);
    };
    Object.defineProperty(CUq.prototype, "actionLinks", {
        get: function () {
            var _this = this;
            return this.uq.actionArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cAction(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.cQuery = function (query) {
        var _a = this.getUI(query), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CQuery) || this.CQuery)(this, query, ui, res);
    };
    CUq.prototype.cQuerySelect = function (queryName) {
        var query = this.uq.query(queryName);
        if (query === undefined)
            return;
        var _a = this.getUI(query), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CQuerySelect) || this.CQuerySelect)(this, query, ui, res);
    };
    Object.defineProperty(CUq.prototype, "queryLinks", {
        get: function () {
            var _this = this;
            return this.uq.queryArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cQuery(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.cBook = function (book) {
        var _a = this.getUI(book), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CBook) || this.CBook)(this, book, ui, res);
    };
    Object.defineProperty(CUq.prototype, "bookLinks", {
        get: function () {
            var _this = this;
            return this.uq.bookArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cBook(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.cHistory = function (history) {
        var _a = this.getUI(history), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CHistory) || this.CHistory)(this, history, ui, res);
    };
    Object.defineProperty(CUq.prototype, "historyLinks", {
        get: function () {
            var _this = this;
            return this.uq.historyArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cHistory(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.cPending = function (pending) {
        var _a = this.getUI(pending), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CPending) || this.CPending)(this, pending, ui, res);
    };
    Object.defineProperty(CUq.prototype, "pendingLinks", {
        get: function () {
            var _this = this;
            return this.uq.pendingArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cPending(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.cMap = function (map) {
        var _a = this.getUI(map), ui = _a.ui, res = _a.res;
        return new ((ui && ui.CMap) || this.CMap)(this, map, ui, res);
    };
    Object.defineProperty(CUq.prototype, "mapLinks", {
        get: function () {
            var _this = this;
            return this.uq.mapArr.filter(function (v) { return _this.isVisible(v); }).map(function (v) {
                return _this.link(_this.cMap(v));
            });
        },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.getTuidContent = function (tuid) {
        var ui = this.getUI(tuid).ui;
        return (ui && ui.content) || PureJSONContent;
    };
    CUq.prototype.getTuidDivContent = function (tuidDiv) {
        var owner = tuidDiv.owner;
        var ui = this.getUI(owner).ui;
        return (ui && ui.divs && ui.divs[tuidDiv.name].content) || PureJSONContent;
    };
    CUq.prototype.showTuid = function (tuid, id) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = this.cTuidInfo(tuid);
                        return [4 /*yield*/, c.start(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CUq.prototype.showTuidDiv = function (tuid, id) {
        return __awaiter(this, void 0, void 0, function () {
            var owner, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        owner = tuid.owner;
                        c = this.cTuidInfo(owner);
                        return [4 /*yield*/, c.start(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CUq.prototype, "VUq", {
        get: function () { return VUq; },
        enumerable: true,
        configurable: true
    });
    CUq.prototype.render = function () {
        var v = new (this.VUq)(this);
        return v.render();
    };
    return CUq;
}(Controller /* implements Uq*/));
export { CUq };
//# sourceMappingURL=cUq.js.map