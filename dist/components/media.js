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
import * as React from 'react';
import classNames from 'classnames';
import { Image } from '.';
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Media.prototype.render = function () {
        var _a = this.props, icon = _a.icon, main = _a.main, discription = _a.discription, px = _a.px, py = _a.py;
        var disp;
        if (typeof discription === 'string')
            disp = React.createElement("div", null, discription);
        else
            disp = discription;
        var cn = classNames('media', px === undefined ? 'px-0' : 'px-' + px, py === undefined ? 'py-2' : 'py-' + py);
        return React.createElement("div", { className: cn },
            React.createElement(Image, { className: "mr-3 w-4c h-4c", src: icon }),
            React.createElement("div", { className: "media-body" },
                React.createElement("h5", { className: "mt-0" }, main),
                disp));
    };
    return Media;
}(React.Component));
export { Media };
//# sourceMappingURL=media.js.map