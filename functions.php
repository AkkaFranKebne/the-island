<?php 

function createBasicThumbnailFROMBIGIMAGE350x220($filename) {
        $final_width_of_image = 350;
        $final_height_of_image = 220;
        
            //check if img is jpg
            if(preg_match('/[.](jpg)$/', $filename)) {
                //create image from file
                $im = imagecreatefromjpeg('images/'. $filename);
                //save to variables orginal height and width of the image
                $ox = imagesx($im);
                //$oy = imagesy($im);
                //scalling for different ratio
                $oy = 1257;
                //saves to variable a final width and height of a thumbnail
                $nx = $final_width_of_image;
                $ny = $final_height_of_image;
                //creates new image with the given height and width
                $nm = imagecreatetruecolor($nx, $ny);
                //copy the downloaded image to the new created image, with the resize, you can add a possition here. The coordinates refer to the upper left corner.  http://php.net/manual/en/function.imagecopyresized.php
                //bool imagecopyresized ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
                imagecopyresampled($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //creates a JPEG file from the given image.; Output image to browser or file
                imagejpeg($nm, 'images/thumbnail_'. $filename, 100);
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }

function createBasicThumbnailFROMDOWNLOADEDTHUMBNAIL350x220($filename, $thumbnail_filename) {
        $final_width_of_image = 350;
        $final_height_of_image = 220;
        
            //check if img is jpg
            if(preg_match('/[.](jpg)$/', $thumbnail_filename)) {
                //create image from file
                $im = imagecreatefromjpeg('images/'. $thumbnail_filename);
                //save to variables orginal height and width of the image
                //scalling for different ratio
                //$ox = imagesx($im);
                $ox = 700;
                $oy = imagesy($im);
                //saves to variable a final width and height of a thumbnail
                $nx = $final_width_of_image;
                $ny = $final_height_of_image;
                //creates new image with the given height and width
                $nm = imagecreatetruecolor($nx, $ny);
                //copy the downloaded image to the new created image, with the resize, you can add a possition here. The coordinates refer to the upper left corner.  http://php.net/manual/en/function.imagecopyresized.php
                //bool imagecopyresized ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
                imagecopyresampled($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //creates a JPEG file from the given image.; Output image to browser or file
                $path_parts = pathinfo('images/'. $filename);
                header("Content-Type: image/jpeg");
                imagejpeg($nm, 'images/thumbnail_'.$path_parts['filename'].'.'.$path_parts['extension'], 100);
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }


        function createBigThumbnail800x440($filename) {
        $final_width_of_image = 800;
        $final_height_of_image = 440;
            if(preg_match('/[.](jpg)$/', $filename)) {
                $im = imagecreatefromjpeg('images/'. $filename);
                $ox = imagesx($im);
                //$oy = imagesy($im);
                //scalling for different ratio
                $oy = 1100;
                $nx = $final_width_of_image;
                $ny = $final_height_of_image;
                $nm = imagecreatetruecolor($nx, $ny);
                imagecopyresampled($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //file path - to add the suffix
                $path_parts = pathinfo('images/'. $filename);
                header("Content-Type: image/jpeg");
                imagejpeg($nm, 'images/thumbnail_'.$path_parts['filename'].'_nondesktop.'.$path_parts['extension'], 100);
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }

    function createDesktopImg1000x660($filename) {
        $final_width_of_image = 1000;
        $final_height_of_image = 660;
            if(preg_match('/[.](jpg)$/', $filename)) {
                $im = imagecreatefromjpeg('images/'. $filename);
                $ox = imagesx($im);
                $oy = imagesy($im);
                $nx = $final_width_of_image;
                $ny = $final_height_of_image;
                $nm = imagecreatetruecolor($nx, $ny);
                imagecopyresampled($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //file path - to add the suffix
                $path_parts = pathinfo('images/'. $filename);
                header("Content-Type: image/jpeg");
                imagejpeg($nm, 'images/'.$path_parts['filename'].'_desktop.'.$path_parts['extension'], 100);
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }

    function createNondesktopImg800x530($filename) {
        $final_width_of_image = 800;
        $final_height_of_image = 530;
            if(preg_match('/[.](jpg)$/', $filename)) {
                $im = imagecreatefromjpeg('images/'. $filename);
                $ox = imagesx($im);
                $oy = imagesy($im);
                $nx = $final_width_of_image;
                $ny = $final_height_of_image;
                $nm = imagecreatetruecolor($nx, $ny);
                imagecopyresampled($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //file path - to add the suffix
                $path_parts = pathinfo('images/'. $filename);
                header("Content-Type: image/jpeg");
                imagejpeg($nm, 'images/'.$path_parts['filename'].'_nondesktop.'.$path_parts['extension'], 100);
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }

    function createMobileImg450x300($filename) {
        $final_width_of_image = 450;
        $final_height_of_image = 300;
            if(preg_match('/[.](jpg)$/', $filename)) {
                $im = imagecreatefromjpeg('images/'. $filename);
                $ox = imagesx($im);
                $oy = imagesy($im);
                $nx = $final_width_of_image;
                $ny = $final_height_of_image;
                $nm = imagecreatetruecolor($nx, $ny);
                imagecopyresampled($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
                //file path - to add the suffix
                $path_parts = pathinfo('images/'. $filename);
                header("Content-Type: image/jpeg");
                imagejpeg($nm, 'images/'.$path_parts['filename'].'_mobile.'.$path_parts['extension'], 100);
                }
        else { echo "Obrazek musi byc w formacie jpg";}
    }



?>
                