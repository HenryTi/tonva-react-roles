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
import { PureJSONContent } from '../tools';
export class TuidWithUIRes {
    constructor(tuid, ui, res) {
        this.tuid = tuid;
        this.ui = ui;
        this.res = res;
    }
}
export class ReactBoxId {
    constructor(tuidUR, id) {
        this.tuidUR = tuidUR;
        this.id = id;
        this.isUndefined = (this.tuidUR.tuid === undefined);
    }
    get obj() {
        return this.tuidUR.tuid.valueFromId(this.id);
    }
    equ(id) {
        if (typeof id === 'object')
            return this.id === id.id;
        return this.id === id;
    }
    render(ui, x) {
        if (this.id === undefined || this.id === null)
            return;
        let boxName = this.boxName; // this.tuid.name;
        let val = this.obj; // this.tuid.valueFromId(this.id);
        if (this.isUndefined === true) {
            if (ui !== undefined)
                return ui(val, x);
            return PureJSONContent(val, x);
        }
        switch (typeof val) {
            case 'undefined':
                return React.createElement("del", { className: "text-black-50" },
                    boxName,
                    " undefined");
            case 'number':
                return React.createElement("del", { className: "text-black-50" },
                    boxName,
                    " ",
                    this.id);
        }
        if (ui === undefined) {
            ui = this.tuidUR.ui;
        }
        if (ui !== undefined) {
            if (typeof ui !== 'function') {
                ui = ui.content;
            }
            if (ui !== undefined) {
                let ret = ui(val, this.tuidUR.res);
                if (ret !== undefined)
                    return ret;
                return React.createElement("del", { className: "text-danger" },
                    boxName,
                    " ",
                    this.id);
            }
        }
        return PureJSONContent(val);
    }
    get boxName() { return this.tuidUR.tuid.name; }
    // ui(): TvTemplet {return this.tuid.ui}
    // res(): any {return this.tuid.res}
    assure() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidUR.tuid.assureBox(this.id);
            return this;
        });
    }
}
function boxIdContent(bi, ui, x) {
    let logContent;
    let boxId = bi;
    switch (typeof bi) {
        case 'undefined':
            logContent = React.createElement(React.Fragment, null, "boxId undefined");
            break;
        case 'number':
            logContent = React.createElement(React.Fragment, null,
                "id:",
                bi);
            break;
        default:
            if (typeof boxId.render !== 'function') {
                if (ui === undefined) {
                    logContent = PureJSONContent(bi, x);
                }
                else {
                    return ui(bi, x);
                }
            }
            break;
    }
    if (logContent !== undefined) {
        return React.createElement("del", { className: "text-danger" }, logContent);
    }
    return boxId.render(ui, x);
}
const Tv = observer(({ tuidValue, ui, x, nullUI }) => {
    if (tuidValue === undefined) {
        if (nullUI === undefined)
            return React.createElement(React.Fragment, null, "[undefined]");
        return nullUI();
    }
    if (tuidValue === null) {
        if (nullUI === undefined)
            return React.createElement(React.Fragment, null, "[null]");
        return nullUI();
    }
    let ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return React.createElement(React.Fragment, null,
                    ttv,
                    "-",
                    tuidValue);
            else {
                let ret = ui(tuidValue, x);
                if (ret !== undefined)
                    return ret;
                return React.createElement(React.Fragment, null, tuidValue);
            }
        case 'object':
            let divObj = boxIdContent(tuidValue, ui, x);
            if (divObj !== undefined)
                return divObj;
            return nullUI === undefined ? React.createElement(React.Fragment, null, "id null") : nullUI();
        case 'number':
            return React.createElement(React.Fragment, null,
                "id...",
                tuidValue);
    }
});
export const tv = (tuidValue, ui, x, nullUI) => {
    return React.createElement(Tv, { tuidValue: tuidValue, ui: ui, x: x, nullUI: nullUI });
};
/*
class BoxDivId extends BoxId {
    private div: TuidDiv;
    constructor(tuid: Tuid, div: TuidDiv, id: number) {
        super(tuid, id);
        this.div = div;
    }
    get obj():any {
        return this.div.valueFromId(this.id);
    }
    boxName():string {return this.div.name}
    isUndefined(): boolean {return this.div === undefined}
    ui(): TvTemplet {return this.div.ui}
    res(): any {return this.div.res}

    async assure(): Promise<void> {
        await this.div.assureBox(this.id);
    }
}
*/
//# sourceMappingURL=reactBoxId.js.map