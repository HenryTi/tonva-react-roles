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
var subAppWindow;
function postWsToSubApp(msg) {
    if (subAppWindow === undefined)
        return;
    subAppWindow.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
export function setSubAppWindow(win) {
    subAppWindow = win;
}
export function postWsToTop(msg) {
    window.top.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
var WsBase = /** @class */ (function () {
    function WsBase() {
        this.handlerSeed = 1;
        this.anyHandlers = {};
        this.msgHandlers = {};
    }
    WsBase.prototype.onWsReceiveAny = function (handler) {
        var seed = this.handlerSeed++;
        this.anyHandlers[seed] = handler;
        return seed;
    };
    WsBase.prototype.onWsReceive = function (type, handler) {
        var seed = this.handlerSeed++;
        this.msgHandlers[seed] = { type: type, handler: handler };
        return seed;
    };
    WsBase.prototype.endWsReceive = function (handlerId) {
        delete this.anyHandlers[handlerId];
        delete this.msgHandlers[handlerId];
    };
    WsBase.prototype.receive = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var $type, _a, _b, _i, i, _c, _d, _e, i, _f, type, handler;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        $type = msg.$type;
                        _a = [];
                        for (_b in this.anyHandlers)
                            _a.push(_b);
                        _i = 0;
                        _g.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        return [4 /*yield*/, this.anyHandlers[i](msg)];
                    case 2:
                        _g.sent();
                        _g.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _c = [];
                        for (_d in this.msgHandlers)
                            _c.push(_d);
                        _e = 0;
                        _g.label = 5;
                    case 5:
                        if (!(_e < _c.length)) return [3 /*break*/, 8];
                        i = _c[_e];
                        _f = this.msgHandlers[i], type = _f.type, handler = _f.handler;
                        if (type !== $type)
                            return [3 /*break*/, 7];
                        return [4 /*yield*/, handler(msg)];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        _e++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return WsBase;
}());
export { WsBase };
var wsBaseSeed = 1;
var WsBridge = /** @class */ (function (_super) {
    __extends(WsBridge, _super);
    function WsBridge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wsBaseId = 'WsBridge seed ' + wsBaseSeed++;
        return _this;
    }
    return WsBridge;
}(WsBase));
export { WsBridge };
export var wsBridge = new WsBridge();
var WSChannel = /** @class */ (function (_super) {
    __extends(WSChannel, _super);
    function WSChannel(wsHost, token) {
        var _this = _super.call(this) || this;
        _this.wsBaseId = 'WSChannel seed ' + wsBaseSeed++;
        _this.wsHost = wsHost;
        _this.token = token;
        return _this;
    }
    WSChannel.setCenterToken = function (token) {
        WSChannel.centerToken = token;
    };
    WSChannel.prototype.connect = function () {
        var _this = this;
        //this.wsHost = wsHost;
        //this.token = token || WSChannel.centerToken;
        if (this.ws !== undefined)
            return;
        var that = this;
        return new Promise(function (resolve, reject) {
            var ws = new WebSocket(_this.wsHost, _this.token || WSChannel.centerToken);
            console.log('connect webSocket %s', _this.wsHost);
            ws.onopen = function (ev) {
                console.log('webSocket connected %s', _this.wsHost);
                that.ws = ws;
                resolve();
            };
            ws.onerror = function (ev) {
                reject('webSocket can\'t open!');
            };
            ws.onmessage = function (msg) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, that.wsMessage(msg)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            ws.onclose = function (ev) {
                that.ws = undefined;
                console.log('webSocket closed!');
            };
        });
    };
    WSChannel.prototype.close = function () {
        if (this.ws !== undefined) {
            this.ws.close();
            this.ws = undefined;
        }
    };
    WSChannel.prototype.wsMessage = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('websocket message: %s', event.data);
                        msg = JSON.parse(event.data);
                        postWsToSubApp(msg);
                        return [4 /*yield*/, this.receive(msg)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log('ws msg error: ', err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WSChannel.prototype.sendWs = function (msg) {
        var netThis = this;
        this.connect().then(function () {
            netThis.ws.send(msg);
        });
    };
    return WSChannel;
}(WsBase));
export { WSChannel };
//# sourceMappingURL=wsChannel.js.map