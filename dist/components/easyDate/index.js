import * as React from 'react';
import { setRes } from '../../components';
//type YMD = (year:number, month:number, date:number) => string;
//type MD = (month:number, date:number) => string;
const timeRes = {
    md: (month, date) => `${month}-${date}`,
    ymd: (year, month, date) => `${year}-${month}-${date}`,
    yesterday: 'Yesterday',
    today: 'Today',
    tomorrow: 'Tomorrow',
    $zh: {
        md: (month, date) => `${month}月${date}日`,
        ymd: (year, month, date) => `${year}年${month}月${date}日`,
        yesterday: '昨天',
        today: '今天',
        tomorrow: '明天',
    },
    $en: {
        md: (month, date) => `${month}-${date}`,
        ymd: (year, month, date) => `${year}-${month}-${date}`,
        yesterday: 'Yesterday',
        today: 'Today',
        tomorrow: 'Tomorrow',
    }
};
setRes(timeRes, timeRes);
function tt(str, ...params) {
    return timeRes[str](...params);
}
function renderDate(vDate, withTime) {
    if (!vDate)
        return null;
    let date;
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
            return tt('md', month, _date) + hm;
        else
            return tt('ymd', year, month, _date) + hm;
    }
    if (tick < 24 * 3600 * 1000) {
        return _date !== nDate ?
            tt(tick < 0 ? 'tomorrow' : 'yesterday') + hm
            : withTime === true ? hm : tt('today');
    }
    if (year === nowYear) {
        return tt('md', month, _date);
    }
    return tt('ymd', year, month, _date);
}
export class EasyDate extends React.Component {
    render() {
        return renderDate(this.props.date, false);
    }
}
export class EasyTime extends React.Component {
    render() {
        return renderDate(this.props.date, true);
    }
}
//# sourceMappingURL=index.js.map