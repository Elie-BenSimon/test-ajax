<?php
require __DIR__ . '/php/inc/classes/BlocInfo.php';
require __DIR__ . '/php/inc/database.php';
require __DIR__ . '/php/inc/templates/header.tpl.php';
?>
<section>
    <?php foreach ($blocInfoObjectList as $index => $blocData) : ?>
        <div class="blocInfo">
            <div class="blocInfoHeader">
                <h3>Nom du bloc info</h3>
                <button class="editButton" id=<?= "editButton-" . $index ?>>edit content</button>
            </div>
            <pre class="blocInfoPre" id=<?= "blocInfoPre-" . $index ?> contenteditable=false><?= $blocData->content ?></pre>
        </div>
    <?php endforeach ?>
</section>

<?php
require __DIR__ . '/php/inc/templates/footer.tpl.php';
?>