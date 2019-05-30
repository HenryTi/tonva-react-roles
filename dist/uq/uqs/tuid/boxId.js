import * as React from 'react';
import { PureJSONContent } from '../../controllers';
export class BoxId {
    constructor(tuid, id) {
        this.tuid = tuid;
        this.id = id;
    }
    render(ui, x) {
        if (this.id === undefined || this.id === null)
            return;
        let boxName = this.boxName(); // this.tuid.name;
        let val = this.valueFromId(); // this.tuid.valueFromId(this.id);
        if (this.isUndefined() === true) {
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
            ui = this.ui();
        }
        if (ui !== undefined) {
            let ret = ui(val, this.res());
            if (ret !== undefined)
                return ret;
            return React.createElement("del", { className: "text-danger" },
                boxName,
                " ",
                this.id);
        }
        return PureJSONContent(val);
    }
    boxName() { return this.tuid.name; }
    valueFromId() { return this.tuid.valueFromId(this.id); }
    isUndefined() { return this.tuid === undefined; }
    ui() { return this.tuid.ui; }
    res() { return this.tuid.res; }
}
export class BoxDivId extends BoxId {
    constructor(tuid, div, id) {
        super(tuid, id);
        this.div = div;
    }
    boxName() { return this.div.name; }
    valueFromId() { return this.div.valueFromId(this.id); }
    isUndefined() { return this.div === undefined; }
    ui() { return this.div.ui; }
    res() { return this.div.res; }
}
//# sourceMappingURL=boxId.js.map