<?php
declare(strict_types=1);

// Wwe SDK base feature

class WweBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WweContext $ctx, array $options): void {}
    public function PostConstruct(WweContext $ctx): void {}
    public function PostConstructEntity(WweContext $ctx): void {}
    public function SetData(WweContext $ctx): void {}
    public function GetData(WweContext $ctx): void {}
    public function GetMatch(WweContext $ctx): void {}
    public function SetMatch(WweContext $ctx): void {}
    public function PrePoint(WweContext $ctx): void {}
    public function PreSpec(WweContext $ctx): void {}
    public function PreRequest(WweContext $ctx): void {}
    public function PreResponse(WweContext $ctx): void {}
    public function PreResult(WweContext $ctx): void {}
    public function PreDone(WweContext $ctx): void {}
    public function PreUnexpected(WweContext $ctx): void {}
}
