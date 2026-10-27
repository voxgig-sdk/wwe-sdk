# Wwe SDK feature factory

from wwe_sdk.feature.base_feature import WweBaseFeature
from wwe_sdk.feature.ratelimit_feature import WweRatelimitFeature
from wwe_sdk.feature.retry_feature import WweRetryFeature
from wwe_sdk.feature.test_feature import WweTestFeature
from wwe_sdk.feature.timeout_feature import WweTimeoutFeature


_FEATURES = {
    "base": lambda: WweBaseFeature(),
    "ratelimit": lambda: WweRatelimitFeature(),
    "retry": lambda: WweRetryFeature(),
    "test": lambda: WweTestFeature(),
    "timeout": lambda: WweTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
