"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "gallery",
        "accessor": "Gallery",
        "op": "load",
        "method": "GET",
        "path": "/api/gallery-related/{nodeId}/{itemsPerPage}/{itemsOffset}",
        "args": [
            {
                "name": "items_offset",
                "wire": "itemsOffset",
                "value": 0
            },
            {
                "name": "items_per_page",
                "wire": "itemsPerPage",
                "value": 14
            },
            {
                "name": "node_id",
                "wire": "nodeId",
                "value": 50011841
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "galleries": [
                {
                    "nid": "x",
                    "title": "x",
                    "image_alt": "x",
                    "teaser_title": "x",
                    "description": "x",
                    "total_images": 1,
                    "link": "x",
                    "image_fid": "x",
                    "image": "x",
                    "image_hires": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "superstar",
        "accessor": "Superstar",
        "op": "list",
        "method": "GET",
        "path": "/superstar/talent",
        "action": "talent",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "value": "x",
                "url": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "video",
        "accessor": "Video",
        "op": "load",
        "method": "GET",
        "path": "/api/video-playlist/{videoId}/{playlistId}/{playlistOffset}/{parentPlaylistId}/{videoOffset}",
        "args": [
            {
                "name": "parent_playlist_id",
                "wire": "parentPlaylistId",
                "value": 0
            },
            {
                "name": "playlist_id",
                "wire": "playlistId",
                "value": 0
            },
            {
                "name": "playlist_offset",
                "wire": "playlistOffset",
                "value": 0
            },
            {
                "name": "video_id",
                "wire": "videoId",
                "value": 50011841
            },
            {
                "name": "video_offset",
                "wire": "videoOffset",
                "value": 0
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "sponsors": "x",
            "numSponsors": true,
            "title": "x",
            "playlist": [
                {
                    "image": "x",
                    "image_uri": "x",
                    "file": "x",
                    "fid": "x",
                    "title": "x",
                    "nid": 1,
                    "description": "x",
                    "vms_id": 1,
                    "wwe_network": true,
                    "ads_disabled": 1,
                    "sponsors": [],
                    "path": "x",
                    "abs_path": "x",
                    "network_logged_in_cta": "x",
                    "show_name": "x",
                    "episode_name": "x",
                    "countries": [
                        "x"
                    ],
                    "country_logic": "x",
                    "tracks": [
                        {
                            "label": "x",
                            "file": "x",
                            "kind": "x"
                        }
                    ],
                    "playlist_title": "x",
                    "playlist_short_headline": "x",
                    "playlist_video_strip_headline": "x",
                    "picture": "x",
                    "duration": "x",
                    "featured_link": {},
                    "playlist_offset": "x",
                    "playlist_nid": "x",
                    "parent_playlist_nid": "x",
                    "video_offset": "x",
                    "backfilled": true
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map