"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('VideoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WWE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WWE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WweSDK.test();
        const ent = testsdk.Video();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WweSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Video().load({ "parent_playlist_id": "x", "playlist_id": 1, "video_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WWE_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'video.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "numSponsors": { "a": true, "h": "Num Sponsors", "n": "numSponsors", "r": false, "t": "`$BOOLEAN`", "key$": "numSponsors", "index$": 1 }, "playlist": { "a": true, "h": "Playlist", "n": "playlist", "r": true, "t": "`$ARRAY`", "key$": "playlist", "index$": 2 }, "source_log": { "a": true, "h": "Source Log", "n": "source_log", "r": false, "t": "`$STRING`", "key$": "source_log", "index$": 3 }, "sponsors": { "a": true, "h": "Sponsors", "n": "sponsors", "r": false, "sh": "Empty string in probes.", "t": "`$STRING`", "key$": "sponsors", "index$": 4 }, "takeover_bg": { "a": true, "h": "Takeover Bg", "n": "takeover_bg", "r": false, "sh": "Background image path.", "t": "`$STRING`", "key$": "takeover_bg", "index$": 5 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "Playlist title, e.g.", "t": "`$STRING`", "key$": "title", "index$": 6 }, "videos": { "a": true, "h": "Videos", "n": "videos", "r": true, "t": "`$ARRAY`", "key$": "videos", "index$": 7 } }, "id": { "field": "id", "name": "id", "parts": ["video_id", "playlist_id", "playlist_offset", "parent_playlist_id", "video_offset"], "sep": "/" }, "name": "video", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/video-playlist/{videoId}/{playlistId}/{playlistOffset}/{parentPlaylistId}/{videoOffset}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 0, "k": "param", "n": "parent_playlist_id", "or": "parentPlaylistId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "param", "n": "playlist_id", "or": "playlistId", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 0, "k": "param", "n": "playlist_offset", "or": "playlistOffset", "r": true, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 50011841, "k": "param", "n": "video_id", "or": "videoId", "r": true, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 0, "k": "param", "n": "video_offset", "or": "videoOffset", "r": true, "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/video-playlist/{videoId}/{playlistId}/{playlistOffset}/{parentPlaylistId}/{videoOffset}", "q": { "exist": ["parent_playlist_id", "playlist_id", "playlist_offset", "video_id", "video_offset"] }, "r": { "param": { "parentPlaylistId": "parent_playlist_id", "playlistId": "playlist_id", "playlistOffset": "playlist_offset", "videoId": "video_id", "videoOffset": "video_offset" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "video-playlist" }, { "var": "video_id" }, { "var": "playlist_id" }, { "var": "playlist_offset" }, { "var": "parent_playlist_id" }, { "var": "video_offset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/featured-videos/{videoId}/{playlistId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 0, "k": "param", "n": "playlist_id", "or": "playlistId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 50011841, "k": "param", "n": "video_id", "or": "videoId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/featured-videos/{videoId}/{playlistId}", "q": { "exist": ["playlist_id", "video_id"] }, "r": { "param": { "playlistId": "playlist_id", "videoId": "video_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "featured-videos" }, { "var": "video_id" }, { "var": "playlist_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/highlight-videos/{videoId}/{playlistId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 0, "k": "param", "n": "playlist_id", "or": "playlistId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 50011841, "k": "param", "n": "video_id", "or": "videoId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/highlight-videos/{videoId}/{playlistId}", "q": { "exist": ["playlist_id", "video_id"] }, "r": { "param": { "playlistId": "playlist_id", "videoId": "video_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "highlight-videos" }, { "var": "video_id" }, { "var": "playlist_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "video", "name__orig": "video", "Name": "Video", "name_": "video", "name-": "video", "NAME": "VIDEO", "index$": 2 }, { "active": true, "entity": "video", "key$": "BasicVideoFlow", "kind": "basic", "name": "BasicVideoFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "video_ref01", "srcdatavar": "video_ref01_data", "suffix": "_dt0" }, "m": { "id": "video01", "video_id": "video01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-video_ref01" } }], "unreachable": true }] }, 'Video', { "GET /api/video-playlist/{videoId}/{playlistId}/{playlistOffset}/{parentPlaylistId}/{videoOffset}": { "protocol": "http", "parameters": [{ "name": "videoId", "in": "path", "required": true, "description": "Drupal node id of a WWE.com video (the data-nid on video cards).", "schema": { "type": "integer" }, "example": 50011841, "index$": 0 }, { "name": "playlistId", "in": "path", "required": true, "description": "Playlist node id; 0 for the default 'Trending videos' playlist.", "schema": { "type": "integer" }, "example": 0, "index$": 1 }, { "name": "playlistOffset", "in": "path", "required": true, "description": "Offset into the playlist; 0 in all probes.", "schema": { "type": "integer" }, "example": 0, "index$": 2 }, { "name": "parentPlaylistId", "in": "path", "required": true, "description": "Parent playlist node id; 0 in all probes.", "schema": { "type": "integer" }, "example": 0, "index$": 3 }, { "name": "videoOffset", "in": "path", "required": true, "description": "Offset of the video; 0 in all probes.", "schema": { "type": "integer" }, "example": 0, "index$": 4 }] }, "GET /api/featured-videos/{videoId}/{playlistId}": { "protocol": "http", "parameters": [{ "name": "videoId", "in": "path", "required": true, "description": "Drupal node id of a WWE.com video (the data-nid on video cards).", "schema": { "type": "integer" }, "example": 50011841, "index$": 0 }, { "name": "playlistId", "in": "path", "required": true, "description": "Playlist node id; 0 for the default 'Trending videos' playlist.", "schema": { "type": "integer" }, "example": 0, "index$": 1 }] }, "GET /api/highlight-videos/{videoId}/{playlistId}": { "protocol": "http", "parameters": [{ "name": "videoId", "in": "path", "required": true, "description": "Drupal node id of a WWE.com video (the data-nid on video cards).", "schema": { "type": "integer" }, "example": 50011841, "index$": 0 }, { "name": "playlistId", "in": "path", "required": true, "description": "Playlist node id; 0 for the default 'Trending videos' playlist.", "schema": { "type": "integer" }, "example": 0, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let video_ref01_data = Object.values(setup.data.existing.video)[0];
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/video/VideoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WweSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['video01', 'video02', 'video03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WWE_TEST_VIDEO_ENTID': idmap,
        'WWE_TEST_LIVE': 'FALSE',
        'WWE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WWE_TEST_VIDEO_ENTID'];
    const live = 'TRUE' === env.WWE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WWE_TEST_VIDEO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WweSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WWE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=VideoEntity.test.js.map