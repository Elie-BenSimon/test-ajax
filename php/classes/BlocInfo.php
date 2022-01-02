<?php
class BlocInfo {
    public $content;
    public $id;
    public function __construct($content, $id)
    {
        $this->content = $content;
        $this->id = $id;
    }
}

?>