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


if (!empty($_GET['idToUpdate']) && !empty($_GET['contentToUpdate'])) {
    $id = $_GET['idToUpdate'];
    $content = $_GET['contentToUpdate'];
    $insertQuery = "
        UPDATE `test`
        SET `text` = '{$content}'
        WHERE `id` = '{$id}'
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

foreach ($blocInfoList as $data) {
    $blocInfo = new BlocInfo(
        $data['text'],
        $data['id']
    );
    $blocInfoObjectList[] = $blocInfo;
}

var_dump($blocInfoObjectList);

?>