var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from 'lodash';
import { Entity } from '../entity';
import { EntityCaller } from '../caller';
import { IdCache, IdDivCache } from './idCache';
export class Tuid extends Entity {
    constructor() {
        super(...arguments);
        this.typeName = 'tuid';
        this.isImport = false;
    }
    /*
    constructor(uq:UqMan, name:string, typeId:number) {
        super(uq, name, typeId)
    }*/
    setSchema(schema) {
        super.setSchema(schema);
        let { id } = schema;
        this.idName = id;
    }
    buildTuidBox() {
        return new TuidBox(this);
    }
    getIdFromObj(obj) { return obj[this.idName]; }
    stopCache() { this.noCache = true; }
    equ(id1, id2) {
        if (id1 === undefined)
            return false;
        if (id2 === undefined)
            return false;
        if (typeof id1 === 'object') {
            return id1.equ(id2);
        }
        if (typeof id2 === 'object') {
            return id2.equ(id1);
        }
        return id1 === id2;
    }
    cacheIds() { }
    modifyIds(ids) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
export class TuidInner extends Tuid {
    constructor(uq, name, typeId) {
        super(uq, name, typeId);
        this.idCache = new IdCache(this);
        this.localArr = this.cache.arr(this.name + '.whole');
        if (uq.newVersion === true)
            this.localArr.removeAll();
    }
    setSchema(schema) {
        super.setSchema(schema);
        let { arrs } = schema;
        if (arrs !== undefined) {
            this.divs = {};
            for (let arr of arrs) {
                let { name } = arr;
                let tuidDiv = new TuidDiv(this.uq, this, name);
                this.divs[name] = tuidDiv;
                tuidDiv.setSchema(arr);
                tuidDiv.buildFieldsTuid();
            }
        }
    }
    useId(id, defer) {
        if (this.noCache === true)
            return;
        this.idCache.useId(id, defer);
    }
    boxId(id) {
        if (typeof id === 'object')
            return id;
        this.useId(id);
        let { createBoxId } = this.uq;
        if (!createBoxId)
            return { id: id };
        return createBoxId(this, id);
    }
    valueFromId(id) { return this.idCache.getValue(id); }
    assureBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idCache.assureObj(id);
        });
    }
    cacheIds() {
        this.idCache.cacheIds();
        if (this.divs === undefined)
            return;
        for (let i in this.divs)
            this.divs[i].cacheIds();
    }
    modifyIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idCache.modifyIds(ids);
        });
    }
    cacheTuids(defer) { this.uq.cacheTuids(defer); }
    get hasDiv() { return this.divs !== undefined; }
    div(name) {
        return this.divs && this.divs[name];
    }
    loadTuidIds(divName, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield new IdsCaller(this, { divName: divName, ids: ids }, false).request();
            if (ret.length > 0)
                this.cached = true;
            return ret;
        });
    }
    loadMain(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id === 'object')
                id = id.id;
            yield this.idCache.assureObj(id);
            return this.idCache.valueFromId(id);
        });
    }
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined || id === 0)
                return;
            //let cacheValue = this.idCache.valueFromId(id); 
            //if (typeof cacheValue === 'object') return cacheValue;
            if (typeof id === 'object')
                id = id.id;
            let valuesText = this.localArr.getItem(id);
            let values;
            if (valuesText) {
                values = JSON.parse(valuesText);
            }
            else {
                values = yield new GetCaller(this, id).request();
                if (values !== undefined) {
                    this.localArr.setItem(id, JSON.stringify(values));
                }
            }
            if (values === undefined)
                return;
            for (let f of this.schema.fields) {
                let { tuid } = f;
                if (tuid === undefined)
                    continue;
                let t = this.uq.getTuid(tuid);
                if (t === undefined)
                    continue;
                let n = f.name;
                values[n] = t.boxId(values[n]);
            }
            this.idCache.cacheValue(values);
            this.cacheTuidFieldValues(values);
            return values;
        });
    }
    cacheTuidFieldValues(values) {
        let { fields, arrs } = this.schema;
        this.cacheFieldsInValue(values, fields);
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let { name, fields } = arr;
                let arrValues = values[name];
                if (arrValues === undefined)
                    continue;
                let tuidDiv = this.div(name);
                for (let row of arrValues) {
                    //row._$tuid = tuidDiv;
                    //row.$owner = this.boxId(row.owner);
                    tuidDiv.cacheValue(row);
                    this.cacheFieldsInValue(row, fields);
                }
            }
        }
    }
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields } = this.schema;
        if (mainFields === undefined)
            debugger;
        this.uq.buildFieldTuid(this.cacheFields = mainFields || this.fields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
    save(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            let {fields} = this.schema;
            let params:any = {$id: id};
            for (let field of fields as Field[]) {
                let {name, tuid, type} = field;
                let val = props[name];
                if (tuid !== undefined) {
                    if (typeof val === 'object') {
                        if (val !== null) val = val.id;
                    }
                }
                else {
                    switch (type) {
                        case 'date':
                        case 'datetime':
                            val = new Date(val).toISOString();
                            val = (val as string).replace('T', ' ');
                            val = (val as string).replace('Z', '');
                            break;
                    }
                }
                params[name] = val;
            }
            let ret = await this.uqApi.tuidSave(this.name, params);
            return ret;
            */
            let ret = new SaveCaller(this, { id: id, props: props }).request();
            if (id !== undefined) {
                this.idCache.remove(id);
                this.localArr.removeItem(id);
            }
            return ret;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield new AllCaller(this, {}).request();
            return ret;
        });
    }
    search(key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.searchArr(undefined, key, pageStart, pageSize);
            return ret;
        });
    }
    searchArr(owner, key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            //let api = this.uqApi;
            //let ret = await api.tuidSearch(this.name, undefined, owner, key, pageStart, pageSize);
            let params = { arr: undefined, owner: owner, key: key, pageStart: pageStart, pageSize: pageSize };
            let ret = yield new SearchCaller(this, params).request();
            let { fields } = this.schema;
            for (let row of ret) {
                this.cacheFieldsInValue(row, fields);
            }
            return ret;
        });
    }
    loadArr(arr, owner, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined || id === 0)
                return;
            //let api = this.uqApi;
            //return await api.tuidArrGet(this.name, arr, owner, id);
            return yield new LoadArrCaller(this, { arr: arr, owner: owner, id: id }).request();
        });
    }
    saveArr(arr, owner, id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            //let params = _.clone(props);
            //params["$id"] = id;
            //return await this.uqApi.tuidArrSave(this.name, arr, owner, params);
            return yield new SaveArrCaller(this, { arr: arr, owner: owner, id: id, props: props }).request();
        });
    }
    posArr(arr, owner, id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            //return await this.uqApi.tuidArrPos(this.name, arr, owner, id, order);
            return yield new ArrPosCaller(this, { arr: arr, owner: owner, id: id, order: order }).request();
        });
    }
}
class TuidCaller extends EntityCaller {
    get entity() { return this._entity; }
    ;
}
// 包含main字段的load id
// 当前为了兼容，先调用的包含所有字段的内容
class GetCaller extends TuidCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
    }
    get path() { return `tuid/${this.entity.name}/${this.params}`; }
}
class IdsCaller extends TuidCaller {
    get path() {
        let { divName } = this.params;
        return `tuidids/${this.entity.name}/${divName !== undefined ? divName : '$'}`;
    }
    buildParams() { return this.params.ids; }
    xresult(res) {
        return res.split('\n');
    }
}
class SaveCaller extends TuidCaller {
    get path() { return `tuid/${this.entity.name}`; }
    buildParams() {
        let { fields, arrs } = this.entity.schema;
        let { id, props } = this.params;
        let params = { $id: id };
        this.transParams(params, props, fields);
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let arrName = arr.name;
                let arrParams = [];
                let arrFields = arr.fields;
                let arrValues = props[arrName];
                if (arrValues !== undefined) {
                    for (let arrValue of arrValues) {
                        let row = {};
                        this.transParams(row, arrValue, arrFields);
                        arrParams.push(row);
                    }
                }
                params[arrName] = arrParams;
            }
        }
        return params;
    }
    transParams(values, params, fields) {
        if (params === undefined)
            return;
        for (let field of fields) {
            let { name, tuid, type } = field;
            let val = params[name];
            if (tuid !== undefined) {
                if (typeof val === 'object') {
                    if (val !== null)
                        val = val.id;
                }
            }
            else {
                switch (type) {
                    case 'date':
                        val = this.entity.buildDateParam(val);
                        //val = (val as string).replace('T', ' ');
                        //val = (val as string).replace('Z', '');
                        break;
                    case 'datetime':
                        val = this.entity.buildDateTimeParam(val);
                        //val = new Date(val).toISOString();
                        //val = (val as string).replace('T', ' ');
                        //val = (val as string).replace('Z', '');
                        break;
                }
            }
            values[name] = val;
        }
    }
}
class SearchCaller extends TuidCaller {
    get path() { return `tuids/${this.entity.name}`; }
}
class AllCaller extends TuidCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
    }
    get path() { return `tuid-all/${this.entity.name}`; }
}
class LoadArrCaller extends TuidCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
    }
    get path() {
        let { arr, owner, id } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/${id}`;
    }
}
class SaveArrCaller extends TuidCaller {
    get path() {
        let { arr, owner } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id, props } = this.params;
        let params = _.clone(props);
        params['$id'] = id;
        return params;
    }
}
class ArrPosCaller extends TuidCaller {
    get path() {
        let { arr, owner } = this.params;
        return `tuid-arr-pos/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id, order } = this.params;
        return { bid: id, $order: order };
    }
}
export class TuidImport extends Tuid {
    constructor(uq, name, typeId, from) {
        super(uq, name, typeId);
        this.isImport = true;
        this.from = from;
    }
    setFrom(tuidLocal) { this.tuidLocal = tuidLocal; }
    useId(id) { this.tuidLocal.useId(id); }
    boxId(id) { return this.tuidLocal.boxId(id); }
    valueFromId(id) { return this.tuidLocal.valueFromId(id); }
    assureBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidLocal.assureBox(id);
        });
    }
    get hasDiv() { return this.tuidLocal.hasDiv; }
    div(name) { return this.tuidLocal.div(name); }
    loadMain(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tuidLocal.loadMain(id);
            return ret;
        });
    }
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.load(id);
        });
    }
    save(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.save(id, props);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.all();
        });
    }
    search(key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.search(key, pageStart, pageSize);
        });
    }
    searchArr(owner, key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.searchArr(owner, key, pageStart, pageSize);
        });
    }
    loadArr(arr, owner, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.loadArr(arr, owner, id);
        });
    }
    saveArr(arr, owner, id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidLocal.saveArr(arr, owner, id, props);
        });
    }
    posArr(arr, owner, id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidLocal.posArr(arr, owner, id, order);
        });
    }
}
// field._tuid 用这个接口
// Tuid, TuidDiv 实现这个接口
export class TuidBox {
    constructor(tuid) {
        this.ownerField = undefined;
        this.tuid = tuid;
    }
    boxId(id) {
        return this.tuid.boxId(id);
    }
    getIdFromObj(obj) {
        return this.tuid.getIdFromObj(obj);
    }
    useId(id) {
        return this.tuid.useId(id);
    }
    showInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            alert('showInfo not implemented');
        });
    }
}
export class TuidDiv extends TuidInner /* Entity*/ {
    //ui: React.StatelessComponent<any>;
    //res: any;
    constructor(uq, tuid, name) {
        super(uq, name, 0);
        this.typeName = 'div';
        this.tuid = tuid;
        this.idName = 'id';
        this.idCache = new IdDivCache(tuid, this);
    }
    get owner() { return this.tuid; }
    /*
    setSchema(schema:any) {
        super.setSchema(schema);
        this.buildFieldsTuid();
    }*/
    /*
    setUIRes(ui:any, res:any) {
        this.ui = ui && ui.content;
        this.res = res;
    }
    */
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields } = this.schema;
        if (mainFields === undefined)
            debugger;
        this.uq.buildFieldTuid(this.cacheFields = mainFields);
    }
    buildTuidDivBox(ownerField) {
        return new TuidBoxDiv(this.tuid, this, ownerField);
    }
    getIdFromObj(obj) { return obj[this.idName]; }
    cacheValue(value) {
        this.idCache.cacheValue(value);
    }
    useId(id, defer) {
        if (this.noCache === true)
            return;
        this.idCache.useId(id, defer);
    }
    /*
    boxId(id:number):BoxId {
        if (typeof id === 'object') return id;
        this.useId(id);
        //return new BoxDivId(this.tuid, this, id);
        return this.tuid.boxDivId(this, id);
    }
    */
    valueFromId(id) {
        return this.idCache.getValue(id);
    }
    assureBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idCache.assureObj(id);
        });
    }
    cacheIds() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idCache.cacheIds();
        });
    }
    cacheTuidFieldValues(values) {
        let fields = this.schema.fields;
        this.cacheFieldsInValue(values, fields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
}
export class TuidBoxDiv extends TuidBox {
    constructor(tuid, div, ownerField) {
        super(tuid);
        this.div = div;
        this.ownerField = ownerField;
    }
    boxId(id) {
        return this.div.boxId(id);
    }
    getIdFromObj(obj) {
        return this.div.getIdFromObj(obj);
    }
    useId(id) {
        return this.div.useId(id);
    }
}
//# sourceMappingURL=tuid.js.map