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


$insertQuery = "
    INSERT INTO `test`
        (`text`)
    VALUES 
        ('new content')
";

$pdoInstance->exec($insertQuery);

// retourne l'id de la data nouvellement créé
$sql = 
"
    SELECT `id` 
    FROM `test` 
    ORDER BY `id` DESC 
    LIMIT 1;
";
$pdoResult = $pdoInstance->query($sql);

if ($pdoResult) {
    $data = $pdoResult->fetch(PDO::FETCH_ASSOC);
}
echo($data["id"]);
?>

