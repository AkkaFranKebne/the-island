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
    <title>Wybierz element strony, ktory chcesz edytowac</title>
    <?php include 'elements_meta.php';?>
</head>
<body id ="register_form">
    <form action='#' method = post>
        <h1>Zmień element  adresu na stronie <a href="newbiz.php" target="_blank">newbiz.php</a>:</h1>
        <p>Wybierz element  adresu: </p>
        <select name=address_element  method=post><br>
          <option value='company'>nazwa firmy</option>
          <option value='street'>ulica</option>
          <option value='city'>miasto</option>
          <option value='email'>e-mail</option>
          <option value='tel'>telefon</option>
          <option value='coord'>współrzędne</option>
        </select><br>
        <p>Wstaw nową treść: </p><input type=text name=name value='' maxlength="100"><br>
        <p>Współrzędne wstaw w postaci: lat, lng  </p> 
        <p>Np: lat: 51.031836, lng: 16.97143989999995  </p> 
        <a href="https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en" target="_blank"><p>Więcej na ich temat.</p></a>
        <input type=submit value='Zapisz'>
        <button type="button"><a href ='register-directory.php'>Wróć do strony głównej</a></button>
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
    
    
    

