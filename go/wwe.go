package voxgigwwesdk

import (
	"github.com/voxgig-sdk/wwe-sdk/go/core"
	"github.com/voxgig-sdk/wwe-sdk/go/entity"
	"github.com/voxgig-sdk/wwe-sdk/go/feature"
	_ "github.com/voxgig-sdk/wwe-sdk/go/utility"
)

// Type aliases preserve external API.
type WweSDK = core.WweSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WweEntity = core.WweEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WweError = core.WweError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewGalleryEntityFunc = func(client *core.WweSDK, entopts map[string]any) core.WweEntity {
		return entity.NewGalleryEntity(client, entopts)
	}
	core.NewSuperstarEntityFunc = func(client *core.WweSDK, entopts map[string]any) core.WweEntity {
		return entity.NewSuperstarEntity(client, entopts)
	}
	core.NewVideoEntityFunc = func(client *core.WweSDK, entopts map[string]any) core.WweEntity {
		return entity.NewVideoEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWweSDK = core.NewWweSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWweSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WweSDK  { return NewWweSDK(nil) }
func Test() *WweSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
