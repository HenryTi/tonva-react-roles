var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { factory } from './widgets';
import { ContextContainer } from './context';
var FormField = /** @class */ (function (_super) {
    __extends(FormField, _super);
    function FormField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormField.prototype.render = function () {
        var _a = this.props, name = _a.name, children = _a.children;
        var context = this.context;
        if (context === undefined)
            return React.createElement("span", { className: "text-danger" }, "!only in Form!");
        var itemSchema = context.getItemSchema(name);
        var content = factory(context, itemSchema, children, this.props);
        if (content === undefined) {
            return React.createElement("span", { className: "text-danger" },
                "!!",
                name,
                " is not defined!!");
        }
        return content;
    };
    FormField.contextType = ContextContainer;
    return FormField;
}(React.Component));
export { FormField };
//# sourceMappingURL=field.js.map