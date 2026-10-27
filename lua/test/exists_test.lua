-- Wwe SDK exists test

local sdk = require("wwe_sdk")

describe("WweSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
