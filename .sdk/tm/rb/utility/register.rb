# Wwe SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WweUtility.registrar = ->(u) {
  u.clean = WweUtilities::Clean
  u.clean_add = WweUtilities::CleanAdd
  u.clean_explain = WweUtilities::CleanExplain
  u.done = WweUtilities::Done
  u.make_error = WweUtilities::MakeError
  u.feature_add = WweUtilities::FeatureAdd
  u.feature_hook = WweUtilities::FeatureHook
  u.feature_init = WweUtilities::FeatureInit
  u.fetcher = WweUtilities::Fetcher
  u.make_fetch_def = WweUtilities::MakeFetchDef
  u.make_context = WweUtilities::MakeContext
  u.make_options = WweUtilities::MakeOptions
  u.make_request = WweUtilities::MakeRequest
  u.make_response = WweUtilities::MakeResponse
  u.make_result = WweUtilities::MakeResult
  u.make_point = WweUtilities::MakePoint
  u.make_spec = WweUtilities::MakeSpec
  u.make_url = WweUtilities::MakeUrl
  u.param = WweUtilities::Param
  u.prepare_auth = WweUtilities::PrepareAuth
  u.prepare_body = WweUtilities::PrepareBody
  u.prepare_headers = WweUtilities::PrepareHeaders
  u.prepare_method = WweUtilities::PrepareMethod
  u.prepare_params = WweUtilities::PrepareParams
  u.prepare_path = WweUtilities::PreparePath
  u.prepare_query = WweUtilities::PrepareQuery
  u.graphql_body = WweUtilities::GraphqlBody
  u.graphql_errors = WweUtilities::GraphqlErrors
  u.result_basic = WweUtilities::ResultBasic
  u.result_body = WweUtilities::ResultBody
  u.result_headers = WweUtilities::ResultHeaders
  u.transform_request = WweUtilities::TransformRequest
  u.transform_response = WweUtilities::TransformResponse
}
