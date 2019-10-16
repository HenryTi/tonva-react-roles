import * as React from 'react';
import { nav, mobileRegex, emailRegex } from '../components';
var logo = require('../img/logo.svg');
export function tonvaTop() {
    return nav.loginTop(React.createElement("div", { className: "d-flex align-items-center" },
        React.createElement("img", { className: "App-logo h-3c position-absolute", src: logo, alt: "img" }),
        React.createElement("div", { className: "h3 flex-fill text-center" },
            React.createElement("span", { className: "text-primary mr-3" }, "\u540C"),
            React.createElement("span", { className: "text-danger" }, "\u82B1"))));
}
var senders = [
    { type: 'mobile', caption: '手机号', regex: mobileRegex },
    { type: 'email', caption: '邮箱', regex: emailRegex }
];
export function getSender(un) {
    var sender = senders.find(function (v) { return v.regex.test(un) === true; });
    return sender;
}
//# sourceMappingURL=tools.js.map