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
import { nav } from './nav';
import { Page } from './page/page';
var ReloadPage = /** @class */ (function (_super) {
    __extends(ReloadPage, _super);
    function ReloadPage(props) {
        var _this = _super.call(this, props) || this;
        _this.reload = function () {
            clearInterval(_this.timerHandler);
            nav.reload();
        };
        _this.state = { seconds: props.seconds };
        _this.timerHandler = setInterval(function () {
            var seconds = _this.state.seconds;
            seconds--;
            if (seconds <= 0) {
                _this.reload();
            }
            else {
                _this.setState({ seconds: seconds });
            }
        }, 1000);
        return _this;
    }
    ReloadPage.prototype.render = function () {
        return React.createElement(Page, { header: false },
            React.createElement("div", { className: "text-center p-5" },
                React.createElement("div", { className: "text-info py-5" },
                    "\u7A0B\u5E8F\u5347\u7EA7\u4E2D...",
                    React.createElement("br", null),
                    this.state.seconds,
                    "\u79D2\u949F\u4E4B\u540E\u81EA\u52A8\u91CD\u542F\u52A8",
                    React.createElement("br", null),
                    React.createElement("span", { className: "small text-muted" }, this.props.message)),
                React.createElement("button", { className: "btn btn-danger", onClick: this.reload }, "\u7ACB\u523B\u91CD\u542F")));
    };
    return ReloadPage;
}(React.Component));
export { ReloadPage };
export var ConfirmReloadPage = function (props) {
    return React.createElement(Page, { header: "\u5347\u7EA7\u8F6F\u4EF6", back: "close" },
        React.createElement("div", { className: "py-5 px-3 my-5 mx-2 border bg-white rounded" },
            React.createElement("div", { className: "text-center text-info" }, "\u5347\u7EA7\u5C06\u6E05\u9664\u6240\u6709\u672C\u673A\u7F13\u51B2\u533A\u5185\u5BB9\uFF0C\u5E76\u4ECE\u670D\u52A1\u5668\u91CD\u65B0\u5B89\u88C5\u7A0B\u5E8F\uFF01"),
            React.createElement("div", { className: "text-center mt-5" },
                React.createElement("button", { className: "btn btn-danger mr-3", onClick: function () { return props.confirm(true); } }, "\u786E\u8BA4\u5347\u7EA7"))));
    // <button className="btn btn-outline-danger" onClick={()=>props.confirm(false)}>暂不</button>
};
//# sourceMappingURL=reloadPage.js.map