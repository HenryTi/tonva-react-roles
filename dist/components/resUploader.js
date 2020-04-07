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
var ImageUploader_1, AudioUploader_1;
import * as React from 'react';
import { nav } from './nav';
import { Loading } from './loading';
import { Image as ImageControl } from './image';
import { Page } from './page/page';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { LMR } from './simple';
let ResUploader = class ResUploader extends React.Component {
    constructor() {
        super(...arguments);
        this.upload = (formData) => __awaiter(this, void 0, void 0, function* () {
            let resUrl = nav.resUrl + 'upload';
            if (!formData)
                formData = this.buildFormData();
            try {
                nav.startWait();
                let headers = new Headers();
                headers.append('Access-Control-Allow-Origin', '*');
                //2019-12-18：因为 vivo按oppo某些版本不支持，暂时先不要 
                //let abortController = new AbortController();
                let res = yield fetch(resUrl, {
                    method: "POST",
                    body: formData,
                    headers: headers,
                });
                let json = yield res.json();
                return ':' + json.res.id;
            }
            catch (err) {
                console.error('%s %s', resUrl, err);
                return { error: err };
            }
            finally {
                nav.endWait();
            }
        });
        this.onFilesChange = (evt) => {
            let { onFilesChange } = this.props;
            if (onFilesChange)
                onFilesChange(evt);
            let files = evt.target.files;
            let len = files.length;
            let names = [];
            for (let i = 0; i < len; i++) {
                names.push(files.item(i).name);
            }
            this.fileName = names.join(', ');
        };
    }
    buildFormData() {
        let { maxSize } = this.props;
        if (maxSize === undefined || maxSize <= 0)
            maxSize = 100000000000;
        else
            maxSize = maxSize * 1024;
        var files = this.fileInput.files;
        var data = new FormData();
        let len = files.length;
        for (let i = 0; i < len; i++) {
            let file = files[i];
            if (file.size > maxSize)
                return null;
            data.append('files[]', file, file.name);
        }
    }
    getFile0() {
        return this.fileInput.files[0];
    }
    render() {
        let { className, multiple, label } = this.props;
        return React.createElement("div", null,
            React.createElement("label", { className: "btn btn-outline-success" },
                label || '选择文件',
                React.createElement("input", { className: className, ref: t => this.fileInput = t, onChange: this.onFilesChange, type: 'file', name: 'file', multiple: multiple, style: { display: 'none' } })),
            "\u00A0",
            this.fileName);
    }
};
__decorate([
    observable
], ResUploader.prototype, "fileName", void 0);
ResUploader = __decorate([
    observer
], ResUploader);
export { ResUploader };
function formatSize(size, pointLength = 2, units) {
    var unit;
    units = units || ['B', 'K', 'M', 'G', 'TB'];
    while ((unit = units.shift()) && size > 1024) {
        size = size / 1024;
    }
    return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit;
}
const largeSize = 800;
const mediumSize = 400;
const smallSize = 180;
let ImageUploader = ImageUploader_1 = class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.isChanged = false;
        this.enableUploadButton = false;
        this.uploaded = false;
        this.onFileChange = (evt) => {
            this.fileError = undefined;
            this.uploaded = false;
            this.enableUploadButton = evt.target.files.length > 0;
            if (this.enableUploadButton) {
                this.file = evt.target.files[0];
                let pos = this.file.name.lastIndexOf('.');
                if (pos >= 0)
                    this.suffix = this.file.name.substr(pos + 1).toLowerCase();
                if (ImageUploader_1.imageTypes.indexOf(this.suffix) < 0) {
                    this.fileError = `图片类型必须是 ${ImageUploader_1.imageTypes.join(', ')} 中的一种`;
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = () => __awaiter(this, void 0, void 0, function* () {
                    this.srcImage = reader.result;
                    yield this.setSize(this.props.size);
                });
            }
        };
        this.compress = () => {
            return new Promise((resolve, reject) => {
                var img = new Image();
                img.src = this.srcImage;
                img.onload = () => {
                    //var that = this;
                    // 默认按比例压缩
                    let { width, height } = img;
                    this.srcImgWidth = width;
                    this.srcImgHeight = height;
                    let scale = width / height;
                    let w, h;
                    if (width <= this.imgBaseSize && height <= this.imgBaseSize) {
                        w = width;
                        h = height;
                    }
                    else if (scale < 0) {
                        w = this.imgBaseSize;
                        h = w / scale;
                    }
                    else {
                        h = this.imgBaseSize;
                        w = h * scale;
                    }
                    this.desImgWidth = Math.round(w);
                    this.desImgHeight = Math.round(h);
                    var quality = 0.7; // 默认图片质量为0.7
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
                    anw.nodeValue = String(w);
                    var anh = document.createAttribute("height");
                    anh.nodeValue = String(h);
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(img, 0, 0, w, h);
                    let base64 = canvas.toDataURL('image/' + this.suffix, quality);
                    let blob = this.convertBase64UrlToBlob(base64);
                    this.desImgSize = blob.size;
                    if (this.desImgSize > 5000000) {
                        this.fileError = "图片大于4M，无法上传";
                        this.enableUploadButton = false;
                    }
                    resolve(base64);
                };
            });
        };
        this.upload = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.resUploader)
                return;
            let formData = new FormData();
            let blob = this.convertBase64UrlToBlob(this.desImage);
            formData.append('image', blob, this.file.name);
            let ret = yield this.resUploader.upload(formData);
            if (typeof ret === 'object') {
                let { error } = ret;
                let type = typeof error;
                let err;
                switch (type) {
                    case 'undefined':
                        err = 'error: undefined';
                        break;
                    case 'string':
                        err = error;
                        break;
                    case 'object':
                        err = error.message;
                        break;
                    default:
                        err = String(err);
                        break;
                }
                this.fileError = 'error: ' + type + ' - ' + err;
                return;
            }
            this.resId = ret;
            this.isChanged = (this.resId !== this.props.id);
            this.uploaded = true;
        });
        this.onSaved = () => {
            let { onSaved } = this.props;
            onSaved && onSaved(this.resId);
            return;
        };
        this.showOrgImage = () => {
            nav.push(React.createElement(Page, { header: "\u539F\u56FE" },
                React.createElement("div", { className: "p-3 text-center" },
                    React.createElement(ImageControl, { className: "h-min-4c", style: { maxWidth: '100%' }, src: this.srcImage }))));
        };
        this.resId = props.id;
    }
    setSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (size) {
                default:
                case 'sm':
                    this.imgBaseSize = smallSize;
                    break;
                case 'md':
                    this.imgBaseSize = mediumSize;
                    break;
                case 'lg':
                    this.imgBaseSize = largeSize;
                    break;
            }
            this.desImage = yield this.compress();
        });
    }
    convertBase64UrlToBlob(urlData) {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    levelDiv() {
        if (this.props.size)
            return;
        let arr = [{ caption: '小图', size: 'sm' }];
        if (this.srcImgHeight > mediumSize || this.srcImgWidth > mediumSize) {
            arr.push({ caption: '中图', size: 'md' });
        }
        if (this.srcImgHeight > largeSize || this.srcImgWidth > largeSize) {
            arr.push({ caption: '大图', size: 'lg' });
        }
        if (arr.length < 2)
            return;
        return React.createElement("div", null, arr.map((v, index) => {
            let { caption, size } = v;
            return React.createElement("label", { key: index, className: "mr-3" },
                React.createElement("input", { type: "radio", name: "size", onChange: () => this.setSize(size), defaultChecked: index === 0 }),
                " ",
                caption);
        }));
    }
    render() {
        let { label } = this.props;
        let right = React.createElement("button", { className: "btn btn-sm btn-success align-self-center mr-2", disabled: !this.isChanged, onClick: this.onSaved }, "\u4FDD\u5B58");
        return React.createElement(Page, { header: label || '更改图片', right: right },
            React.createElement("div", { className: "my-3 px-3 py-3 bg-white" },
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(ResUploader, { ref: v => this.resUploader = v, multiple: false, maxSize: 2048, label: "\u9009\u62E9\u56FE\u7247\u6587\u4EF6", onFilesChange: this.onFileChange }),
                        React.createElement("div", { className: "small text-muted" },
                            "\u652F\u6301 ",
                            ImageUploader_1.imageTypes.join(', '),
                            " \u683C\u5F0F\u56FE\u7247\u3002"),
                        this.fileError && React.createElement("div", { className: "text-danger" }, this.fileError)),
                    React.createElement(LMR, { left: this.uploaded === true ?
                            React.createElement("div", { className: "text-success p-2" }, "\u4E0A\u4F20\u6210\u529F\uFF01")
                            :
                                this.file && this.desImgSize > 0 && React.createElement("div", { className: "mb-3 d-flex align-items-end" },
                                    React.createElement("div", { className: "mr-5" },
                                        this.levelDiv(),
                                        React.createElement("div", null,
                                            "\u5206\u8FA8\u7387\uFF1A",
                                            this.desImgWidth,
                                            " x ",
                                            this.desImgHeight,
                                            "\u00A0 \u00A0 \u6587\u4EF6\u5927\u5C0F\uFF1A",
                                            formatSize(this.desImgSize))),
                                    React.createElement("button", { className: "btn btn-primary", disabled: !this.enableUploadButton, onClick: this.upload }, "\u4E0A\u4F20")), right: this.desImage &&
                            React.createElement("button", { className: "btn btn-link btn-sm text-right mb-3", onClick: this.showOrgImage },
                                "\u539F\u56FE\u5927\u5C0F: ",
                                formatSize(this.file.size),
                                React.createElement("br", null),
                                "\u5206\u8FA8\u7387\uFF1A",
                                this.srcImgWidth,
                                " x ",
                                this.srcImgHeight) })),
                React.createElement("div", { className: "text-center", style: {
                        border: (this.uploaded === true ? '2px solid green' : '1px dotted gray'),
                        padding: '8px'
                    } },
                    React.createElement(ImageControl, { className: "h-min-4c", style: { maxWidth: '100%' }, src: this.desImage }))));
    }
};
ImageUploader.imageTypes = ['gif', 'jpg', 'jpeg', 'png'];
__decorate([
    observable
], ImageUploader.prototype, "file", void 0);
__decorate([
    observable
], ImageUploader.prototype, "desImgWidth", void 0);
__decorate([
    observable
], ImageUploader.prototype, "desImgHeight", void 0);
__decorate([
    observable
], ImageUploader.prototype, "desImgSize", void 0);
__decorate([
    observable
], ImageUploader.prototype, "srcImgWidth", void 0);
__decorate([
    observable
], ImageUploader.prototype, "srcImgHeight", void 0);
__decorate([
    observable
], ImageUploader.prototype, "isChanged", void 0);
__decorate([
    observable
], ImageUploader.prototype, "resId", void 0);
__decorate([
    observable
], ImageUploader.prototype, "enableUploadButton", void 0);
__decorate([
    observable
], ImageUploader.prototype, "srcImage", void 0);
__decorate([
    observable
], ImageUploader.prototype, "desImage", void 0);
__decorate([
    observable
], ImageUploader.prototype, "fileError", void 0);
__decorate([
    observable
], ImageUploader.prototype, "uploaded", void 0);
ImageUploader = ImageUploader_1 = __decorate([
    observer
], ImageUploader);
export { ImageUploader };
let AudioUploader = AudioUploader_1 = class AudioUploader extends React.Component {
    constructor(props) {
        super(props);
        this.isChanged = false;
        this.enableUploadButton = false;
        this.uploaded = false;
        this.uploading = false;
        this.onFileChange = (evt) => {
            this.fileError = undefined;
            this.uploaded = false;
            this.enableUploadButton = evt.target.files.length > 0;
            if (this.enableUploadButton) {
                this.file = evt.target.files[0];
                let pos = this.file.name.lastIndexOf('.');
                if (pos >= 0)
                    this.suffix = this.file.name.substr(pos + 1).toLowerCase();
                if (AudioUploader_1.audioTypes.indexOf(this.suffix) < 0) {
                    this.fileError = `音频类型必须是 ${AudioUploader_1.audioTypes.join(', ')} 中的一种`;
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = () => __awaiter(this, void 0, void 0, function* () {
                    this.content = reader.result;
                    this.fileSize = this.content.length;
                });
            }
        };
        this.upload = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.resUploader)
                return;
            this.uploading = true;
            let formData = new FormData();
            let blob = this.convertBase64UrlToBlob(this.content);
            formData.append('image', blob, this.file.name);
            let ret = yield this.resUploader.upload(formData);
            if (typeof ret === 'object') {
                let { error } = ret;
                let type = typeof error;
                let err;
                switch (type) {
                    case 'undefined':
                        err = 'error: undefined';
                        break;
                    case 'string':
                        err = error;
                        break;
                    case 'object':
                        err = error.message;
                        break;
                    default:
                        err = String(err);
                        break;
                }
                this.fileError = 'error: ' + type + ' - ' + err;
                return;
            }
            this.resId = ret;
            this.isChanged = (this.resId !== this.props.id);
            this.uploaded = true;
        });
        this.onSaved = () => {
            let { onSaved } = this.props;
            onSaved && onSaved(this.resId);
            return;
        };
        this.resId = props.id;
    }
    convertBase64UrlToBlob(urlData) {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    render() {
        let { label } = this.props;
        let right = React.createElement("button", { className: "btn btn-sm btn-success align-self-center mr-2", disabled: !this.isChanged, onClick: this.onSaved }, "\u4FDD\u5B58");
        return React.createElement(Page, { header: label || '更改文件', right: right },
            React.createElement("div", { className: "my-3 px-3 py-3 bg-white" },
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(ResUploader, { ref: v => this.resUploader = v, multiple: false, maxSize: 2048, label: "\u9009\u62E9\u97F3\u9891\u6587\u4EF6", onFilesChange: this.onFileChange }),
                        React.createElement("div", { className: "small text-muted" },
                            "\u652F\u6301 ",
                            AudioUploader_1.audioTypes.join(', '),
                            " \u683C\u5F0F\u3002"),
                        this.fileError && React.createElement("div", { className: "text-danger" }, this.fileError)))),
            React.createElement(LMR, { left: this.uploaded === true ?
                    React.createElement("div", { className: "text-success p-2" }, "\u4E0A\u4F20\u6210\u529F\uFF01")
                    :
                        this.uploading === true ?
                            React.createElement("div", { className: "m-3" },
                                React.createElement(Loading, null))
                            :
                                this.file && this.content && React.createElement("div", { className: "m-3" },
                                    React.createElement("div", { className: "mb-3" },
                                        "\u6587\u4EF6\u5927\u5C0F\uFF1A",
                                        formatSize(this.fileSize)),
                                    React.createElement("button", { className: "btn btn-primary", disabled: !this.enableUploadButton, onClick: this.upload }, "\u4E0A\u4F20")) }));
    }
};
AudioUploader.audioTypes = ['mp3', 'wav'];
__decorate([
    observable
], AudioUploader.prototype, "content", void 0);
__decorate([
    observable
], AudioUploader.prototype, "file", void 0);
__decorate([
    observable
], AudioUploader.prototype, "fileSize", void 0);
__decorate([
    observable
], AudioUploader.prototype, "isChanged", void 0);
__decorate([
    observable
], AudioUploader.prototype, "resId", void 0);
__decorate([
    observable
], AudioUploader.prototype, "enableUploadButton", void 0);
__decorate([
    observable
], AudioUploader.prototype, "fileError", void 0);
__decorate([
    observable
], AudioUploader.prototype, "uploaded", void 0);
__decorate([
    observable
], AudioUploader.prototype, "uploading", void 0);
AudioUploader = AudioUploader_1 = __decorate([
    observer
], AudioUploader);
export { AudioUploader };
//# sourceMappingURL=resUploader.js.map