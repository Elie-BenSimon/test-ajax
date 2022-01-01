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

$str_json = file_get_contents('php://input');
$dataArray = json_decode($str_json);

$insertQuery = "
    UPDATE `test`
    SET `text` = '{$dataArray->content}'
    WHERE `id` = '{$dataArray->id}'
";
$pdoInstance->exec($insertQuery);

?>
