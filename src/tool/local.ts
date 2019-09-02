import {User, Guest, Unit} from './user';
import { localDb } from './localDb';

/*
export interface ClearableData {
    clear(): void;
}

export class Data<T> implements ClearableData {
    private name: string;
    private value?: T;
    constructor(name: string) {this.name = name; }
    get(): T {
        if (this.value !== undefined) return this.value;
        let v = localStorage.getItem(this.name);
        return this.value = v === null ? undefined : JSON.parse(v); 
    }
    set(value: T) {
        if (!value) { this.clear(); return; }
        this.value = value;
        localStorage.setItem(this.name, JSON.stringify(value));
    }
    clear() {
        this.value = undefined;
        localStorage.removeItem(this.name);
    }
}
*/

export class LocalData {
    user = localDb.child<User>('user');
    guest = localDb.child<Guest>('guest');
    unit = localDb.child<Unit>('unit');

    logoutClear() {
        [
            this.user,
            this.unit,
        ].forEach(d => d.remove());
    }
}
