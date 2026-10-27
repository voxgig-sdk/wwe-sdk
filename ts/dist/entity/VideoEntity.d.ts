import { WweEntityBase } from '../WweEntityBase';
import type { WweSDK } from '../WweSDK';
import type { Control } from '../types';
import type { Video, VideoLoadMatch } from '../WweTypes';
declare class VideoEntity extends WweEntityBase<Video> {
    constructor(client: WweSDK, entopts: any);
    make(this: VideoEntity): VideoEntity;
    load(this: any, reqmatch?: VideoLoadMatch, ctrl?: Control): Promise<VideoEntity>;
}
export { VideoEntity };
