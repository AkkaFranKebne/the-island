<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;

include 'elements_db_connection.php';?>
    
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
                    <div class='title-bar'><h2><span><?php include 'elements_title.php';?></span></h2></div>
                    <div class='description-bar'><h4><?php include 'elements_description.php';?></h4></div>
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
