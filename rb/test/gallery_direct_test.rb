# Gallery direct test

require "minitest/autorun"
require "json"
require_relative "../Wwe_sdk"
require_relative "runner"

class GalleryDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_load_gallery
    setup = gallery_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-gallery", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      params["items_offset"] = 0
      params["items_per_page"] = 14
      params["node_id"] = 50011841
    else
      params["items_offset"] = "direct01"
      params["items_per_page"] = "direct02"
      params["node_id"] = "direct03"
    end

    result = client.direct({
      "path" => "api/gallery-related/{node_id}/{items_per_page}/{items_offset}",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live load failed: " + Runner.live_describe(result))
      end
      if result["data"].nil?
        Runner.live_miss(LIVE_STRICT, "Live load returned no data: " + Runner.live_describe(result))
      end
      assert !result["data"].nil?
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def gallery_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "WWE_TEST_GALLERY_ENTID" => {},
    "WWE_TEST_LIVE" => "FALSE",
  })

  live = env["WWE_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
    })
    client = WweSDK.new(merged_opts)
    idmap = env["WWE_TEST_GALLERY_ENTID"]
    # A path parameter's example stands in for an id *_ENTID does not give.
    idmap = { "items_offset01" => 0, "items_per_page01" => 14, "node01" => 50011841 }
      .merge(idmap.is_a?(Hash) ? idmap : {})
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: idmap.is_a?(Hash) ? idmap : {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = WweSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
