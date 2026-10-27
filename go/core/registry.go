package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGalleryEntityFunc func(client *WweSDK, entopts map[string]any) WweEntity

var NewSuperstarEntityFunc func(client *WweSDK, entopts map[string]any) WweEntity

var NewVideoEntityFunc func(client *WweSDK, entopts map[string]any) WweEntity

