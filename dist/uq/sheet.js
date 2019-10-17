var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Entity } from './entity';
import { PageItems } from '../tool/pageItems';
import { EntityCaller } from './caller';
export class Sheet extends Entity {
    get typeName() { return 'sheet'; }
    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/
    setSchema(schema) {
        super.setSchema(schema);
        this.states = schema.states;
    }
    build(obj) {
        this.states = [];
        for (let op of obj.ops) {
            this.states.push({ name: op, actions: undefined });
        }
        /*
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: this.states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    }
    createSheetState(name, obj) {
        let ret = { name: name, actions: [] };
        let actions = ret.actions;
        for (let p in obj) {
            let action = { name: p };
            actions.push(action);
        }
        return ret;
    }
    /*
    private setStateAccess(s:SheetState, s1:SheetState) {
        if (s === undefined) return;
        for (let action of s1.actions) {
            let acn = action.name;
            let ac = s.actions.find(a=>a.name === acn);
            if (ac === undefined) continue;
            s.actions.push(action);
        }
    }*/
    save(discription, data) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let {id} = this.uq;
            let text = this.pack(data);
    
            let ret = await this.uqApi.sheetSave(this.name, );
            return ret;
            */
            let { id } = this.uq;
            //let text = this.pack(data);
            let params = { app: id, discription: discription, data: data };
            return yield new SaveCaller(this, params).request();
            /*
            let {id, state} = ret;
            if (id > 0) this.changeStateCount(state, 1);
            return ret;
            */
        });
    }
    action(id, flow, state, action) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            return await this.uqApi.sheetAction(this.name, {id:id, flow:flow, state:state, action:action});
            */
            return yield new ActionCaller(this, { id: id, flow: flow, state: state, action: action }).request();
        });
    }
    unpack(data) {
        //if (this.schema === undefined) await this.loadSchema();
        let ret = data[0];
        let brief = ret[0];
        let sheetData = this.unpackSheet(brief.data);
        let flows = data[1];
        return {
            brief: brief,
            data: sheetData,
            flows: flows,
        };
    }
    getSheet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.getSheet(this.name, id);
            */
            let ret = yield new GetSheetCaller(this, id).request();
            if (ret[0].length === 0)
                return yield this.getArchive(id);
            return this.unpack(ret);
        });
    }
    getArchive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.sheetArchive(this.name, id)
            return this.unpack(ret);
            */
            let ret = yield new SheetArchiveCaller(this, id).request();
            return this.unpack(ret);
        });
    }
    getArchives(pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.sheetArchives(this.name, {pageStart:pageStart, pageSize:pageSize});
            return ret;
            */
            let params = { pageStart: pageStart, pageSize: pageSize };
            return yield new SheetArchivesCaller(this, params).request();
        });
    }
    getStateSheets(state, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.stateSheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
            return ret;
            */
            let params = { state: state, pageStart: pageStart, pageSize: pageSize };
            return yield new StateSheetsCaller(this, params).request();
        });
    }
    createPageStateItems() { return new PageStateItems(this); }
    stateSheetCount() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret:StateCount[] = await this.uqApi.stateSheetCount(this.name);
            return this.states.map(s => {
                let n = s.name, count = 0;
                let r = ret.find(v => v.state === n);
                if (r !== undefined) count = r.count;
                return {state: n, count: count}
            });
            */
            return yield new StateSheetCountCaller(this, undefined).request();
        });
    }
    userSheets(state, user, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = { state: state, user: user, pageStart: pageStart, pageSize: pageSize };
            return yield new UserSheetsCaller(this, params).request();
        });
    }
    mySheets(state, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.mySheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
            return ret;
            */
            let params = { state: state, pageStart: pageStart, pageSize: pageSize };
            return yield new MySheetsCaller(this, params).request();
        });
    }
}
class SheetCaller extends EntityCaller {
    get entity() { return this._entity; }
    get path() { return `sheet/${this.entity.name}/${this.suffix}`; }
}
class SaveCaller extends SheetCaller {
    get path() { return `sheet/${this.entity.name}`; }
    buildParams() {
        let { app, discription, data } = this.params;
        return {
            app: app,
            discription: discription,
            data: this.entity.pack(data)
        };
    }
}
class ActionCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.method = 'PUT';
        //buildParams() {return this.entity.buildParams(this.params);}
    }
    get path() { return `sheet/${this.entity.name}`; }
}
class GetSheetCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        //protected readonly params: number;  // id
        this.method = 'GET';
    }
    //private id:number;
    //protected readonly suffix = 'archive';
    buildParams() { }
    get path() { return `sheet/${this.entity.name}/get/${this.params}`; }
}
class SheetArchiveCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
    }
    //protected readonly suffix = 'archive';
    buildParams() { }
    get path() { return `sheet/${this.entity.name}/archive/${this.params}`; }
}
class SheetArchivesCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'archives';
    }
}
class StateSheetsCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'states';
    }
}
class StateSheetCountCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
        this.suffix = 'statecount';
    }
    xresult(res) {
        let { states } = this.entity;
        return states.map(s => {
            let n = s.name, count = 0;
            let r = res.find(v => v.state === n);
            if (r !== undefined)
                count = r.count;
            return { state: n, count: count };
        });
    }
}
class UserSheetsCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'user-sheets';
    }
    xresult(res) {
        return res;
    }
}
class MySheetsCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'my-sheets';
    }
    xresult(res) {
        return res;
    }
}
export class PageStateItems extends PageItems {
    constructor(sheet) {
        super(true);
        this.sheet = sheet;
        this.pageSize = 10;
    }
    load(param, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.sheet.getStateSheets(param, pageStart, pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
//# sourceMappingURL=sheet.js.map