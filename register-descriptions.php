<?php
include 'elements_db_connection.php';?> 
    
/*
used table:

url
name
description
*/

?>

<!DOCTYPE html>
<html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Zmien opis na stronie</title>
    <?php include 'elements_meta.php';?>
</head>
<body id ="register_form">
    <form action='#' method = post>
        <h1>Zmień opisy na stronie:</h1>
        <p>Wybierz stronę: </p>
        <select name=url method=post><br>
          <option value='o-nas.php'>o-nas.php</option>
          <option value='eventy.php'>eventy.php</option>
          <option value='kreacja.php'>kreacja.php</option>
          <option value='kontakt.php'>kontakt.php</option>
          <option value='social-media.php'>social-media.php</option>
          <option value='www.php'>www.php</option>
        </select><br>
        <p>Wstaw nowy tytuł: </p><input type=text name=name value=''><br>
        <p>Wstaw nowy opis, maksymalna długość  454 znaki. Do nowych linii używaj znacznika <code> &ltbr&gt </code> : </p> <textarea type=text name=desc maxlength="454"></textarea><br>
        <p></p>
        <input type=submit value='Zapisz'>
        <button type="button"><a href ='register-directory.php'>Wróć do strony głównej</a></button>
    <div class = 'greetings'>
    <div class='message'>
        

    
<?php

    
   
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        
        if(strlen(trim($_POST["url"])) >0 && strlen(trim($_POST["name"])) >0 && strlen(trim($_POST["desc"])) >0) {
            $url = mysqli_real_escape_string($conn, $_POST["url"]);
            $name = mysqli_real_escape_string($conn, $_POST["name"]);
            $desc = mysqli_real_escape_string($conn, $_POST["desc"]);  
            
            $sql = "SELECT * FROM lemoniada_test.krainy WHERE url ='".$url."'";
            $result = $conn->query($sql);
            
            if ($result->num_rows  < 1) { 
                $sql = "INSERT INTO lemoniada_test.krainy (url, name, description) VALUES ('$url', '$name', '$desc')";
                
                if ($conn->query($sql) === TRUE) {
                    echo "<p class='info'>NOWY wpis dodany.</p>";

                } else {
                    echo "<p class='error'>Error: " . $sql . "<br>" . $conn->error."</p>";
                }
            }
            
            else {
                 $sql = "UPDATE lemoniada_test.krainy SET name = '$name', description =  '$desc' WHERE url ='".$url."'";
                
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
    
    
    

