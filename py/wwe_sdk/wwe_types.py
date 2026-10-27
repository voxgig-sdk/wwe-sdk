# Typed models for the Wwe SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GalleryRequired(TypedDict):
    galleries: list


class Gallery(GalleryRequired, total=False):
    id: str


class GalleryLoadMatch(TypedDict):
    items_offset: int
    items_per_page: int
    node_id: int


class Superstar(TypedDict):
    url: str
    value: str


class SuperstarListMatch(TypedDict, total=False):
    url: str
    value: str


class VideoRequired(TypedDict):
    playlist: list
    videos: list


class Video(VideoRequired, total=False):
    id: str
    numSponsors: bool
    source_log: str
    sponsors: str
    takeover_bg: str
    title: str


class VideoLoadMatchRequired(TypedDict):
    playlist_id: int
    video_id: int


class VideoLoadMatch(VideoLoadMatchRequired, total=False):
    parent_playlist_id: int
    playlist_offset: int
    video_offset: int
