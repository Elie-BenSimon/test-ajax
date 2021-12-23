<?php
require __DIR__ . '/php/inc/templates/header.tpl.php';
require __DIR__ . '/php/inc/classes/BlocInfo.php';
require __DIR__ . '/php/inc/database.php';
?>
<section>
    <?php foreach ($blocInfoObjectList as $index => $blocData) : ?>
        <div>
            <button id=<?= "editButton-" . $index ?>>edit content</button>
            <pre id=<?= "blocInfoPre-" . $index ?> contenteditable=false><?= $blocData->content ?></pre>
        </div>
    <?php endforeach ?>
</section>

<?php
require __DIR__ . '/php/inc/templates/footer.tpl.php';
?>