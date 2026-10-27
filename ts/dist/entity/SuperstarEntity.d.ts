import { WweEntityBase } from '../WweEntityBase';
import type { WweSDK } from '../WweSDK';
import type { Control } from '../types';
import type { Superstar, SuperstarListMatch } from '../WweTypes';
declare class SuperstarEntity extends WweEntityBase<Superstar> {
    constructor(client: WweSDK, entopts: any);
    make(this: SuperstarEntity): SuperstarEntity;
    list(this: any, reqmatch?: SuperstarListMatch, ctrl?: Control): Promise<SuperstarEntity[]>;
}
export { SuperstarEntity };
