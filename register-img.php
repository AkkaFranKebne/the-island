<?php

require "simplehtmldom_1_5/simple_html_dom.php";

include 'elements_db_connection.php';?> 
    
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
        //$path_to_image_directory = 'images/';
        //$path_to_thumbs_directory = 'images/';

            
        
    function createThumbnail($filename) {
        $final_width_of_image = 30;
        
            //check if img is jpg
            if(preg_match('/[.](jpg)$/', $filename)) {
                //create image from file
                $im = imagecreatefromjpeg('images/'. $filename);
                //save to variables orginal height and width of the image
                $ox = imagesx($im);
                $oy = imagesy($im);
                //saves to variable a final width of a thumbnail
                $nx = $final_width_of_image;
                //calculates the final height of a thumbnail
                $ny = floor($oy * ($final_width_of_image / $ox));
                //creates new image with the given height and width
                $nm = imagecreatetruecolor($nx, $ny);
                //copy the downloaded image to the new created image, with the resize, you can add a possition here. The coordinates refer to the upper left corner.  http://php.net/manual/en/function.imagecopyresized.php
                //bool imagecopyresized ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
                imagecopyresized($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //creates a JPEG file from the given image.; Output image to browser or file
                imagejpeg($nm, 'images/thumbnail_'. $filename);
                //creates DOM element
                $tn = '<img src="' . 'images/thumbnail_'. $filename . '" alt="image" />';
            echo $tn;
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }

        function createModal($filename) {
        $final_width_of_image = 600;
        $final_height_of_image = 300;
        
            //check if img is jpg
            if(preg_match('/[.](jpg)$/', $filename)) {
                //create image from file
                $im = imagecreatefromjpeg('images/'. $filename);
                //save to variables orginal height and width of the image
                $ox = imagesx($im);
                $oy = imagesy($im);
                //saves to variable a final width of a thumbnail
                $nx = $final_width_of_image;
                $ny = $final_height_of_image;
                //creates new image with the given height and width
                $nm = imagecreatetruecolor($nx, $ny);
                //copy the downloaded image to the new created image, with the resize, you can add a possition here. The coordinates refer to the upper left corner.  http://php.net/manual/en/function.imagecopyresized.php
                //bool imagecopyresized ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
                imagecopyresized($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //creates a JPEG file from the given image.; Output image to browser or file
                //file path
                $path_parts = pathinfo('images/'. $filename);
                imagejpeg($nm, 'images/'.$path_parts['filename'].'_modal.'.$path_parts['extension']);
                //creates DOM element
                $tm = '<img src="' . 'images/'.$path_parts['filename'].'_modal.'.$path_parts['extension']. '" alt="image" />';
            echo $tm;
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }
                

      if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload'])  ){
          if (preg_match('/[.](jpg)$/', $_FILES['image']['name'])) {
            $filename = $_FILES['image']['name'];
            $source = $_FILES['image']['tmp_name'];
            //$target = $path_to_image_directory . $filename;
            
            //the path to store upload files
            $target = "images/".basename($_FILES['image']['name']);
          
            //submitted data
            $image = $_FILES["image"]["name"];
            $alt = $_POST["alt"];
            $title = $_POST["title"];
          
            //send data to sql
            $sql = "INSERT INTO lemoniada_test.zdjecia (photo, title, alt) VALUES ('$image', '$title', '$alt')";          
            if ($conn->query($sql) === TRUE) {
                    echo "Nowy wpis dodany<br>";
            } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
            }
          
          //move uploaded image into the folder
          if (move_uploaded_file($source, $target)) {
              $msg = "<br>obrazek uploadowany<br>";
          }
          else {
              $msg = "problem z uploadowaniem obrazka";
          }
          echo '<br>';
          echo $msg;
          
          
          //create thumbnail
          createThumbnail($filename); 
          createModal($filename); 
          }
          else {echo "Obrazek musi byc w formacie jpg";}
    };
   
?>
   


        
    </div>
</div>  
    
    <?php
    //show the uploaded files
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
    