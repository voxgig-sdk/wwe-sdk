import { GalleryEntity } from './entity/GalleryEntity';
import { SuperstarEntity } from './entity/SuperstarEntity';
import { VideoEntity } from './entity/VideoEntity';
export type * from './WweTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WweEntityBase } from './WweEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class WweSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Gallery(entopts?: Record<string, any>): GalleryEntity;
    Superstar(entopts?: Record<string, any>): SuperstarEntity;
    Video(entopts?: Record<string, any>): VideoEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WweSDK;
    tester(testopts?: any, sdkopts?: any): WweSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WweSDK;
export { stdutil, config, BaseFeature, WweEntityBase, WweSDK, SDK, };
export type { DirectResult };
