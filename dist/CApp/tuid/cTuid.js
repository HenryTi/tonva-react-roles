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
import _ from 'lodash';
import { CEntity } from '../CVEntity';
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
//import { CLink } from '../link';
import { VTuidInfo } from './vTuidInfo';
import { TuidPageItems } from './pageItems';
import { VTuidList } from './vTuidList';
var CTuid = /** @class */ (function (_super) {
    __extends(CTuid, _super);
    function CTuid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuid.prototype.buildPageItems = function () {
        return new TuidPageItems(this.entity);
    };
    CTuid.prototype.searchMain = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.PageItems === undefined) {
                            this.PageItems = this.buildPageItems();
                        }
                        if (!(key !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.PageItems.first(key)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CTuid.prototype.getDivItems = function (ownerId) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.searchArr(ownerId, undefined, 0, 1000)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return CTuid;
}(CEntity));
export { CTuid };
var CTuidBase = /** @class */ (function (_super) {
    __extends(CTuidBase, _super);
    function CTuidBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    constructor(cUq: CUq, entity:Tuid, ui: TuidUI, res:any) {
        super(cUq, entity, ui, res);
    }*/
    CTuidBase.prototype.from = function () {
        var ret = this; // this.entity.cFrom();
        if (ret === undefined)
            return this;
        return ret;
    };
    CTuidBase.prototype.cUqFrom = function () {
        return this.cUq; // this.entity.cUqFrom();
    };
    CTuidBase.prototype.cEditFrom = function () {
        var cUq = this.cUq; // this.entity.cUqFrom();
        return cUq.cTuidEditFromName(this.entity.name);
    };
    CTuidBase.prototype.cInfoFrom = function () {
        var cUq = this.cUq; // this.entity.cUqFrom();
        return cUq.cTuidInfoFromName(this.entity.name);
    };
    CTuidBase.prototype.cSelectFrom = function () {
        var cUq = this.cUq; // this.entity.cUqFrom();
        return cUq.cTuidSelectFromName(this.entity.name);
    };
    CTuidBase.prototype.getLable = function (tuid) {
        if (tuid === this.entity)
            return this.label;
        var name = tuid.name;
        var arrs = this.res.arrs;
        if (arrs !== undefined) {
            var arr = arrs[name];
            if (arr !== undefined) {
                var label = arr.label;
                if (label !== undefined)
                    return label;
            }
        }
        return name;
    };
    Object.defineProperty(CTuidBase.prototype, "VTuidMain", {
        get: function () { return VTuidMain; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTuidBase.prototype, "VTuidEdit", {
        get: function () { return VTuidEdit; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTuidBase.prototype, "VTuidList", {
        get: function () { return VTuidList; },
        enumerable: true,
        configurable: true
    });
    CTuidBase.prototype.internalStart = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isImport = this.entity.isImport;
                        return [4 /*yield*/, this.openVPage(this.VTuidMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onEvent = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cTuidInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type;
                        switch (_a) {
                            case 'new': return [3 /*break*/, 2];
                            case 'list': return [3 /*break*/, 4];
                            case 'edit': return [3 /*break*/, 6];
                            case 'item-changed': return [3 /*break*/, 8];
                            case 'info': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 1];
                    case 1: return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.onNew()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 4: return [4 /*yield*/, this.onList()];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 6: return [4 /*yield*/, this.onEdit(value)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                    case 8:
                        this.itemChanged(value);
                        return [2 /*return*/];
                    case 9:
                        cTuidInfo = new CTuidInfo(this.cUq, this.entity, this.ui, this.res);
                        return [4 /*yield*/, cTuidInfo.start(value)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.edit = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var cTuidEdit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cTuidEdit = this.ui && this.ui.CTuidEdit;
                        if (!(cTuidEdit === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.openVPage(this.VTuidEdit, values)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (new cTuidEdit(this.cUq, this.entity, this.ui, this.res)).start(values)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onNew = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.edit(undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cTuidList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cTuidList = this.ui && this.ui.CTuidList;
                        if (!(cTuidList === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.openVPage(this.VTuidList, undefined)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (new cTuidList(this.cUq, this.entity, this.ui, this.res)).start(undefined)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onEdit = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = undefined;
                        if (!(id !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.entity.load(id)];
                    case 1:
                        values = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.edit(values);
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.itemChanged = function (_a) {
        var id = _a.id, values = _a.values;
        if (this.PageItems === undefined)
            return;
        var items = this.PageItems.items;
        var item = items.find(function (v) { return v.id === id; });
        if (item !== undefined) {
            _.merge(item, values);
        }
    };
    return CTuidBase;
}(CTuid));
export { CTuidBase };
var CTuidMain = /** @class */ (function (_super) {
    __extends(CTuidMain, _super);
    function CTuidMain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidMain.prototype.internalStart = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isImport = this.entity.isImport;
                        return [4 /*yield*/, this.openVPage(this.VTuidMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidMain;
}(CTuidBase));
export { CTuidMain };
var CTuidEdit = /** @class */ (function (_super) {
    __extends(CTuidEdit, _super);
    function CTuidEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidEdit.prototype.internalStart = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isImport = this.entity.isImport;
                        if (!(typeof (id) === 'number')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onEdit(id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.edit(id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CTuidEdit.prototype.edit = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VTuidEdit, values)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidEdit;
}(CTuidBase));
export { CTuidEdit };
var CTuidList = /** @class */ (function (_super) {
    __extends(CTuidList, _super);
    function CTuidList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidList.prototype.internalStart = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isImport = this.entity.isImport;
                        return [4 /*yield*/, this.openVPage(this.VTuidList)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidList;
}(CTuidBase));
export { CTuidList };
var CTuidDiv = /** @class */ (function (_super) {
    __extends(CTuidDiv, _super);
    function CTuidDiv() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidDiv.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                alert('tuid div: ??');
                return [2 /*return*/];
            });
        });
    };
    return CTuidDiv;
}(CTuid));
export { CTuidDiv };
var CTuidSelect = /** @class */ (function (_super) {
    __extends(CTuidSelect, _super);
    function CTuidSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidSelect.prototype.internalStart = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VTuidSelect, param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidSelect.prototype.beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //if (await super.beforeStart() === false) return false;
                    return [4 /*yield*/, this.entity.loadSchema()];
                    case 1:
                        //if (await super.beforeStart() === false) return false;
                        _a.sent();
                        if (this.PageItems !== undefined)
                            this.PageItems.reset();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Object.defineProperty(CTuidSelect.prototype, "VTuidSelect", {
        get: function () { return VTuidSelect; },
        enumerable: true,
        configurable: true
    });
    CTuidSelect.prototype.idFromItem = function (item) {
        return item.id;
    };
    return CTuidSelect;
}(CTuid));
export { CTuidSelect };
var CTuidInfo = /** @class */ (function (_super) {
    __extends(CTuidInfo, _super);
    function CTuidInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidInfo.prototype.internalStart = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.load(id)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.openVPage(this.VTuidInfo, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CTuidInfo.prototype, "VTuidInfo", {
        get: function () { return VTuidInfo; },
        enumerable: true,
        configurable: true
    });
    return CTuidInfo;
}(CTuid));
export { CTuidInfo };
//# sourceMappingURL=cTuid.js.map