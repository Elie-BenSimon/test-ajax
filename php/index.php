<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <title>Document</title>
</head>
<body>
    <?php
        require __DIR__ . '/inc/classes/BlocInfo.php';
        $database = 'sheepsheet';
        $host = 'localhost';
        $dsn = 'mysql:dbname=' . $database. ';host=' . $host;
        $user = 'sheepsheet';
        $password = '1234sheepSheet';

        // Nous tentons de nous connecter à la base de donnée
        try {
            // $pdo instance est un objet qui va nous permettre de communiquer avec la base de données
            $pdoInstance = new PDO($dsn, $user, $password);
        }
        // si la connection ne fonctionne pas ; nous rentrons dans ce bloc
        catch(Exception $error) {
            // var_dump($error);
            echo "Problème de connexion" . PHP_EOL;
            exit;
        }

        $sql = "
            SELECT
                `text`
            FROM `test`
        ";
        $pdoResult = $pdoInstance->query($sql);
        $blocInfoList = $pdoResult->fetchAll(PDO::FETCH_ASSOC);

        $blocInfoObjectList = [];

        foreach($blocInfoList as $textData) {
            $blocInfo = new BlocInfo(
                $textData['text'],
            );
            $blocInfoObjectList[] = $blocInfo;
        }
    ?>
    <section>
        <?php foreach($blocInfoObjectList as $index => $blocData) : ?>
            <div>
                <button id=<?="editButton-" . $index?>>edit content</button>
                <pre id=<?="blocInfoPre-" . $index?> contenteditable=false><?=$blocData->content?></pre>
            </div>
        <?php endforeach ?>

    </section>
    <script src="../js/app.js"></script>
</body>
</html>