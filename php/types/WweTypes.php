<?php
declare(strict_types=1);

// Typed models for the Wwe SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Gallery entity data model. */
class Gallery
{
    public array $galleries;
    public ?string $id = null;
}

/** Request payload for Gallery#load. */
class GalleryLoadMatch
{
    public int $items_offset;
    public int $items_per_page;
    public int $node_id;
}

/** Superstar entity data model. */
class Superstar
{
    public string $url;
    public string $value;
}

/** Request payload for Superstar#list. */
class SuperstarListMatch
{
    public ?string $url = null;
    public ?string $value = null;
}

/** Video entity data model. */
class Video
{
    public ?string $id = null;
    public ?bool $numSponsors = null;
    public array $playlist;
    public ?string $source_log = null;
    public ?string $sponsors = null;
    public ?string $takeover_bg = null;
    public ?string $title = null;
    public array $videos;
}

/** Request payload for Video#load. */
class VideoLoadMatch
{
    public ?int $parent_playlist_id = null;
    public int $playlist_id;
    public ?int $playlist_offset = null;
    public int $video_id;
    public ?int $video_offset = null;
}

