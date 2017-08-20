<?php
include 'elements_db_connection.php';
    
/*
used table galleries:

id
url
data_order
content_type
image
same_thumbnail_img
thumbnail
link
name
surname
job_position

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
    <form action='#' method=post enctype="multipart/form-data">
        <h1>Zmień galerię na stronie:</h1>
        <p>Jeżeli chcesz usunąć daną pozycję ze strony bez zastępowania inną, wybierz tylko stronę i pozycję elementu i zatwierdź "Zapisz" </p>
        <p>Wybierz stronę: </p>
        <select id='url' name=url ><br>
          <option id ='about' value='about.php'>about.php</option>
          <option value='eventy.php'>eventy.php</option>
          <option value='kreacja.php'>kreacja.php</option>
          <option value='sm.php'>sm.php</option>
          <option value='www.php'>www.php</option>
        </select><br>
        
        <p>Wstawiasz obraz JPG czy link do VIMEO? </p>
        <select id='content-type' name=content_type ><br>
          <option id='jpg-content-type' value='mate'>JPG</option>
          <option id='vimeo-content-type' value='mate video'>link do VIMEO</option>
        </select><br>
        
        <p class='for-jpg'>Obraz w formacie JPG, wymiary 2000px X 1320px :</p> <input class='for-jpg' type=file name=image ><br>
        
        <p  class='for-jpg' >Thumbnail z tego samego zdjęcia? </p>
        <select  id='thumbnail' class='for-jpg' name=same_thumbnail_img ><br>
          <option id='same_thumbnail' value='same_thumbnail'>tak</option>
          <option id='different_thumbnail' value='different_thumbnail'>nie</option>
        </select><br>
        
        <p class='for-thumbnail for-vimeo notDisplayed'>Obrazek dla thumbnail w formacie JPG, wymiary 800px X 440px :</p> <input class='for-thumbnail for-vimeo notDisplayed' type=file name=thumbnail ><br>
        
        <p class='for-vimeo'>Link do VIMEO (np https://player.vimeo.com/video/202009420): </p><input class='for-vimeo' type=text name=link value=''><br>
        
        <p>Nowy opis (alt): </p><input type=text name=name value=''><br>
        
        <p>Pozycja elementu (od 1, liczona od lewego górnego rogu galerii): </p><input type=text name=data_order value=''><br>
        
        <p class='for-about-gallery'>Imię i nazwisko: </p><input class='for-about-gallery' type=text name=surname value=''><br>
        
        <p class='for-about-gallery'>Stanowisko: </p><input class='for-about-gallery' type=text name=job_position value=''><br>
        
        <input type=submit value='Zapisz'>
        <button type="button"><a href ='register-directory.php'>Wróć do strony głównej</a></button>
    <div class = 'greetings'>
    <div class='message'>
        

    
<?php
        
    include 'functions.php'; 

   
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        //check if required fields were submitted
        if(strlen(trim($_POST["url"])) >0 && strlen(trim($_POST["data_order"])) >0) {
            
            //creating variables from these fields
            $url = mysqli_real_escape_string($conn, $_POST["url"]);
            $data_order = mysqli_real_escape_string($conn, $_POST["data_order"]);
            $content_type = mysqli_real_escape_string($conn, $_POST["content_type"]);  
            $same_thumbnail_img = mysqli_real_escape_string($conn, $_POST["same_thumbnail_img"]);  
            $link = mysqli_real_escape_string($conn, $_POST["link"]);  
            $name = mysqli_real_escape_string($conn, $_POST["name"]);  
            $surname = mysqli_real_escape_string($conn, $_POST["surname"]);  
            $job_position = mysqli_real_escape_string($conn, $_POST["job_position"]);  
            
            //echo $content_type;
            
            //and same for image
            if ($content_type =='mate'){
                $filename = $_FILES['image']['name'];
                $source = $_FILES['image']['tmp_name'];
                //the path to store upload files
                $target = "images/".basename($_FILES['image']['name']);
                
                if ($same_thumbnail_img == 'different_thumbnail') {
                    $thumbnail_filename = $_FILES['thumbnail']['name'];
                    $thumbnail_source = $_FILES['thumbnail']['tmp_name'];
                    //changing the final name of the thumbnail
                    $fileData = pathinfo(basename($_FILES["image"]["name"]));
                    $fileName = 'thumbnail_' .$fileData['filename']. '_nondesktop.' . $fileData['extension'];
                    $thumbnail_target = "images/".$fileName;
                    
                } 
            }
            
            //and same for vimeo
            else if ($content_type =='mate video'){
                $filename = $_FILES['thumbnail']['name'];
                $target = $link;
                $thumbnail_filename = $_FILES['thumbnail']['name'];
                $thumbnail_source = $_FILES['thumbnail']['tmp_name'];
                $thumbnail_target_oryginal = "images/".basename($_FILES['thumbnail']['name']);
                echo $thumbnail_target_oryginal;
                //changing the final name of the thumbnail
                    $fileData = pathinfo(basename($_FILES["thumbnail"]["name"]));
                    $fileName = 'thumbnail_' .$fileData['filename']. '_nondesktop.' . $fileData['extension'];
                    $thumbnail_target = "images/".$fileName;
            };
                      
            //send data to sql
            $sql = "SELECT * FROM lemoniada_test.galleries WHERE url ='".$url."'  AND data_order ='".$data_order."'  ";
            $result = $conn->query($sql);
            
            if ($result->num_rows  < 1) { 
                $sql = "INSERT INTO lemoniada_test.galleries (
                url, 
                data_order, 
                content_type, 
                image, 
                same_thumbnail_img, 
                thumbnail, 
                link, 
                name, 
                surname, 
                job_position) 
                VALUES (
                '$url', 
                '$data_order', 
                '$content_type', 
                '$filename', 
                '$same_thumbnail_img', 
                '$thumbnail_filename', 
                '$target', 
                '$name', 
                '$surname', 
                '$job_position')";
                
                if ($conn->query($sql) === TRUE) {
                    echo "<p class='info'>NOWY wpis dodany.</p>";

                } else {
                    echo "<p class='error'>Error: " . $sql . "<br>" . $conn->error."</p>";
                }
            }
            
            //or update sql
            else {
                 $sql = "UPDATE lemoniada_test.galleries 
                 SET 
                 content_type= '$content_type',
                 image= '$filename',  
                 same_thumbnail_img= '$same_thumbnail_img',  
                 thumbnail= '$thumbnail_filename', 
                 link= '$target', 
                 name= '$name', 
                 surname= '$surname', 
                 job_position= '$job_position'
                 WHERE url ='".$url."'  AND data_order ='".$data_order."' ";
                
                if ($conn->query($sql) === TRUE) {
                    echo "<p class='info'>Taki wpis juz istniał. Treść podmieniona.</p>";

                } else {
                    echo "<p class='error'>Error: " . $sql . "<br>" . $conn->error."</p>";
                }               

            }
          
        //move uploaded image to the folder 
         if ($content_type =='mate') {
                       if (move_uploaded_file($source, $target) ) {
                          echo "<p class='info'>Obrazek załadowany</p>";
                          //create extra sizes
                            createDesktopImg1000x660($filename);
                            createNondesktopImg800x530($filename);
                            createMobileImg450x300($filename);
                           if ($same_thumbnail_img == 'same_thumbnail'){
                               createBigThumbnail800x440($filename); createBasicThumbnailFROMBIGIMAGE350x220($filename);
                           }
                        
                          }
                          else {
                              echo "<p class='error'>Nie załadowano obrazka</p>";
                          }
             
         }

        if ($same_thumbnail_img == 'different_thumbnail' | ($content_type =='mate video') ) {
                     if (move_uploaded_file($thumbnail_source, $thumbnail_target) ) {
                      echo "<p class='info'>Thumbnail załadowany</p>";
                        //create extra sizes
                        
                                    //if ($content_type =='mate'){
                                        createBasicThumbnailFROMDOWNLOADEDTHUMBNAIL350x220($filename, $fileName);
                                    //}
                                    //else if ($content_type =='mate video') {
                                       //createBasicThumbnailFROMDOWNLOADEDTHUMBNAIL350x220($thumbnail_filename, $thumbnail_filename);
                                    //}
                            }  
                          else {
                              echo "<p class='error'>Nie załadowano thumbnail</p>";
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
    
    
    

