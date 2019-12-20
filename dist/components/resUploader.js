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
import { Image as ImageControl } from './image';
import { Page } from './page';
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
                //2019-12-18：因为 vivo按oppo某些版本不支持，暂时先不要 
                //let abortController = new AbortController();
                let res = yield fetch(resUrl, {
                    method: "POST",
                    body: formData,
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
const imageTypes = ['gif', 'jpg', 'jpeg', 'png'];
let ImageUploader = class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.isChanged = false;
        this.enableUploadButton = false;
        this.onFileChange = (evt) => {
            this.fileError = undefined;
            this.enableUploadButton = evt.target.files.length > 0;
            if (this.enableUploadButton) {
                this.file = evt.target.files[0];
                let pos = this.file.name.lastIndexOf('.');
                if (pos >= 0)
                    this.suffix = this.file.name.substr(pos + 1).toLowerCase();
                if (imageTypes.indexOf(this.suffix) < 0) {
                    this.fileError = `图片类型必须是 ${imageTypes.join(', ')} 中的一种`;
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = () => __awaiter(this, void 0, void 0, function* () {
                    this.srcImage = reader.result;
                    this.desImage = yield this.compress();
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
                    let scale = width / height;
                    let w, h;
                    if (scale < 0) {
                        w = this.imgBaseSize;
                        h = w / scale;
                    }
                    else {
                        h = this.imgBaseSize;
                        w = h * scale;
                    }
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
                    if (base64.length > 5000000) {
                        this.fileError = "文件太大，无法上传";
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
        this.imgBaseSize = props.size === 'lg' ? 800 : 180;
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
        return React.createElement(Page, { header: label || '更改图片', right: right },
            React.createElement("div", { className: "my-3 px-3 py-3 bg-white" },
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(ResUploader, { ref: v => this.resUploader = v, multiple: false, maxSize: 2048, label: "\u9009\u62E9\u56FE\u7247\u6587\u4EF6", onFilesChange: this.onFileChange }),
                        React.createElement("div", { className: "small text-muted" },
                            "\u652F\u6301 ",
                            imageTypes.join(', '),
                            " \u683C\u5F0F\u56FE\u7247\u3002"),
                        this.fileError && React.createElement("div", { className: "text-danger" }, this.fileError)),
                    React.createElement(LMR, { left: this.enableUploadButton &&
                            React.createElement("div", { className: "mb-3" },
                                React.createElement("button", { className: "btn btn-primary", onClick: this.upload }, "\u4E0A\u4F20")), right: this.desImage && React.createElement("button", { className: "btn btn-link btn-sm", onClick: this.showOrgImage }, "\u67E5\u770B\u539F\u56FE") })),
                React.createElement("div", { className: "text-center", style: { border: '1px dotted gray', padding: '8px' } },
                    React.createElement(ImageControl, { className: "h-min-4c", style: { maxWidth: '100%' }, src: this.desImage }))));
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
ImageUploader = __decorate([
    observer
], ImageUploader);
export { ImageUploader };
/*
<div className="w-12c h-12c mr-4"
style={{border: '1px dotted gray', padding: '8px'}}>
<ImageControl className="w-100 h-100" src={this.srcImage} />
</div>
<div>
<div className="small">图片预览</div>
<ImageControl className="w-4c h-4c mt-3" src={this.desImage} />
</div>
*/
//# sourceMappingURL=resUploader.js.map