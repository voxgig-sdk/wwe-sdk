import { WweEntityBase } from '../WweEntityBase';
import type { WweSDK } from '../WweSDK';
import type { Control } from '../types';
import type { Gallery, GalleryLoadMatch } from '../WweTypes';
declare class GalleryEntity extends WweEntityBase<Gallery> {
    constructor(client: WweSDK, entopts: any);
    make(this: GalleryEntity): GalleryEntity;
    load(this: any, reqmatch?: GalleryLoadMatch, ctrl?: Control): Promise<GalleryEntity>;
}
export { GalleryEntity };
