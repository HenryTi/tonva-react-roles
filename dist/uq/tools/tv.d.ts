/// <reference types="react" />
import { BoxId } from '../uqs';
export declare type TvTemplet = (values?: any, x?: any) => JSX.Element;
export declare const tv: (tuidValue: number | BoxId, ui?: TvTemplet, x?: any, nullUI?: () => JSX.Element) => JSX.Element;
