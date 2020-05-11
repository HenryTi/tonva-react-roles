import * as React from 'react';
import classNames from 'classnames';
import { nav } from './nav';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { userApi } from '../net';
var UserCache = /** @class */ (function () {
    function UserCache(loader) {
        this.map = observable(new Map());
        if (loader === undefined)
            loader = function (userId) { return userApi.user(userId); };
        this.loader = loader;
    }
    UserCache.prototype.use = function (id) {
        if (!id)
            return;
        if (typeof id === 'object')
            id = id.id;
        if (!id)
            return;
        id = Number(id);
        var ret = this.map.get(id);
        if (ret === undefined) {
            this.map.set(id, id);
        }
    };
    UserCache.prototype.getValue = function (id) {
        var _this = this;
        if (!id)
            return;
        switch (typeof (id)) {
            case 'object':
                id = id.id;
                if (!id)
                    return;
                break;
        }
        var ret = this.map.get(id);
        if (!ret)
            return;
        switch (typeof (ret)) {
            default:
                return ret;
            case 'number':
                if (ret < 0)
                    return id;
                this.map.set(id, -id);
                this.loader(id).then(function (v) {
                    if (!v)
                        v = null;
                    _this.map.set(id, v);
                }).catch(function (reason) {
                    console.error(reason);
                });
                return id;
        }
    };
    return UserCache;
}());
export { UserCache };
var userCache = new UserCache(undefined);
export var UserIcon = observer(function (props) {
    var className = props.className, style = props.style, id = props.id, altImage = props.altImage, noneImage = props.noneImage;
    var user = userCache.getValue(id);
    switch (typeof user) {
        case 'undefined':
        case 'number':
            return React.createElement("div", { className: classNames(className, 'image-none'), style: style }, noneImage || React.createElement("i", { className: "fa fa-file-o" }));
    }
    var icon = user.icon;
    if (!icon) {
        return React.createElement("div", { className: classNames(className, 'image-none'), style: style },
            React.createElement("i", { className: "fa fa-file-o" }));
    }
    if (icon.startsWith(':') === true) {
        icon = nav.resUrl + icon.substr(1);
    }
    return React.createElement("img", { src: icon, className: className, alt: "img", style: style, onError: function (evt) {
            if (altImage)
                evt.currentTarget.src = altImage;
            else
                evt.currentTarget.src = 'https://tv.jkchemical.com/imgs/0001.png';
        } });
});
export var UserView = observer(function (props) {
    var idProp = props.id, user = props.user, render = props.render;
    if (user === null)
        return React.createElement(React.Fragment, null, "null");
    switch (typeof user) {
        case 'undefined':
            user = userCache.getValue(idProp);
            break;
        case 'object':
            var _a = user, obj = _a.obj, id = _a.id;
            if (typeof obj !== 'object') {
                user = userCache.getValue(id);
            }
            break;
        case 'number':
            user = userCache.getValue(user);
            break;
        case 'string':
            user = userCache.getValue(Number(user));
            break;
        default:
            user = undefined;
            break;
    }
    switch (typeof user) {
        case 'undefined':
        case 'number':
            return React.createElement(React.Fragment, null, user);
    }
    return render(user);
});
export function useUser(id) {
    if (!id)
        return;
    if (typeof (id) === 'object') {
        id = id.id;
    }
    userCache.use(id);
}
//# sourceMappingURL=userIcon.js.map