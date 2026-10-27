// Typed models for the Wwe SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/wwe-sdk/go/core"
)

// Gallery is the typed data model for the gallery entity.
type Gallery struct {
}

// GalleryLoadMatch is the typed request payload for Gallery.LoadTyped.
type GalleryLoadMatch struct {
	ItemsOffset int `json:"items_offset"`
	ItemsPerPage int `json:"items_per_page"`
	NodeId int `json:"node_id"`
}

// Superstar is the typed data model for the superstar entity.
type Superstar struct {
}

// SuperstarListMatch is the typed request payload for Superstar.ListTyped.
type SuperstarListMatch struct {
	Url *string `json:"url,omitempty"`
	Value *string `json:"value,omitempty"`
}

// Video is the typed data model for the video entity.
type Video struct {
}

// VideoLoadMatch is the typed request payload for Video.LoadTyped.
type VideoLoadMatch struct {
	ParentPlaylistId *int `json:"parent_playlist_id,omitempty"`
	PlaylistId int `json:"playlist_id"`
	PlaylistOffset *int `json:"playlist_offset,omitempty"`
	VideoId int `json:"video_id"`
	VideoOffset *int `json:"video_offset,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
