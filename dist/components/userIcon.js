import * as React from 'react';
import classNames from 'classnames';
import { nav } from './nav';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { userApi } from '../net';
export class UserCache {
    constructor(loader) {
        this.map = observable(new Map());
        if (loader === undefined)
            loader = (userId) => userApi.user(userId);
        this.loader = loader;
    }
    getValue(id) {
        if (id === null)
            return;
        switch (typeof (id)) {
            case 'object':
                id = id.id;
                if (!id)
                    return;
                break;
        }
        if (this.map.has(id) === false) {
            this.map.set(id, null);
            this.loader(id).then(v => {
                if (!v)
                    v = null;
                this.map.set(id, v);
            }).catch(reason => {
                console.error(reason);
            });
            return undefined;
        }
        let src = this.map.get(id);
        if (src === null)
            return;
        return src;
    }
}
const userCache = new UserCache(undefined);
export const UserIcon = observer((props) => {
    let { className, style, id, altImage, noneImage } = props;
    let user = userCache.getValue(id);
    if (!user) {
        return React.createElement("div", { className: classNames(className, 'image-none'), style: style }, noneImage || React.createElement("i", { className: "fa fa-file-o" }));
    }
    let { icon } = user;
    if (!icon) {
        return React.createElement("div", { className: classNames(className, 'image-none'), style: style },
            React.createElement("i", { className: "fa fa-file-o" }));
    }
    if (icon.startsWith(':') === true) {
        icon = nav.resUrl + icon.substr(1);
    }
    return React.createElement("img", { src: icon, className: className, alt: "img", style: style, onError: evt => {
            if (altImage)
                evt.currentTarget.src = altImage;
            else
                evt.currentTarget.src = 'https://tv.jkchemical.com/imgs/0001.png';
        } });
});
export const UserView = observer((props) => {
    let { id, render } = props;
    let user = userCache.getValue(id);
    if (!user) {
        return React.createElement(React.Fragment, null);
    }
    return render(user);
});
//# sourceMappingURL=userIcon.js.map