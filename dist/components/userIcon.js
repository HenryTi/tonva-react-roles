import * as React from 'react';
import classNames from 'classnames';
import { nav } from './nav';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { userApi } from '../net';
export const UserIcon = observer((props) => {
    let { className, style, id, altImage, noneImage } = props;
    let user = getUser(id);
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
    let user = getUser(id);
    if (!user) {
        return React.createElement(React.Fragment, null);
    }
    return render(user);
});
const map = observable(new Map());
function getUser(id) {
    if (id === null)
        return;
    switch (typeof (id)) {
        case 'object':
            id = id.id;
            if (!id)
                return;
            break;
    }
    if (map.has(id) === false) {
        userApi.user(id).then(v => {
            if (!v)
                v = null;
            map.set(id, v);
        }).catch(reason => {
            console.error(reason);
        });
        return undefined;
    }
    let src = map.get(id);
    if (src === null)
        return;
    return src;
}
//# sourceMappingURL=userIcon.js.map