import * as React from 'react';
const radioStyle = { height: 'auto' };
export class TagView {
    constructor(tag) {
        this.tag = tag;
    }
    render(values) {
        let names;
        if (typeof values === 'number') {
            names = [this.tag.nameFromId(values)];
        }
        else {
            names = this.tag.namesFromIds(values);
        }
        return React.createElement("div", { className: "d-flex flex-wrap " }, names.map((name, index) => {
            return React.createElement("div", { className: "mx-2 border border-muted rounded px-3 bg-light" }, name);
        }));
    }
    renderRadios(value, options) {
        let content = this.tag.values.map((item, index) => {
            return React.createElement("div", { className: "col", key: index }, this.renderRadio(item, value, options));
        });
        return this.renderView(options, content);
    }
    renderChecks(values, options) {
        var _a;
        let arr = (_a = values) === null || _a === void 0 ? void 0 : _a.split('|').map(v => Number(v));
        let content = this.tag.values.map((item, index) => {
            var _a;
            let checked = ((_a = arr) === null || _a === void 0 ? void 0 : _a.indexOf(item.id)) >= 0;
            return React.createElement("div", { className: "col", key: index }, this.renderCheck(item, checked, options));
        });
        return this.renderView(options, content);
    }
    renderView(options, content) {
        let { className } = options;
        return React.createElement("div", { className: className, style: radioStyle },
            React.createElement("div", { className: "row row-cols-2 row-cols-sm-3 row-cols-md-4" }, content));
    }
    renderRadio(item, value, options) {
        let { id, name, ext } = item;
        let { inputs, inputName, onInputChange } = options;
        let ref = inputs && ((input) => inputs[id] = input);
        return React.createElement("label", { className: "form-radio-inline" },
            React.createElement("input", { ref: ref, type: "radio", name: inputName, value: id, defaultChecked: value === id, onChange: onInputChange }),
            name);
    }
    renderCheck(item, checked, options) {
        let { id, name, ext } = item;
        let { inputs, onInputChange } = options;
        let ref = inputs && ((input) => inputs[id] = input);
        return React.createElement("label", { className: "form-radio-inline" },
            React.createElement("input", { ref: ref, type: "checkbox", value: id, defaultChecked: checked, onChange: onInputChange }),
            name);
    }
}
//# sourceMappingURL=tagView.js.map