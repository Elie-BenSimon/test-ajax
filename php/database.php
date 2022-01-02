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

$sql = 
"
    SELECT
    `text`,
    `id`
    FROM `test`
";

$pdoResult = $pdoInstance->query($sql);
$blocInfoObjectList = [];

if ($pdoResult) {
    $blocInfoList = $pdoResult->fetchAll(PDO::FETCH_ASSOC);
    
    
    foreach ($blocInfoList as $data) {
        $blocInfo = new BlocInfo(
            $data['text'],
            $data['id']
        );
        $blocInfoObjectList[] = $blocInfo;
    }
}


//récupération des données sous formes de tableau
$sql = 
"
    SELECT
    *
    FROM `tableau`
";

$pdoResult = $pdoInstance->query($sql);

if ($pdoResult) {
    $table = $pdoResult->fetchAll(PDO::FETCH_ASSOC);
    foreach($table as $line) {
        $id = $line['id'];
        foreach($line as $key2=>$value) {
            if ($key2 != 'id') {
                echo"id:".$id;
                echo '<br>';
                echo $key2;
                echo '<br>';
                echo $value;
                echo '<br>';
            }
        }
    }
}


//var_dump($blocInfoObjectList);

// Ancienne méthode de mise à jour de la base de donnée via un formulaire (méthode 'pogit stausst' du module 'Click')//
/*
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
*/
?>