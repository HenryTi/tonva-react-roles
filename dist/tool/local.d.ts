import { User, Guest, Unit } from './user';
export declare class LocalData {
    user: import("./localDb").LocalCache<User>;
    guest: import("./localDb").LocalCache<Guest>;
    unit: import("./localDb").LocalCache<Unit>;
    logoutClear(): void;
}
