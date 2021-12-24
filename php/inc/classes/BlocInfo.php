<?php
class BlocInfo {
    public $content;
    public $id;
    public $isOn = false;
    public function __construct($content, $id)
    {
        $this->content = $content;
        $this->id = $id;
    }
}

?>