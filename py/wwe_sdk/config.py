# Wwe SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Wwe",
            "slug": "wwe",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.wwe.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "gallery": {},
                "superstar": {},
                "video": {},
            },
        },
        "entity": {
      "gallery": {
        "fields": [
          {
            "name": "galleries",
            "title": "Galleries",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "node_id",
            "items_per_page",
            "items_offset",
          ],
          "sep": "/",
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
                    "lit": "api",
                  },
                  {
                    "lit": "gallery-related",
                  },
                  {
                    "var": "node_id",
                  },
                  {
                    "var": "items_per_page",
                  },
                  {
                    "var": "items_offset",
                  },
                ],
                "parts": [
                  "api",
                  "gallery-related",
                  "{node_id}",
                  "{items_per_page}",
                  "{items_offset}",
                ],
                "rename": {
                  "param": {
                    "itemsOffset": "items_offset",
                    "itemsPerPage": "items_per_page",
                    "nodeId": "node_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "items_offset",
                      "orig": "itemsOffset",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 0,
                    },
                    {
                      "name": "items_per_page",
                      "orig": "itemsPerPage",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 14,
                    },
                    {
                      "name": "node_id",
                      "orig": "nodeId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 50011841,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "items_offset",
                    "items_per_page",
                    "node_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "superstar": {
        "fields": [
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Site-relative profile path, e.g.",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "req": True,
            "short": "Superstar display name in upper case, e.g.",
          },
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
                    "lit": "superstar",
                  },
                  {
                    "lit": "talent",
                  },
                ],
                "parts": [
                  "superstar",
                  "talent",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "talent",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "video": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "numSponsors",
            "title": "Num Sponsors",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "playlist",
            "title": "Playlist",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "source_log",
            "title": "Source Log",
            "type": "`$STRING`",
          },
          {
            "name": "sponsors",
            "title": "Sponsors",
            "type": "`$STRING`",
            "short": "Empty string in probes.",
          },
          {
            "name": "takeover_bg",
            "title": "Takeover Bg",
            "type": "`$STRING`",
            "short": "Background image path.",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Playlist title, e.g.",
          },
          {
            "name": "videos",
            "title": "Videos",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "video_id",
            "playlist_id",
            "playlist_offset",
            "parent_playlist_id",
            "video_offset",
          ],
          "sep": "/",
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
                    "lit": "api",
                  },
                  {
                    "lit": "video-playlist",
                  },
                  {
                    "var": "video_id",
                  },
                  {
                    "var": "playlist_id",
                  },
                  {
                    "var": "playlist_offset",
                  },
                  {
                    "var": "parent_playlist_id",
                  },
                  {
                    "var": "video_offset",
                  },
                ],
                "parts": [
                  "api",
                  "video-playlist",
                  "{video_id}",
                  "{playlist_id}",
                  "{playlist_offset}",
                  "{parent_playlist_id}",
                  "{video_offset}",
                ],
                "rename": {
                  "param": {
                    "parentPlaylistId": "parent_playlist_id",
                    "playlistId": "playlist_id",
                    "playlistOffset": "playlist_offset",
                    "videoId": "video_id",
                    "videoOffset": "video_offset",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "parent_playlist_id",
                      "orig": "parentPlaylistId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 0,
                    },
                    {
                      "name": "playlist_id",
                      "orig": "playlistId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 0,
                    },
                    {
                      "name": "playlist_offset",
                      "orig": "playlistOffset",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 0,
                    },
                    {
                      "name": "video_id",
                      "orig": "videoId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 50011841,
                    },
                    {
                      "name": "video_offset",
                      "orig": "videoOffset",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 0,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "parent_playlist_id",
                    "playlist_id",
                    "playlist_offset",
                    "video_id",
                    "video_offset",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/featured-videos/{videoId}/{playlistId}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "featured-videos",
                  },
                  {
                    "var": "video_id",
                  },
                  {
                    "var": "playlist_id",
                  },
                ],
                "parts": [
                  "api",
                  "featured-videos",
                  "{video_id}",
                  "{playlist_id}",
                ],
                "rename": {
                  "param": {
                    "playlistId": "playlist_id",
                    "videoId": "video_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "playlist_id",
                      "orig": "playlistId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 0,
                    },
                    {
                      "name": "video_id",
                      "orig": "videoId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 50011841,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "playlist_id",
                    "video_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/highlight-videos/{videoId}/{playlistId}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "highlight-videos",
                  },
                  {
                    "var": "video_id",
                  },
                  {
                    "var": "playlist_id",
                  },
                ],
                "parts": [
                  "api",
                  "highlight-videos",
                  "{video_id}",
                  "{playlist_id}",
                ],
                "rename": {
                  "param": {
                    "playlistId": "playlist_id",
                    "videoId": "video_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "playlist_id",
                      "orig": "playlistId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 0,
                    },
                    {
                      "name": "video_id",
                      "orig": "videoId",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 50011841,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "playlist_id",
                    "video_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
