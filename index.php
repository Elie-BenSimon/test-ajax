<?php
require __DIR__ . '/php/classes/BlocInfo.php';
require __DIR__ . '/php/database.php';
require __DIR__ . '/php/templates/header.tpl.php';
?>

<section id="sectionBlocInfo">
    <?php foreach ($blocInfoObjectList as $blocData) : ?>
        <div class="blocInfo">
            <div class="blocInfoHeader">
                <h3>Nom du bloc info</h3>
                <button class="editButton" id=<?= $blocData->id ?>>edit content</button>
            </div>
            <textarea oninput="autoSizeTextarea.onInput()" readonly class="blocInfoTextarea" id=<?= $blocData->id ?>><?= $blocData->content ?></textarea>
        </div>
    <?php endforeach; ?>

    <div class="blocInfo">
        <div class="blocInfoHeader">
            <h3>un tableau</h3>
        </div>
        <table>
            <?php foreach ($table as $line) : 
                $id = $line["id"]; ?>
                <tr>
                    <?php foreach ($line as $columnName=>$value) :
                        if ($columnName != "id") :?>
                            <td>
                                <textarea oninput="autoSizeTextarea.onInput()" id=<?=$id?> class="blocInfoTextarea textAreaEditable" headers=<?=$columnName?>><?=$value?></textarea>
                            </td>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </tr>
                
            <?php endforeach; ?>
        </table>
    </div>

    
</section>
<button id="newBloc">nouveau bloc</button>

<?php
require __DIR__ . '/php/templates/footer.tpl.php';
?>

<script src="./js/autoSizeTextarea.js"></script>
<script src="./js/click.js"></script>
<script src="./js/app.js"></script>