package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/wwe-sdk/go"
	"github.com/voxgig-sdk/wwe-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const videoDirectLiveStrict = true

func TestVideoDirect(t *testing.T) {
	t.Run("direct-load-video", func(t *testing.T) {
		setup := videoDirectSetup(map[string]any{"id": "direct01"})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-load-video", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			params["parent_playlist_id"] = 0
			params["playlist_id"] = 0
			params["playlist_offset"] = 0
			params["video_id"] = 50011841
			params["video_offset"] = 0
		} else {
			params["parent_playlist_id"] = "direct01"
			params["playlist_id"] = "direct02"
			params["playlist_offset"] = "direct03"
			params["video_id"] = "direct04"
			params["video_offset"] = "direct05"
		}

		result, err := client.Direct(map[string]any{
			"path":   "api/video-playlist/{video_id}/{playlist_id}/{playlist_offset}/{parent_playlist_id}/{video_offset}",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, videoDirectLiveStrict, "Live load failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, videoDirectLiveStrict, "Live load failed: %s", liveDescribe(result))
			}
			if result["data"] == nil {
				liveMiss(t, videoDirectLiveStrict, "Live load returned no data: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
			if result["data"] == nil {
				t.Fatal("expected data to be non-nil")
			}
		}

		if !setup.live {
			if dataMap, ok := result["data"].(map[string]any); ok {
				if dataMap["id"] != "direct01" {
					t.Fatalf("expected data.id to be direct01, got %v", dataMap["id"])
				}
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
				if !strings.Contains(url, "direct03") {
					t.Fatalf("expected url to contain direct03, got %v", url)
				}
				if !strings.Contains(url, "direct04") {
					t.Fatalf("expected url to contain direct04, got %v", url)
				}
				if !strings.Contains(url, "direct05") {
					t.Fatalf("expected url to contain direct05, got %v", url)
				}
			}
		}
	})

}

type videoDirectSetupResult struct {
	client *sdk.WweSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func videoDirectSetup(mockres any) *videoDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"WWE_TEST_VIDEO_ENTID": map[string]any{},
		"WWE_TEST_LIVE":    "FALSE",
	})

	live := env["WWE_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewWweSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["WWE_TEST_VIDEO_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}
		// A path parameter's example stands in for an id *_ENTID does not give.
		for k, v := range map[string]any{"parent_playlist01": 0, "playlist01": 0, "playlist_offset01": 0, "video01": 50011841, "video_offset01": 0} {
			if idmap[k] == nil {
				idmap[k] = v
			}
		}

		return &videoDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewWweSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &videoDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
