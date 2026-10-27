# WWE API

Unofficial: the JSON endpoints behind `www.wwe.com`, as wrapped by the Swift client https://github.com/l0v3m0n3y/wwe (src/wwe.swift). Not a documented or supported public API; WWE can change it at any time. Endpoints and parameter order were taken from that client; every schema was taken from live GET probes on 2026-10-23 (no key needed). Only endpoints on https://www.wwe.com are modelled because a spec has one server: the client&#39;s search (https://search.wwe.com/api/v1/search, which also worked keyless) and VOD entitlement (https://vod.wwe.com/v1/entitlement/&#123;id&#125;, not probed) calls are omitted. Field types are as observed and are inconsistent between endpoints (nid is a string in highlight-videos and gallery-related but an integer in the playlists). Unverified: the effect of non-zero playlistId/offset values, and the item shape of the always-empty sponsors arrays. Videos in the probes were geo-tagged with `country_logic` and the highlight titles came back in Arabic, so content may vary by requester location.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 3 entities and 5 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Gallery

Results: Successful response.

SDK operations: `load`.

### Superstar

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `url`: Site-relative profile path, for example &#39;/superstars/curthennig&#39;.
- `value`: Superstar display name in upper case, for example &#39;&quot;MR. PERFECT&quot; CURT HENNIG&#39;.

### Video

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `sponsors`: Empty string in probes.
- `takeover_bg`: Background image path.
- `title`: Playlist title, for example &#39;Trending videos on WWE.com&#39;.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Gallery | `load` | `GET /api/gallery-related/{nodeId}/{itemsPerPage}/{itemsOffset}` | See reference |
| Superstar | `list` | `GET /superstar/talent` | See reference |
| Video | `load` | `GET /api/video-playlist/{videoId}/{playlistId}/{playlistOffset}/{parentPlaylistId}/{videoOffset}` | See reference |
| Video | `load` | `GET /api/featured-videos/{videoId}/{playlistId}` | See reference |
| Video | `load` | `GET /api/highlight-videos/{videoId}/{playlistId}` | See reference |

## Connect to the API

- WWE.com website: `https://www.wwe.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `wwe_list`: List records for an entity. Supported entities: `superstar`.
- `wwe_load`: Load one record for an entity. Supported entities: `gallery`, `video`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

