// Typed models for the Wwe SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Gallery {
  galleries: any[]
  id?: string
}

export interface GalleryLoadMatch {
  items_offset: number
  items_per_page: number
  node_id: number
}

export interface Superstar {
  url: string
  value: string
}

export interface SuperstarListMatch {
  url?: string
  value?: string

  // Selects a custom action instead of the plain list:
  //   'talent'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Video {
  id?: string
  numSponsors?: boolean
  playlist: any[]
  source_log?: string
  sponsors?: string
  takeover_bg?: string
  title?: string
  videos: any[]
}

export interface VideoLoadMatch {
  parent_playlist_id?: number
  playlist_id: number
  playlist_offset?: number
  video_id: number
  video_offset?: number
}

