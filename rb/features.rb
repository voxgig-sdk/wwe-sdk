# Wwe SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WweFeatures
  def self.make_feature(name)
    case name
    when "base"
      WweBaseFeature.new
    when "ratelimit"
      WweRatelimitFeature.new
    when "retry"
      WweRetryFeature.new
    when "test"
      WweTestFeature.new
    when "timeout"
      WweTimeoutFeature.new
    else
      WweBaseFeature.new
    end
  end
end
