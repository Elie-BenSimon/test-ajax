<?php
class BlocInfo {
    public $content;
    public $isOn = false;
    public function __construct($content)
    {
        $this->content = $content;
    }
}

?>