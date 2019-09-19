import { Query } from './query';
import { QueryQueryCaller } from './caller';
export class Book extends Query {
    constructor() {
        super(...arguments);
        this.queryApiName = 'book';
    }
    get typeName() { return 'book'; }
    queryCaller(params) {
        return new BookQueryCaller(this, params);
    }
}
export class BookQueryCaller extends QueryQueryCaller {
    //protected get entity(): Query {return this._entity as Query};
    get path() { return `book/${this.entity.name}`; }
}
//# sourceMappingURL=book.js.map