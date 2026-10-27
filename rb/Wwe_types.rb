# frozen_string_literal: true

# Typed models for the Wwe SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Gallery entity data model.
#
# @!attribute [rw] galleries
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
Gallery = Struct.new(
  :galleries,
  :id,
  keyword_init: true
)

# Request payload for Gallery#load.
#
# @!attribute [rw] items_offset
#   @return [Integer]
#
# @!attribute [rw] items_per_page
#   @return [Integer]
#
# @!attribute [rw] node_id
#   @return [Integer]
GalleryLoadMatch = Struct.new(
  :items_offset,
  :items_per_page,
  :node_id,
  keyword_init: true
)

# Superstar entity data model.
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
Superstar = Struct.new(
  :url,
  :value,
  keyword_init: true
)

# Request payload for Superstar#list.
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
SuperstarListMatch = Struct.new(
  :url,
  :value,
  keyword_init: true
)

# Video entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] numSponsors
#   @return [Boolean, nil]
#
# @!attribute [rw] playlist
#   @return [Array]
#
# @!attribute [rw] source_log
#   @return [String, nil]
#
# @!attribute [rw] sponsors
#   @return [String, nil]
#
# @!attribute [rw] takeover_bg
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] videos
#   @return [Array]
Video = Struct.new(
  :id,
  :numSponsors,
  :playlist,
  :source_log,
  :sponsors,
  :takeover_bg,
  :title,
  :videos,
  keyword_init: true
)

# Request payload for Video#load.
#
# @!attribute [rw] parent_playlist_id
#   @return [Integer, nil]
#
# @!attribute [rw] playlist_id
#   @return [Integer]
#
# @!attribute [rw] playlist_offset
#   @return [Integer, nil]
#
# @!attribute [rw] video_id
#   @return [Integer]
#
# @!attribute [rw] video_offset
#   @return [Integer, nil]
VideoLoadMatch = Struct.new(
  :parent_playlist_id,
  :playlist_id,
  :playlist_offset,
  :video_id,
  :video_offset,
  keyword_init: true
)

