export interface Gallery {
    galleries: any[];
    id?: string;
}
export interface GalleryLoadMatch {
    items_offset: number;
    items_per_page: number;
    node_id: number;
}
export interface Superstar {
    url: string;
    value: string;
}
export interface SuperstarListMatch {
    url?: string;
    value?: string;
    $action?: string;
    [action: string]: any;
}
export interface Video {
    id?: string;
    numSponsors?: boolean;
    playlist: any[];
    source_log?: string;
    sponsors?: string;
    takeover_bg?: string;
    title?: string;
    videos: any[];
}
export interface VideoLoadMatch {
    parent_playlist_id?: number;
    playlist_id: number;
    playlist_offset?: number;
    video_id: number;
    video_offset?: number;
}
