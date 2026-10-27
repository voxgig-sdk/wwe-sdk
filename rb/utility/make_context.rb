# Wwe SDK utility: make_context
require_relative '../core/context'
module WweUtilities
  MakeContext = ->(ctxmap, basectx) {
    WweContext.new(ctxmap, basectx)
  }
end
