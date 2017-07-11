<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>
    
<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>KREACJA</title>
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
                <h2> KREACJA </h2>
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

