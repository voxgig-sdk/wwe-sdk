# Wwe SDK utility: make_context

from wwe_sdk.core.context import WweContext


def make_context_util(ctxmap, basectx):
    return WweContext(ctxmap, basectx)
