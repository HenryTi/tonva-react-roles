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
import { Query } from './query';
import { QueryQueryCaller } from './caller';
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'book';
        return _this;
    }
    Object.defineProperty(Book.prototype, "typeName", {
        get: function () { return 'book'; },
        enumerable: false,
        configurable: true
    });
    Book.prototype.queryCaller = function (params) {
        return new BookQueryCaller(this, params);
    };
    return Book;
}(Query));
export { Book };
var BookQueryCaller = /** @class */ (function (_super) {
    __extends(BookQueryCaller, _super);
    function BookQueryCaller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BookQueryCaller.prototype, "path", {
        get: function () { return "book/" + this.entity.name; },
        enumerable: false,
        configurable: true
    });
    return BookQueryCaller;
}(QueryQueryCaller));
export { BookQueryCaller };
//# sourceMappingURL=book.js.map