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
import * as React from 'react';
import { observer } from 'mobx-react';
import { PureJSONContent } from '../tools';
var TuidWithUIRes = /** @class */ (function () {
    function TuidWithUIRes(tuid, ui, res) {
        this.tuid = tuid;
        this.ui = ui;
        this.res = res;
    }
    return TuidWithUIRes;
}());
export { TuidWithUIRes };
var ReactBoxId = /** @class */ (function () {
    function ReactBoxId(tuidUR, id) {
        this.tuidUR = tuidUR;
        this.id = id;
        this.isUndefined = (this.tuidUR.tuid === undefined);
    }
    Object.defineProperty(ReactBoxId.prototype, "obj", {
        get: function () {
            return this.tuidUR.tuid.valueFromId(this.id);
        },
        enumerable: true,
        configurable: true
    });
    ReactBoxId.prototype.render = function (ui, x) {
        if (this.id === undefined || this.id === null)
            return;
        var boxName = this.boxName; // this.tuid.name;
        var val = this.obj; // this.tuid.valueFromId(this.id);
        if (this.isUndefined === true) {
            if (ui !== undefined)
                return ui(val, x);
            return PureJSONContent(val, x);
        }
        switch (typeof val) {
            case 'undefined':
                return React.createElement("del", { className: "text-black-50" },
                    boxName,
                    " undefined");
            case 'number':
                return React.createElement("del", { className: "text-black-50" },
                    boxName,
                    " ",
                    this.id);
        }
        if (ui === undefined) {
            ui = this.tuidUR.ui;
        }
        if (ui !== undefined) {
            if (typeof ui !== 'function') {
                ui = ui.content;
            }
            if (ui !== undefined) {
                var ret = ui(val, this.tuidUR.res);
                if (ret !== undefined)
                    return ret;
                return React.createElement("del", { className: "text-danger" },
                    boxName,
                    " ",
                    this.id);
            }
        }
        return PureJSONContent(val);
    };
    Object.defineProperty(ReactBoxId.prototype, "boxName", {
        get: function () { return this.tuidUR.tuid.name; },
        enumerable: true,
        configurable: true
    });
    // ui(): TvTemplet {return this.tuid.ui}
    // res(): any {return this.tuid.res}
    ReactBoxId.prototype.assure = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tuidUR.tuid.assureBox(this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReactBoxId;
}());
export { ReactBoxId };
function boxIdContent(bi, ui, x) {
    var logContent;
    var boxId = bi;
    switch (typeof bi) {
        case 'undefined':
            logContent = React.createElement(React.Fragment, null, "boxId undefined");
            break;
        case 'number':
            logContent = React.createElement(React.Fragment, null,
                "id:",
                bi);
            break;
        default:
            if (typeof boxId.render !== 'function') {
                if (ui === undefined) {
                    logContent = PureJSONContent(bi, x);
                }
                else {
                    return ui(bi, x);
                }
            }
            break;
    }
    if (logContent !== undefined) {
        return React.createElement("del", { className: "text-danger" }, logContent);
    }
    return boxId.render(ui, x);
}
var Tv = observer(function (_a) {
    var tuidValue = _a.tuidValue, ui = _a.ui, x = _a.x, nullUI = _a.nullUI;
    if (tuidValue === undefined) {
        if (nullUI === undefined)
            return React.createElement(React.Fragment, null, "[undefined]");
        return nullUI();
    }
    if (tuidValue === null) {
        if (nullUI === undefined)
            return React.createElement(React.Fragment, null, "[null]");
        return nullUI();
    }
    var ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return React.createElement(React.Fragment, null,
                    ttv,
                    "-",
                    tuidValue);
            else {
                var ret = ui(tuidValue, x);
                if (ret !== undefined)
                    return ret;
                return React.createElement(React.Fragment, null, tuidValue);
            }
        case 'object':
            var divObj = boxIdContent(tuidValue, ui, x);
            if (divObj !== undefined)
                return divObj;
            return nullUI === undefined ? React.createElement(React.Fragment, null, "id null") : nullUI();
        case 'number':
            return React.createElement(React.Fragment, null,
                "id...",
                tuidValue);
    }
});
export var tv = function (tuidValue, ui, x, nullUI) {
    return React.createElement(Tv, { tuidValue: tuidValue, ui: ui, x: x, nullUI: nullUI });
};
/*
class BoxDivId extends BoxId {
    private div: TuidDiv;
    constructor(tuid: Tuid, div: TuidDiv, id: number) {
        super(tuid, id);
        this.div = div;
    }
    get obj():any {
        return this.div.valueFromId(this.id);
    }
    boxName():string {return this.div.name}
    isUndefined(): boolean {return this.div === undefined}
    ui(): TvTemplet {return this.div.ui}
    res(): any {return this.div.res}

    async assure(): Promise<void> {
        await this.div.assureBox(this.id);
    }
}
*/
//# sourceMappingURL=reactBoxId.js.map