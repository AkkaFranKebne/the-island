<?php
//polaczenie z baza danych: https://www.w3schools.com/php/php_mysql_insert.asp
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

*/
//testowanie wrzucania do bazy - dziala
/*
$sql = "INSERT INTO lemoniada_test.krainy (url, name, description)
VALUES ('costam2.php', 'COSTAM2', 'Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222 Lorem22 ipsum22 lorem22 ipsum222 lorem ipsum222')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
*/
//testowanie wyciagania z bazy ; - dziala

/*
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
*/

function ShowForm($komunikat=""){	//funkcja wyświetlająca formularz rejestracyjny
	echo "$komunikat<br>";
	echo "<form action='#' method=post>";
	echo "url: <input type=text name=url><br>";
	echo "name: <input type=text name=name><br>";
	echo "description: <input type=text name=desc><br>";
	echo "<input type=submit value='Wyslij'>";
	echo "</form>";
}
?>
<!DOCTYPE html>
<html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register new content</title>
    <link rel="stylesheet" href="css/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body id ="register_form">
    <header>
        <div class="title"><h1>Register new content:</h1></div>
    </header>
    <div class = 'greetings'>
    <div class='message'>
    
<?php
   
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        
        if(strlen(trim($_POST["url"])) >0 && strlen(trim($_POST["name"])) >0 && strlen(trim($_POST["desc"])) >0) {
            $url = mysqli_real_escape_string($conn, $_POST["url"]);
            
            $sql = "SELECT * FROM lemoniada_test.krainy WHERE url ='".$url."'";
            $name = mysqli_real_escape_string($conn, $_POST["name"]);
            $desc = mysqli_real_escape_string($conn, $_POST["desc"]);
            $result = $conn->query($sql);
            
            if ($result->num_rows  < 1) { 
                $sql = "INSERT INTO lemoniada_test.krainy (url, name, description) VALUES ('$url', '$name', '$desc')";
                
                if ($conn->query($sql) === TRUE) {
                    echo "Nowy wpis dodany";

                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
            
            else {
                 $sql = "UPDATE lemoniada_test.krainy SET name = '$name', description =  '$desc' WHERE url ='".$url."'";
                
                if ($conn->query($sql) === TRUE) {
                    echo "Taki wpis juz istnial. Tresc podmieniona";

                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }               

            }
            
        }
        else {
            ShowForm("Nie uzupełniono wszystkich pol!");
        }
        
    }
    
    else {
        
      ShowForm();  
    };
   
?>
    </div>
</div>

    
</body>
</html>
