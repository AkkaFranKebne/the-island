<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?> 

<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>SOCIAL MEDIA</title>
     <?php include 'elements_meta.php';?>
</head>
 <body id = "sm">
    <div id="menuOpacity"> </div> 
     
    <div class="grid-container">
        
        <div class="row">
            <div class="col-12">
                <?php include 'elements_nav.php';?>
            </div>
        </div>
        
     <main>
        <div class="row">
            <div class="col-12">
                <div class='title-bar'></div>
                <h2> <span>SOCIAL MEDIA</span> </h2>
                <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
            </div>
        </div>           
        
        <?php include 'elements_gallery.php';?>
    </main>  
     <?php include 'elements_footer.php';?>
</body>
</html>