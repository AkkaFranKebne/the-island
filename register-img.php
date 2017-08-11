<?php

require "simplehtmldom_1_5/simple_html_dom.php";


//connect with database: https://www.w3schools.com/php/php_mysql_insert.asp
$user = 'root';
$pass ='';
$db = 'lemoniada_test'; //zalozona w http://localhost/phpmyadmin/server_databases.php?db=
$conn = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect".$conn->connect_error);
//echo "Connected to the database <br>";
    
/*
tabela zdjecia stworzona w phpmyadmin/sql

id
photo
title
alt
*/
?>


<!DOCTYPE html>
<html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register new photo</title>
    <!--<link rel="stylesheet" href="css-minified/index.css">-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body id ="register_form">
    <header>
        <div class="title"><h1>Register new photo:</h1></div>
    </header>
    <form action='#' method = post enctype="multipart/form-data">
        <input type=hidden name=size value='1000000'><br>
        <input type=file name=image ><br>
        Tytuł: <input type=text name=title ><br>
        Opis: <textarea type=text name=alt col=40 row = 4></textarea><br>
        <input type=submit name = 'upload' value='upload'>
    </form>
    <div class = 'greetings'>
    <div class='message'>
        

    
<?php
        $msg = '';
        

      if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload'])){
            //the path to store upload files
            $target = "images/".basename($_FILES['image']['name']);
          
            //submitted data
            $image = $_FILES["image"]["name"];
            $alt = $_POST["alt"];
            $title = $_POST["title"];
          
            //send data to sql
            $sql = "INSERT INTO lemoniada_test.zdjecia (photo, title, alt) VALUES ('$image', '$title', '$alt')";          
            if ($conn->query($sql) === TRUE) {
                    echo "Nowy wpis dodany";
            } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
            }
          
          //move uploaded image into the folder
          if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
              $msg = "obrazek uploadowany";
          }
          else {
              $msg = "problem z uploadowaniem obrazka";
          }
          echo '<br>';
          echo $msg;
    };
   
?>
   


        
    </div>
</div>  
    
    <?php
    
    $sql = "SELECT title, photo, alt FROM lemoniada_test.zdjecia" ;
            $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                            echo "<h3>".$row['title']."</h3>";
                            echo "<img src='images/".$row['photo']."' alt='".$row['alt']."' height='66' width='66'>";
                            echo "<p>".$row['alt']."</p>";
                            }
                        } else {
                            echo "brak danych!";
                        }
    
    ?>
    
</body>
</html>
    