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
// 如果是web方式，用webNav方式route网页
// 如果是app方式，用click方式压栈页面
export var Ax = function (axProps) {
    var href = axProps.href, children = axProps.children, className = axProps.className, onClick = axProps.onClick;
    if (nav.isWebNav === true) {
        var aClassName = axProps.aClassName;
        if (!href)
            return React.createElement("span", { className: "text-danger" }, "Error: href not defined in Ax");
        var onAxClick = function (evt) {
            evt.preventDefault();
            var ret;
            if (onClick) {
                ret = onClick(evt);
            }
            else {
                nav.navigate(href);
                ret = false;
            }
            return ret;
        };
        return React.createElement("a", __assign({}, axProps, { className: classNames(className, aClassName), onClick: onAxClick }), children);
    }
    else {
        var naClassName = axProps.naClassName;
        if (!onClick) {
            onClick = function () {
                nav.navigate(href);
                return false;
            };
        }
        return React.createElement("span", { className: classNames(className, 'cursor-pointer', naClassName), onClick: onClick }, children);
    }
};
// 同普通的a tag
// 会自动处理href，处理生产版跟测试版之间的不同
export var A = function (props) {
    var children = props.children;
    if (nav.isWebNav === false) {
        return React.createElement("a", __assign({}, props), children);
    }
    var href = props.href;
    //if (nav.testing === true) href += '#test';
    var onClick = function (evt) {
        evt.preventDefault();
        nav.navigate(href);
        return false;
    };
    return React.createElement("a", __assign({}, props, { href: href, onClick: onClick }), children);
};
//# sourceMappingURL=index.js.map