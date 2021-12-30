<?php
require __DIR__ . '/php/classes/BlocInfo.php';
require __DIR__ . '/php/database.php';
require __DIR__ . '/php/templates/header.tpl.php';
?>


<section>
    <?php foreach ($blocInfoObjectList as $blocData) : ?>
        <div class="blocInfo">
            <div class="blocInfoHeader">
                <h3>Nom du bloc info</h3>
                <button class="editButton" id=<?=$blocData->id?>>edit content</button>
            </div>
            <pre class="blocInfoPre" id=<?=$blocData->id?> contenteditable=false><?= $blocData->content ?></pre>
        </div>
    <?php endforeach ?>
</section>

<?php
require __DIR__ . '/php/templates/footer.tpl.php';
?>

<script src="./js/click.js"></script>
<script src="./js/app.js"></script>