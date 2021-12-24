<?php
$database = 'sheepsheet';
$host = 'localhost';
$dsn = 'mysql:dbname=' . $database . ';host=' . $host;
$user = 'sheepsheet';
$password = '1234sheepSheet';

// Nous tentons de nous connecter à la base de donnée
try {
    // $pdo instance est un objet qui va nous permettre de communiquer avec la base de données
    $pdoInstance = new PDO($dsn, $user, $password);
}
// si la connection ne fonctionne pas ; nous rentrons dans ce bloc
catch (Exception $error) {
    echo "Problème de connexion" . PHP_EOL;
    exit;
}


if (!empty($_GET['nomdelacategorie'])) {
    $value = $_GET['nomdelacategorie'];
    $insertQuery = "
        INSERT INTO `test` (
            `text`
        ) VALUES (
            '{$value}'
        )
        WHERE `id` = '{$value}'
    ";
    $pdoInstance->exec($insertQuery);
    header('Location: index.php');
    exit;
}


$sql = 
"
    SELECT
    `text`,
    `id`
    FROM `test`
";
$pdoResult = $pdoInstance->query($sql);
$blocInfoList = $pdoResult->fetchAll(PDO::FETCH_ASSOC);

$blocInfoObjectList = [];

foreach ($blocInfoList as $textData) {
    $blocInfo = new BlocInfo(
        $textData['text'],
        $textData['id']
    );
    $blocInfoObjectList[] = $blocInfo;
}
