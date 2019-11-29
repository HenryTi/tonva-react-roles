import * as React from 'react';
import classNames from 'classnames';
import { nav } from './nav';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { userApi } from '../net';


export interface UserIconProps {
    id: number;
    className?: string;
    style?: React.CSSProperties;
    altImage?: string;
    noneImage?: any;
}

export const UserIcon = observer((props: UserIconProps):JSX.Element => {
    let {className, style, id, altImage, noneImage} = props;
    let src = userImageSrc(id);
    if (!src) {
        return <div className={classNames(className, 'image-none')} style={style}>
            {noneImage || <i className="fa fa-file-o" />}
        </div>;
    }
    if (src === '.' || src === '/') {
        return <div className={classNames(className, 'image-none')} style={style}>
            <i className="fa fa-file-o" />
        </div>;
    }
    if (src.startsWith(':') === true) {
        src = nav.resUrl + src.substr(1);
    }
    return <img src={src} className={className} alt="img"
        style={style}
        onError={evt=>{
            if (altImage) evt.currentTarget.src=altImage;
            else evt.currentTarget.src = 'https://tv.jkchemical.com/imgs/0001.png';
        }} />;
});

const map = observable(new Map<number, string>());

function userImageSrc(id: number):string {
    if (map.has(id) === false) {
        let ret = '.';
        //map.set(id, ret);
        userApi.user(id).then(v => {
            if (!v) v = null;
            else {
                let {icon} = v;
                if (icon) v = icon;
                else v = '/';
            }
            map.set(id, v);
        }).catch(reason => {
            console.error(reason);
        });
        return ret;
    }
    let src = map.get(id);
    if (src === null) return;
    return src;
}
