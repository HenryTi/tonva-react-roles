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
function renderDate(vDate, withTime) {
    if (!vDate)
        return null;
    var date;
    switch (typeof vDate) {
        default:
            date = vDate;
            break;
        case 'string':
            date = new Date(vDate);
            break;
        case 'number':
            date = new Date(vDate * 1000);
            break;
    }
    var now = new Date();
    var tick, nDate, _date, month, year, hm, nowYear;
    var d = date;
    tick = now.getTime() - d.getTime();
    var hour = d.getHours(), minute = d.getMinutes();
    nDate = now.getDate();
    _date = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
    nowYear = now.getFullYear();
    hm = withTime === true ? ' ' + hour + ((minute < 10 ? ':0' : ':') + minute) : '';
    if (tick < -24 * 3600 * 1000) {
        if (year === nowYear)
            return month + '月' + _date + '日' + hm;
        else
            return year + '年' + month + '月' + _date + '日' + hm;
    }
    if (tick < 24 * 3600 * 1000) {
        return _date !== nDate ?
            (tick < 0 ? '明天 ' : '昨天 ') + hm
            : withTime === true ? hm : '今天';
    }
    if (year === nowYear) {
        return month + '月' + _date + '日';
    }
    return year + '年' + month + '月' + _date + '日';
}
var EasyDate = /** @class */ (function (_super) {
    __extends(EasyDate, _super);
    function EasyDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EasyDate.prototype.render = function () {
        return renderDate(this.props.date, false);
    };
    return EasyDate;
}(React.Component));
export { EasyDate };
var EasyTime = /** @class */ (function (_super) {
    __extends(EasyTime, _super);
    function EasyTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EasyTime.prototype.render = function () {
        return renderDate(this.props.date, true);
    };
    return EasyTime;
}(React.Component));
export { EasyTime };
//# sourceMappingURL=index.js.map