package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Wwe",
			"slug": "wwe",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://www.wwe.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"gallery": map[string]any{},
				"superstar": map[string]any{},
				"video": map[string]any{},
			},
		},
		"entity": map[string]any{
			"gallery": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "galleries",
						"title": "Galleries",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"node_id",
						"items_per_page",
						"items_offset",
					},
					"sep": "/",
				},
				"name": "gallery",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/gallery-related/{nodeId}/{itemsPerPage}/{itemsOffset}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gallery-related",
									},
									map[string]any{
										"var": "node_id",
									},
									map[string]any{
										"var": "items_per_page",
									},
									map[string]any{
										"var": "items_offset",
									},
								},
								"parts": []any{
									"api",
									"gallery-related",
									"{node_id}",
									"{items_per_page}",
									"{items_offset}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"itemsOffset": "items_offset",
										"itemsPerPage": "items_per_page",
										"nodeId": "node_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "items_offset",
											"orig": "itemsOffset",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 0,
										},
										map[string]any{
											"name": "items_per_page",
											"orig": "itemsPerPage",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 14,
										},
										map[string]any{
											"name": "node_id",
											"orig": "nodeId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 50011841,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"items_offset",
										"items_per_page",
										"node_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"superstar": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Site-relative profile path, e.g.",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
						"short": "Superstar display name in upper case, e.g.",
					},
				},
				"name": "superstar",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/superstar/talent",
								"segments": []any{
									map[string]any{
										"lit": "superstar",
									},
									map[string]any{
										"lit": "talent",
									},
								},
								"parts": []any{
									"superstar",
									"talent",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "talent",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"video": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "numSponsors",
						"title": "Num Sponsors",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "playlist",
						"title": "Playlist",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "source_log",
						"title": "Source Log",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sponsors",
						"title": "Sponsors",
						"type": "`$STRING`",
						"short": "Empty string in probes.",
					},
					map[string]any{
						"name": "takeover_bg",
						"title": "Takeover Bg",
						"type": "`$STRING`",
						"short": "Background image path.",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Playlist title, e.g.",
					},
					map[string]any{
						"name": "videos",
						"title": "Videos",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"video_id",
						"playlist_id",
						"playlist_offset",
						"parent_playlist_id",
						"video_offset",
					},
					"sep": "/",
				},
				"name": "video",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/video-playlist/{videoId}/{playlistId}/{playlistOffset}/{parentPlaylistId}/{videoOffset}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "video-playlist",
									},
									map[string]any{
										"var": "video_id",
									},
									map[string]any{
										"var": "playlist_id",
									},
									map[string]any{
										"var": "playlist_offset",
									},
									map[string]any{
										"var": "parent_playlist_id",
									},
									map[string]any{
										"var": "video_offset",
									},
								},
								"parts": []any{
									"api",
									"video-playlist",
									"{video_id}",
									"{playlist_id}",
									"{playlist_offset}",
									"{parent_playlist_id}",
									"{video_offset}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"parentPlaylistId": "parent_playlist_id",
										"playlistId": "playlist_id",
										"playlistOffset": "playlist_offset",
										"videoId": "video_id",
										"videoOffset": "video_offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "parent_playlist_id",
											"orig": "parentPlaylistId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 0,
										},
										map[string]any{
											"name": "playlist_id",
											"orig": "playlistId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 0,
										},
										map[string]any{
											"name": "playlist_offset",
											"orig": "playlistOffset",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 0,
										},
										map[string]any{
											"name": "video_id",
											"orig": "videoId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 50011841,
										},
										map[string]any{
											"name": "video_offset",
											"orig": "videoOffset",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"parent_playlist_id",
										"playlist_id",
										"playlist_offset",
										"video_id",
										"video_offset",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/featured-videos/{videoId}/{playlistId}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "featured-videos",
									},
									map[string]any{
										"var": "video_id",
									},
									map[string]any{
										"var": "playlist_id",
									},
								},
								"parts": []any{
									"api",
									"featured-videos",
									"{video_id}",
									"{playlist_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "playlist_id",
										"videoId": "video_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "playlist_id",
											"orig": "playlistId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 0,
										},
										map[string]any{
											"name": "video_id",
											"orig": "videoId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 50011841,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"playlist_id",
										"video_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/highlight-videos/{videoId}/{playlistId}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "highlight-videos",
									},
									map[string]any{
										"var": "video_id",
									},
									map[string]any{
										"var": "playlist_id",
									},
								},
								"parts": []any{
									"api",
									"highlight-videos",
									"{video_id}",
									"{playlist_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "playlist_id",
										"videoId": "video_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "playlist_id",
											"orig": "playlistId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 0,
										},
										map[string]any{
											"name": "video_id",
											"orig": "videoId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 50011841,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"playlist_id",
										"video_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
