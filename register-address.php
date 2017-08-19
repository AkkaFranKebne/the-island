<?php

//connect with database: https://www.w3schools.com/php/php_mysql_insert.asp
$user = 'root';
$pass ='';
$db = 'lemoniada_test'; //zalozona w http://localhost/phpmyadmin/server_databases.php?db=
$conn = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect".$conn->connect_error);
//echo "Connected to the database <br>";
    
/*
used table address:

address_address_element 
address_content
*/

?>

<!DOCTYPE html>
<html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Zmien address_element  adresu</title>
    <link rel="stylesheet" href="css-minified/index.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body id ="register_form">
    <header>
        <div class="title"><h1>Zmień element  adresu na stronie <a href="newbiz.php">KONTAKT</a>:</h1></div>
    </header>
    <form action='#' method = post>
        <h1>Zmień element  adresu na stronie <a href="newbiz.php" target="_blank">KONTAKT</a>:</h1>
        <p>Wybierz element  adresu: </p>
        <select name=address_element  method=post><br>
          <option value='company'>nazwa firmy</option>
          <option value='street'>ulica</option>
          <option value='city'>miasto</option>
          <option value='email'>e-mail</option>
          <option value='tel'>telefon</option>
        </select><br>
        <p>Wstaw nową treść: </p><input type=text name=name value=''><br>
        <input type=submit value='Zapisz'>

    <div class = 'greetings'>
    <div class='message'>
           
<?php
  
   
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        echo $_POST["address_element"];
        echo $_POST["name"];
        
        if(strlen(trim($_POST["address_element"])) >0 && strlen(trim($_POST["name"])) >0 ) {
            $address_element  = mysqli_real_escape_string($conn, $_POST["address_element"]);
            $name = mysqli_real_escape_string($conn, $_POST["name"]);
            
            $sql = "SELECT * FROM lemoniada_test.address WHERE address_element  ='".$address_element ."'";
            $result = $conn->query($sql);
            
            if ($result->num_rows  < 1) { 
                $sql = "INSERT INTO lemoniada_test.address (address_element , address_content) VALUES ('$address_element ', '$name')";
                
                if ($conn->query($sql) === TRUE) {
                    echo "<p class='info'>NOWY wpis dodany.</p>";

                } else {
                    echo "<p class='error'>Error: " . $sql . "<br>" . $conn->error."</p>";
                }
            }
            
            else {
                 $sql = "UPDATE lemoniada_test.address SET address_content = '$name' WHERE address_element  ='".$address_element ."'";
                
                if ($conn->query($sql) === TRUE) {
                    echo "<p class='info'>Taki wpis juz istniał. Treść podmieniona.</p>";

                } else {
                    echo "<p class='error'>Error: " . $sql . "<br>" . $conn->error."</p>";
                }               

            }
            
        }

        else {
            echo "<p class='error'>Nie uzupełniono wszystkich pól!</p>";
        }
        
    };
   
?>

        
        </div>
      </div>  
    </form>
</body>
</html>
    
    
    

