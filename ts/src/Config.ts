
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Wwe',
        slug: "wwe",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://www.wwe.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        gallery: {
        },
  
        superstar: {
        },
  
        video: {
        },
  
    }
  }


  entity = {
    "gallery": {
      "fields": [
        {
          "name": "galleries",
          "title": "Galleries",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "node_id",
          "items_per_page",
          "items_offset"
        ],
        "sep": "/"
      },
      "name": "gallery",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/gallery-related/{nodeId}/{itemsPerPage}/{itemsOffset}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "gallery-related"
                },
                {
                  "var": "node_id"
                },
                {
                  "var": "items_per_page"
                },
                {
                  "var": "items_offset"
                }
              ],
              "parts": [
                "api",
                "gallery-related",
                "{node_id}",
                "{items_per_page}",
                "{items_offset}"
              ],
              "rename": {
                "param": {
                  "itemsOffset": "items_offset",
                  "itemsPerPage": "items_per_page",
                  "nodeId": "node_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "items_offset",
                    "orig": "itemsOffset",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 0
                  },
                  {
                    "name": "items_per_page",
                    "orig": "itemsPerPage",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 14
                  },
                  {
                    "name": "node_id",
                    "orig": "nodeId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 50011841
                  }
                ]
              },
              "select": {
                "exist": [
                  "items_offset",
                  "items_per_page",
                  "node_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "superstar": {
      "fields": [
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Site-relative profile path, e.g."
        },
        {
          "name": "value",
          "title": "Value",
          "type": "`$STRING`",
          "req": true,
          "short": "Superstar display name in upper case, e.g."
        }
      ],
      "name": "superstar",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/superstar/talent",
              "segments": [
                {
                  "lit": "superstar"
                },
                {
                  "lit": "talent"
                }
              ],
              "parts": [
                "superstar",
                "talent"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {
                "$action": "talent"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "video": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "numSponsors",
          "title": "Num Sponsors",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "playlist",
          "title": "Playlist",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "source_log",
          "title": "Source Log",
          "type": "`$STRING`"
        },
        {
          "name": "sponsors",
          "title": "Sponsors",
          "type": "`$STRING`",
          "short": "Empty string in probes."
        },
        {
          "name": "takeover_bg",
          "title": "Takeover Bg",
          "type": "`$STRING`",
          "short": "Background image path."
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Playlist title, e.g."
        },
        {
          "name": "videos",
          "title": "Videos",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "video_id",
          "playlist_id",
          "playlist_offset",
          "parent_playlist_id",
          "video_offset"
        ],
        "sep": "/"
      },
      "name": "video",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/video-playlist/{videoId}/{playlistId}/{playlistOffset}/{parentPlaylistId}/{videoOffset}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "video-playlist"
                },
                {
                  "var": "video_id"
                },
                {
                  "var": "playlist_id"
                },
                {
                  "var": "playlist_offset"
                },
                {
                  "var": "parent_playlist_id"
                },
                {
                  "var": "video_offset"
                }
              ],
              "parts": [
                "api",
                "video-playlist",
                "{video_id}",
                "{playlist_id}",
                "{playlist_offset}",
                "{parent_playlist_id}",
                "{video_offset}"
              ],
              "rename": {
                "param": {
                  "parentPlaylistId": "parent_playlist_id",
                  "playlistId": "playlist_id",
                  "playlistOffset": "playlist_offset",
                  "videoId": "video_id",
                  "videoOffset": "video_offset"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "parent_playlist_id",
                    "orig": "parentPlaylistId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 0
                  },
                  {
                    "name": "playlist_id",
                    "orig": "playlistId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 0
                  },
                  {
                    "name": "playlist_offset",
                    "orig": "playlistOffset",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 0
                  },
                  {
                    "name": "video_id",
                    "orig": "videoId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 50011841
                  },
                  {
                    "name": "video_offset",
                    "orig": "videoOffset",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "parent_playlist_id",
                  "playlist_id",
                  "playlist_offset",
                  "video_id",
                  "video_offset"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/featured-videos/{videoId}/{playlistId}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "featured-videos"
                },
                {
                  "var": "video_id"
                },
                {
                  "var": "playlist_id"
                }
              ],
              "parts": [
                "api",
                "featured-videos",
                "{video_id}",
                "{playlist_id}"
              ],
              "rename": {
                "param": {
                  "playlistId": "playlist_id",
                  "videoId": "video_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "playlist_id",
                    "orig": "playlistId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 0
                  },
                  {
                    "name": "video_id",
                    "orig": "videoId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 50011841
                  }
                ]
              },
              "select": {
                "exist": [
                  "playlist_id",
                  "video_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/highlight-videos/{videoId}/{playlistId}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "highlight-videos"
                },
                {
                  "var": "video_id"
                },
                {
                  "var": "playlist_id"
                }
              ],
              "parts": [
                "api",
                "highlight-videos",
                "{video_id}",
                "{playlist_id}"
              ],
              "rename": {
                "param": {
                  "playlistId": "playlist_id",
                  "videoId": "video_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "playlist_id",
                    "orig": "playlistId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 0
                  },
                  {
                    "name": "video_id",
                    "orig": "videoId",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 50011841
                  }
                ]
              },
              "select": {
                "exist": [
                  "playlist_id",
                  "video_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

