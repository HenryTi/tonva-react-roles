import * as React from 'react';
import classNames from 'classnames';
import { nav } from './nav';
// src = .src, 表示fontawesome Icon
export function Image(props) {
    var className = props.className, style = props.style, src = props.src, altImage = props.altImage;
    var icon;
    if (src) {
        if (src.indexOf('.') !== 0) {
            if (src.startsWith(':') === true) {
                src = nav.resUrl + src.substr(1);
            }
            return React.createElement("img", { src: src, className: className, alt: "img", style: style, onError: function (evt) {
                    if (altImage)
                        evt.currentTarget.src = altImage;
                    else
                        evt.currentTarget.src = 'https://tv.jkchemical.com/imgs/0001.png';
                } });
        }
        icon = src.substr(1);
    }
    else {
        icon = 'file-o';
    }
    return React.createElement("span", { className: classNames(className, 'image-none'), style: style },
        React.createElement("i", { className: 'fa fa-' + icon }));
}
//# sourceMappingURL=image.js.map