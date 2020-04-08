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
import { Page } from '../components';
import { env } from '../tool';
export class View {
    constructor(controller) {
        this.controller = controller;
        this.res = controller.res;
        this.x = controller.x;
        this.t = controller.t;
    }
    get isDev() { return env.isDevelopment; }
    renderVm(vm, param) {
        return (new vm(this.controller)).render(param);
    }
    openVPage(vp, param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (new vp(this.controller)).open(param);
        });
    }
    event(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            if (this._resolve_$_ !== undefined) {
                await this._resolve_$_({type:type, value:value});
                return;
            }*/
            yield this.controller.event(type, value);
        });
    }
    vCall(vp, param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.controller.vCall(vp, param);
        });
    }
    returnCall(value) {
        this.controller.returnCall(value);
    }
    openPage(view, param) {
        let type = typeof param;
        if (type === 'object' || type === 'undefined') {
            this.controller.openPage(React.createElement(view, param));
        }
        else {
            this.controller.openPage(React.createElement(Page, { header: "param type error" },
                "View.openPage param must be object, but here is ",
                type));
        }
    }
    replacePage(view, param) {
        this.controller.replacePage(React.createElement(view, param));
    }
    openPageElement(page) {
        this.controller.openPage(page);
    }
    replacePageElement(page) {
        this.controller.replacePage(page);
    }
    backPage() {
        this.controller.backPage();
    }
    closePage(level) {
        this.controller.closePage(level);
    }
    ceasePage(level) {
        this.controller.ceasePage(level);
    }
    removeCeased() {
        this.controller.removeCeased();
    }
    regConfirmClose(confirmClose) {
        this.controller.regConfirmClose(confirmClose);
    }
}
//# sourceMappingURL=view.js.map