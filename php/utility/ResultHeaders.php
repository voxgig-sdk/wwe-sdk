<?php
declare(strict_types=1);

// Wwe SDK utility: result_headers

class WweResultHeaders
{
    public static function call(WweContext $ctx): ?WweResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
