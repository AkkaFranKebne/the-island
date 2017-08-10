<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;

//connect with database: https://www.w3schools.com/php/php_mysql_insert.asp
$user = 'root';
$pass ='';
$db = 'lemoniada_test'; //zalozona w http://localhost/phpmyadmin/server_databases.php?db=
$conn = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect".$conn->connect_error);

?>
    
<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>KREACJA - LemOnHills - Agencja Marketingowa</title>
     <?php include 'elements_meta.php';?>
</head>
 <body id = "kreacja">
    <div id="menuOpacity"> </div> 
     
    <div class="grid-container">
        
        <div class="row">
            <div class="col-12">
                <?php include 'elements_nav.php';?>
            </div>
        </div>
        
     <main id = "main-gallery">
        <div class="row">
            <div class="col-12">
                    <div class='title-bar'><h2><span>
                        
                     <?php
                        $title = $_SERVER['SCRIPT_NAME'];
                        $title = str_replace('/the-island/','', $title);
                        $sql = "SELECT name FROM lemoniada_test.krainy WHERE url ='".$title."'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo $row["name"];
                            }
                        } else {
                            echo "brak danych!";
                        }
                    ?>
                        
                        
                    </span></h2></div>
                    <div class='description-bar'><h4>
                        
                        <?php
                        $title = $_SERVER['SCRIPT_NAME'];
                        $title = str_replace('/the-island/','', $title);
                        $sql = "SELECT description FROM lemoniada_test.krainy WHERE url ='".$title."'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo $row["description"];
                            }
                        } else {
                            echo "brak danych!";
                        }
                        $conn->close();
                    ?>
                        
                        
                        
                        </h4></div>
                <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
            </div>
        </div>           
        
        <?php include 'elements_gallery.php';?>
    </main>        
      
        
        <div class="row">
            <div class="col-12">
                <?php include 'elements_footer.php';?>
            </div>
        </div>
        
    </div>
</body>
</html>
