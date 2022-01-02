<?php
require __DIR__ . '/php/classes/BlocInfo.php';
require __DIR__ . '/php/database.php';
require __DIR__ . '/php/templates/header.tpl.php';
?>

<section id="sectionBlocInfo">
    <?php foreach ($blocInfoList as $bloc): ?> 
        <div class="blocInfo">
            <div class="blocInfoHeader">
                <h3>Nom du bloc info</h3>
                <button class="editButton" id=<?=$bloc["id"]?>>edit content</button>
            </div>
            <textarea oninput="autoSizeTextarea.onInput()" readonly class="blocInfoTextarea" id=<?=$bloc["id"]?>><?=$bloc["text"]?></textarea>
        </div>
    <?php endforeach; ?>

    <div class="blocInfo">
        <div class="blocInfoHeader">
            <h3>un tableau</h3>
            <button class="editButton tableButton" id="1">edit content</button>
        </div>
        <table>
            <?php foreach ($table as $line) : 
                $id = $line["id"]; ?>
                <tr>
                    <?php foreach ($line as $columnName=>$value) :
                        if ($columnName != "id") :?>
                            <td>
                                <textarea oninput="autoSizeTextarea.onInput()" readonly class="blocInfoTextarea" id=<?=$id?> data-idTable="1" data-column=<?=$columnName?>><?=$value?></textarea>
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