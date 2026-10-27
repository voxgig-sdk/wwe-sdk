-- Typed models for the Wwe SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Gallery
---@field galleries table
---@field id? string

---@class GalleryLoadMatch
---@field items_offset number
---@field items_per_page number
---@field node_id number

---@class Superstar
---@field url string
---@field value string

---@class SuperstarListMatch
---@field url? string
---@field value? string

---@class Video
---@field id? string
---@field numSponsors? boolean
---@field playlist table
---@field source_log? string
---@field sponsors? string
---@field takeover_bg? string
---@field title? string
---@field videos table

---@class VideoLoadMatch
---@field parent_playlist_id? number
---@field playlist_id number
---@field playlist_offset? number
---@field video_id number
---@field video_offset? number

local M = {}

return M
