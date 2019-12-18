var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { nav } from './nav';
import { Image } from './image';
import { Page } from './page';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { env } from '../tool';
export class ResUploader extends React.Component {
    constructor() {
        super(...arguments);
        this.upload = () => __awaiter(this, void 0, void 0, function* () {
            let { maxSize } = this.props;
            if (maxSize === undefined || maxSize <= 0)
                maxSize = 100000000000;
            else
                maxSize = maxSize * 1024;
            let resUrl = nav.resUrl + 'upload';
            var files = this.fileInput.files;
            var data = new FormData();
            let len = files.length;
            for (let i = 0; i < len; i++) {
                let file = files[i];
                if (file.size > maxSize)
                    return null;
                data.append('files[]', file, file.name);
            }
            try {
                nav.startWait();
                let abortController = new AbortController();
                let res = yield fetch(resUrl, {
                    method: "POST",
                    body: data,
                    signal: abortController.signal,
                });
                let json = yield res.json();
                return ':' + json.res.id;
            }
            catch (err) {
                console.error('%s %s', resUrl, err);
            }
            finally {
                nav.endWait();
            }
        });
    }
    render() {
        let { className, multiple, onFilesChange } = this.props;
        return React.createElement("input", { className: className, ref: t => this.fileInput = t, onChange: onFilesChange, type: 'file', name: 'file', multiple: multiple });
    }
}
let ImageUploader = class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.isChanged = false;
        this.overSize = false;
        this.upload = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.resUploader)
                return;
            let ret = yield this.resUploader.upload();
            if (ret === null) {
                this.overSize = true;
                env.setTimeout('imageItemEdit upload', () => this.overSize = false, 3000);
                return;
            }
            this.resId = ret;
            this.isChanged = (this.resId !== this.props.id);
        });
        this.onSaved = () => {
            let { onSaved } = this.props;
            onSaved && onSaved(this.resId);
            return;
        };
        this.resId = props.id;
    }
    render() {
        let { label } = this.props;
        let right = React.createElement("button", { className: "btn btn-sm btn-success align-self-center mr-2", disabled: !this.isChanged, onClick: this.onSaved }, "\u4FDD\u5B58");
        let overSize;
        if (this.overSize === true) {
            overSize = React.createElement("div", { className: "text-danger" },
                React.createElement("i", { className: "fa fa-times-circle" }),
                " \u56FE\u7247\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC72M\uFF0C\u65E0\u6CD5\u4E0A\u4F20");
        }
        return React.createElement(Page, { header: label || '更改图片', right: right },
            React.createElement("div", { className: "my-3 px-3 py-3 bg-white" },
                React.createElement("div", null,
                    React.createElement("div", null, "\u4E0A\u4F20\u56FE\u7247\uFF1A"),
                    React.createElement("div", { className: "my-3" },
                        React.createElement(ResUploader, { ref: v => this.resUploader = v, multiple: false, maxSize: 2048 })),
                    React.createElement("div", null,
                        React.createElement("button", { className: "btn btn-primary", onClick: this.upload }, "\u4E0A\u4F20"))),
                overSize,
                React.createElement("div", { className: "small muted my-4" }, "\u652F\u6301JPG\u3001GIF\u3001PNG\u683C\u5F0F\u56FE\u7247\uFF0C\u4E0D\u8D85\u8FC72M\u3002"),
                React.createElement("div", { className: "d-flex" },
                    React.createElement("div", { className: "w-12c h-12c mr-4", style: { border: '1px dotted gray', padding: '8px' } },
                        React.createElement(Image, { className: "w-100 h-100", src: this.resId })),
                    React.createElement("div", null,
                        React.createElement("div", { className: "small" }, "\u56FE\u7247\u9884\u89C8"),
                        React.createElement(Image, { className: "w-4c h-4c mt-3", src: this.resId })))));
    }
};
__decorate([
    observable
], ImageUploader.prototype, "isChanged", void 0);
__decorate([
    observable
], ImageUploader.prototype, "resId", void 0);
__decorate([
    observable
], ImageUploader.prototype, "overSize", void 0);
ImageUploader = __decorate([
    observer
], ImageUploader);
export { ImageUploader };
//# sourceMappingURL=resUploader.js.map