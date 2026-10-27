# Wwe SDK utility: prepare_body
require_relative 'media'
module WweUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WweUtilities.raw_body(ctx.reqdata) if WweUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
