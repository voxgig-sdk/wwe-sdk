# Wwe SDK exists test

import pytest
from wwe_sdk import WweSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WweSDK.test(None, None)
        assert testsdk is not None
