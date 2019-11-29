import * as React from 'react';
import classNames from 'classnames';
import { nav } from './nav';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { userApi } from '../net';
export const UserIcon = observer((props) => {
    let { className, style, id, altImage, noneImage } = props;
    let src = userImageSrc(id);
    if (!src) {
        return React.createElement("div", { className: classNames(className, 'image-none'), style: style }, noneImage || React.createElement("i", { className: "fa fa-file-o" }));
    }
    if (src === '.' || src === '/') {
        return React.createElement("div", { className: classNames(className, 'image-none'), style: style },
            React.createElement("i", { className: "fa fa-file-o" }));
    }
    if (src.startsWith(':') === true) {
        src = nav.resUrl + src.substr(1);
    }
    return React.createElement("img", { src: src, className: className, alt: "img", style: style, onError: evt => {
            if (altImage)
                evt.currentTarget.src = altImage;
            else
                evt.currentTarget.src = 'https://tv.jkchemical.com/imgs/0001.png';
        } });
});
const map = observable(new Map());
function userImageSrc(id) {
    if (map.has(id) === false) {
        let ret = '.';
        //map.set(id, ret);
        userApi.user(id).then(v => {
            if (!v)
                v = null;
            else {
                let { icon } = v;
                if (icon)
                    v = icon;
                else
                    v = '/';
            }
            map.set(id, v);
        }).catch(reason => {
            console.error(reason);
        });
        return ret;
    }
    let src = map.get(id);
    if (src === null)
        return;
    return src;
}
//# sourceMappingURL=userIcon.js.map