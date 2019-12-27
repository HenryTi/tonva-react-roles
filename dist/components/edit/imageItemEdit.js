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
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ImageUploader } from '../resUploader';
//import { Image } from '../image';
import { nav } from '../nav';
//import { Page } from '../page';
import { ItemEdit } from './itemEdit';
//import { env } from '../../tool';
export class ImageItemEdit extends ItemEdit {
    constructor() {
        super(...arguments);
        /*
        private upload = async () => {
            if (!this.resUploader) return;
            let ret = await this.resUploader.upload();
            if (ret === null) {
                this.overSize = true;
                env.setTimeout('imageItemEdit upload', () => this.overSize = false, 3000);
                return;
            }
            this.resId = ret;
            this.isChanged = (this.resId !== this.value);
        }
        */
        this.page = observer((props) => {
            let { resolve } = props;
            let size = this.uiItem && this.uiItem.size;
            /*
            let right = <button
                className="btn btn-sm btn-success align-self-center"
                disabled={!this.isChanged}
                onClick={()=>resolve(this.resId)}>保存</button>;
            let overSize:any;
            if (this.overSize === true) {
                overSize = <div className="text-danger">
                    <i className="fa fa-times-circle" /> 图片文件大小超过2M，无法上传
                </div>;
            }
            */
            return React.createElement(ImageUploader, { label: '更改' + this.label, id: this.resId, size: size, onSaved: (resId) => { resolve(resId); return; } });
            /*
            return <Page header={'更改' + this.label} right={right}>
                <div className="my-3 px-3 py-3 bg-white">
                    <div>
                        <div>上传图片：</div>
                        <div className="my-3">
                            <ResUploader ref={v=>this.resUploader=v} multiple={false} maxSize={2048} />
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={this.upload}>上传</button>
                        </div>
                    </div>
                    {overSize}
                    <div className="small muted my-4">支持JPG、GIF、PNG格式图片，不超过2M。</div>
                    <div className="d-flex">
                        <div className="w-12c h-12c mr-4"
                            style={{border: '1px dotted gray', padding: '8px'}}>
                            <Image className="w-100 h-100" src={this.resId} />
                        </div>
                        <div>
                            <div className="small">图片预览</div>
                            <Image className="w-4c h-4c mt-3" src={this.resId} />
                        </div>
                    </div>
                </div>
            </Page>;
            */
        });
    }
    //@observable private overSize: boolean = false;
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.resId = this.value;
            return new Promise((resolve, reject) => {
                nav.push(React.createElement(this.page, { resolve: resolve, reject: reject }), () => reject());
            });
        });
    }
}
__decorate([
    observable
], ImageItemEdit.prototype, "resId", void 0);
//# sourceMappingURL=imageItemEdit.js.map