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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { SearchBox, List, Page } from '../../components';
import { VEntity } from '../CVEntity';
import { RowContent } from '../form/viewModel';
var VTuidListBase = /** @class */ (function (_super) {
    __extends(VTuidListBase, _super);
    function VTuidListBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSearch = function (key) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.searchMain(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderRow = function (item, index) { return React.createElement(_this.rowContent, __assign({}, item)); };
        _this.clickRow = function (item) {
            _this.callOnSelected(item);
        };
        _this.rowKey = function (item) {
            var id = item.id;
            return id;
        };
        _this.view = observer(function () {
            var header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: _this.onSearch, placeholder: '搜索' + _this.label });
            /*
            let {owner} = this.entity;
            let ownerTop;
            if (owner !== undefined) {
                let ownerObj = owner.valueFromId(this.ownerId);
                ownerTop = <div>owner: {jsonStringify(ownerObj)}</div>;
            }
            */
            return React.createElement(Page, { header: header },
                React.createElement(List, { items: _this.controller.PageItems.items, item: { render: _this.renderRow, onClick: _this.clickRow, key: _this.rowKey }, before: '搜索' + _this.label + '资料' }));
        });
        return _this;
    }
    VTuidListBase.prototype.open = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rowContent = this.ui.rowContent || RowContent;
                        //if (this.entity.owner !== undefined) 
                        this.ownerId = Number(param);
                        // 初始查询, key是空的
                        //await this.onSearch('');
                        return [4 /*yield*/, this.controller.searchMain('')];
                    case 1:
                        // 初始查询, key是空的
                        //await this.onSearch('');
                        _a.sent();
                        this.openPage(this.view);
                        return [2 /*return*/];
                }
            });
        });
    };
    VTuidListBase.prototype.callOnSelected = function (item) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    };
    return VTuidListBase;
}(VEntity));
export { VTuidListBase };
var VTuidList = /** @class */ (function (_super) {
    __extends(VTuidList, _super);
    function VTuidList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VTuidList.prototype.onSelected = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.controller.isImport === false)
                    this.event('edit', item.id);
                else
                    this.event('info', item.id);
                return [2 /*return*/];
            });
        });
    };
    return VTuidList;
}(VTuidListBase));
export { VTuidList };
/*
export abstract class VTuidDivListBase  extends VPage<CTuidDiv> {
    protected ownerId: number;

    async open(param?:any) {
        //this.PageItems = new TuidPageItems(this.entity);
        if (this.entity.owner !== undefined) this.ownerId = Number(param);
        // 初始查询, key是空的
        //await this.onSearch('');
        await this.controller.searchMain('');
        this.openPage(this.view);
    }

    onSearch = async (key:string) => {
        await this.controller.searchMain(key);
        //await this.PageItems.first(key);
    }
    renderRow = (item:any, index:number):JSX.Element => {
        return <div className="px-3 py-2">{jsonStringify(item)}</div>;
    }

    protected abstract onSelected(item:any): Promise<void>;
    private callOnSelected(item:any) {
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
    }
    clickRow = (item:any) => {
        this.callOnSelected(item);
    }

    protected view = observer(() => {
        let header = <SearchBox className="mx-1 w-100"
            initKey={''}
            onSearch={this.onSearch} placeholder={'搜索'+this.label} />;
        let {owner} = this.entity;
        let ownerTop;
        if (owner !== undefined) {
            let ownerObj = owner.valueFromId(this.ownerId);
            ownerTop = <div>owner: {jsonStringify(ownerObj)}</div>;
        }
        return <Page header={header}>
            {ownerTop}
            <List
                items={this.controller.PageItems.items}
                item={{render: this.renderRow, onClick: this.clickRow}}
                before={'搜索'+this.label+'资料'} />
        </Page>;
    });
}

export class VTuidDivList extends VTuidDivListBase {
    protected async onSelected(item:any) {
        this.event('edit', item.id);
    }
}
*/ 
//# sourceMappingURL=vTuidList.js.map