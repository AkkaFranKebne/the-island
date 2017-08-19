<?php

//require "simplehtmldom_1_5/simple_html_dom.php";


//connect with database: https://www.w3schools.com/php/php_mysql_insert.asp
$user = 'root';
$pass ='';
$db = 'lemoniada_test'; //zalozona w http://localhost/phpmyadmin/server_databases.php?db=
$conn = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect".$conn->connect_error);
//echo "Connected to the database <br>";
    
/*
tabela krainy stworzona w phpmyadmin/sql

url
name
description


//testowanie wrzucania do bazy - dziala

$sql = "INSERT INTO lemoniada_test.krainy (url, name, description)
VALUES ('costam2.php', 'COSTAM2', 'Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();

//testowanie wyciagania z bazy ; - dziala


$sql = "SELECT name, description FROM lemoniada_test.krainy WHERE url ='costam2.php'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "name: " . $row["name"];
        echo " ";
        echo "description: " . $row["description"];
    }
} else {
    echo "0 results";
}
$conn->close();


function ShowForm($komunikat=""){	//funkcja wyświetlająca formularz rejestracyjny
	echo "$komunikat<br>";
	echo "<form action='#' method=post>";
	echo "url: <select  name=url><br>
          <option value='about.php'>about.php</option>
          <option value='eventy.php'>eventy.php</option>
          <option value='kreacja.php'>kreacja.php</option>
          <option value='newbiz.php'>newbiz.php</option>
          <option value='sm.php'>sm.php</option>
          <option value='www.php'>www.php</option>
        </select> <br>";
	echo "name: <input type=text name=name value=''><br>";
	echo "description: <textarea type=text name=desc></textarea><br>";
	echo "<input type=submit value='Wyslij'>";
	echo "</form>";
}
*/
?>



<!DOCTYPE html>
<html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Zmien opis na stronie</title>
    <link rel="stylesheet" href="css-minified/index.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body id ="register_form">
    <header>
        <div class="title"><h1>Zmień opis na stronie:</h1></div>
    </header>
    <form action='#' method = post>
        <h1>Zmień opisy na stronie:</h1>
        <p>Wybierz stronę: </p>
        <select name=url method=post><br>
          <option value='about.php'>about.php</option>
          <option value='eventy.php'>eventy.php</option>
          <option value='kreacja.php'>kreacja.php</option>
          <option value='newbiz.php'>newbiz.php</option>
          <option value='sm.php'>sm.php</option>
          <option value='www.php'>www.php</option>
        </select><br>
        <p>Wstawy nowy tytuł: </p><input type=text name=name value=''><br>
        <p>Wstawy nowy opis. Do nowych linii używaj znacznika <code> &ltbr&gt </code> : </p> <textarea type=text name=desc></textarea><br>
        <input type=submit value='Zapisz'>

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
    
    
    

