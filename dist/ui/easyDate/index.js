import * as React from 'react';
function renderDate(date, withTime) {
    if (!date)
        return null;
    if (typeof date === 'string')
        date = new Date(date);
    let now = new Date();
    let tick, nDate, _date, month, year, hm, nowYear;
    let d = date;
    tick = now.getTime() - d.getTime();
    let hour = d.getHours(), minute = d.getMinutes();
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
export class EasyDate extends React.Component {
    render() {
        return renderDate(this.props.date, false);
    }
}
export class EasyTime extends React.Component {
    render() {
        return renderDate(this.props.date, false);
    }
}
//# sourceMappingURL=index.js.map