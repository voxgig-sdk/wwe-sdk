<?php
declare(strict_types=1);

// Wwe SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WweMakeContext
{
    public static function call(array $ctxmap, ?WweContext $basectx): WweContext
    {
        return new WweContext($ctxmap, $basectx);
    }
}
