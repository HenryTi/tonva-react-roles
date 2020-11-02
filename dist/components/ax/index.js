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
import React from "react";
import classNames from 'classnames';
import { nav } from "../nav";
export var Ax = function (props) {
    var children = props.children, className = props.className;
    if (nav.isWebNav === true) {
        var href = props.href, aClassName = props.aClassName, target = props.target;
        if (!href)
            return null;
        if (nav.testing === true)
            href += '#test';
        return React.createElement("a", { className: classNames(className, aClassName), href: href, target: target }, children);
    }
    else {
        var onClick = props.onClick, naClassName = props.naClassName;
        if (!onClick)
            return null;
        return React.createElement("span", { className: classNames(className, naClassName), onClick: onClick }, children);
    }
};
export var A = function (props) {
    if (nav.isWebNav === false) {
        return React.createElement("a", __assign({}, props));
    }
    var href = props.href;
    if (nav.testing === true)
        href += '#test';
    return React.createElement("a", __assign({}, props, { href: href }));
};
//# sourceMappingURL=index.js.map