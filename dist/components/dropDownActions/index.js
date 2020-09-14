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
import * as React from 'react';
import classNames from 'classnames';
var DropdownActions = /** @class */ (function (_super) {
    __extends(DropdownActions, _super);
    function DropdownActions(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDocumentClick = function (evt) {
            if (_this.state.dropdownOpen === false)
                return;
            if (_this.button && _this.button.contains(evt.target))
                return;
            if (!_this.menu)
                return;
            //if (!this.menu.contains(evt.target)) 
            _this.toggle();
        };
        _this.toggle = function () {
            _this.setState({
                dropdownOpen: !_this.state.dropdownOpen
            });
        };
        _this.state = {
            dropdownOpen: false
        };
        return _this;
    }
    DropdownActions.prototype.componentDidMount = function () {
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('touchstart', this.handleDocumentClick);
    };
    DropdownActions.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('touchstart', this.handleDocumentClick);
    };
    DropdownActions.prototype.render = function () {
        var _this = this;
        var _a = this.props, icon = _a.icon, actions = _a.actions, isRight = _a.isRight, className = _a.className, itemIconClass = _a.itemIconClass, itemCaptionClass = _a.itemCaptionClass;
        if (isRight === undefined)
            isRight = true;
        var hasIcon = actions.some(function (v) { return v.icon !== undefined; });
        var dropdownOpen = this.state.dropdownOpen;
        //isOpen={this.state.dropdownOpen} toggle={this.toggle}
        var cn = className || 'cursor-pointer dropdown-toggle btn btn-sm';
        //if (className) cn += className;
        return React.createElement("div", { className: 'dropdown' },
            React.createElement("button", { ref: function (v) { return _this.button = v; }, className: cn, "data-toggle": "dropdown", "aria-expanded": dropdownOpen, onClick: this.toggle },
                React.createElement("i", { className: classNames('fa fa-fw ', 'fa-' + (icon || 'ellipsis-v')) })),
            React.createElement("div", { ref: function (v) { return _this.menu = v; }, className: classNames({ "dropdown-menu": true, "dropdown-menu-right": isRight, "show": dropdownOpen }) }, actions.map(function (v, index) {
                if (!v) {
                    return React.createElement("div", { className: "dropdown-divider" });
                }
                var icon = v.icon, caption = v.caption, action = v.action, iconClass = v.iconClass, captionClass = v.captionClass;
                if (icon === undefined && caption === undefined)
                    return React.createElement("div", { className: "dropdown-divider" });
                var i;
                if (hasIcon === true) {
                    if (icon !== undefined)
                        icon = 'fa-' + icon;
                    i = React.createElement("i", { className: classNames('mr-2', 'fa', icon, 'fa-fw', iconClass || itemIconClass), "aria-hidden": true });
                }
                if (action === undefined)
                    return React.createElement("h6", { className: "dropdown-header" },
                        i,
                        " ",
                        caption);
                var onMenuItemClick = function (evt) {
                    evt.preventDefault();
                    action();
                };
                var onTouchStart = function (evt) {
                    action();
                };
                // eslint-disable-next-line
                return React.createElement("a", { className: "dropdown-item", key: index, href: "#/", onClick: onMenuItemClick, onTouchStart: onTouchStart },
                    i,
                    " ",
                    React.createElement("span", { className: captionClass || itemCaptionClass }, caption));
            })));
    };
    return DropdownActions;
}(React.Component));
export { DropdownActions };
//# sourceMappingURL=index.js.map