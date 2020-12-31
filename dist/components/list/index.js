var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Clickable } from './clickable';
import { Static } from './static';
import { Selectable } from './selectable';
import '../../css/va-list.css';
import { resLang } from '../../res/res';
import { listRes } from '../../res';
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        _this._$scroll = function (direct) {
            console.log('############### items scroll to ' + direct);
        };
        _this.buildBase();
        return _this;
    }
    List_1 = List;
    List.prototype.buildBase = function () {
        var item = this.props.item;
        var onClick = item.onClick, onSelect = item.onSelect;
        if (onSelect !== undefined)
            this.selectable = this.listBase = new Selectable(this);
        else if (onClick !== undefined)
            this.listBase = new Clickable(this);
        else
            this.listBase = new Static(this);
    };
    List.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (_.isEqual(this.props.item, prevProps.item) === false) {
            this.buildBase();
            this.forceUpdate();
        }
    };
    List.prototype.componentWillUnmount = function () {
        this.listBase.dispose();
    };
    List.prototype.selectAll = function () {
        if (this.selectable)
            this.selectable.selectAll();
    };
    List.prototype.unselectAll = function () {
        if (this.selectable)
            this.selectable.unselectAll();
    };
    Object.defineProperty(List.prototype, "selectedItems", {
        get: function () {
            return this.listBase.selectedItems;
        },
        enumerable: false,
        configurable: true
    });
    List.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, header = _a.header, footer = _a.footer, before = _a.before, loading = _a.loading, none = _a.none, onFocus = _a.onFocus;
        if (before === undefined)
            before = '-';
        if (loading === undefined)
            loading = function () { return React.createElement("i", { className: "fa fa-spinner fa-spin fa-2x fa-fw text-info" }); };
        if (none === undefined)
            none = List_1.res.none;
        //this.listBase.selectedItems = selectedItems;
        var _b = this.listBase, items = _b.items, isLoading = _b.loading;
        function staticRow(row, type) {
            if (!row)
                return;
            switch (typeof row) {
                default:
                case 'string': return React.createElement("li", { className: "va-list-" + type }, row);
                case 'function': return React.createElement("li", { className: "va-list-" + type }, row());
                case 'object': return React.createElement("li", null, row);
            }
        }
        var content, waitingMore;
        if (items === null)
            content = staticRow(before, 'before');
        else if (items === undefined)
            content = staticRow(loading, 'loading');
        else if (items.length === 0)
            content = staticRow(none, 'none');
        else {
            content = items.map(function (item, index) {
                return _this.listBase.render(item, index);
            });
        }
        if (isLoading === true && items) {
            waitingMore = staticRow(loading, 'loading');
        }
        var tabIndex;
        if (onFocus !== undefined)
            tabIndex = -1;
        return React.createElement("ul", { className: classNames('va-list', className), onFocus: onFocus, tabIndex: tabIndex },
            staticRow(header, 'header'),
            content,
            waitingMore,
            staticRow(footer, 'footer'));
    };
    var List_1;
    List.res = resLang(listRes);
    List = List_1 = __decorate([
        observer
    ], List);
    return List;
}(React.Component));
export { List };
//# sourceMappingURL=index.js.map