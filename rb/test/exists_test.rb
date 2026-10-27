# Wwe SDK exists test

require "minitest/autorun"
require_relative "../Wwe_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WweSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
