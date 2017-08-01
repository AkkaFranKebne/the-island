<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>
    
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
                    <div class='title-bar'><h2><span>KREACJA</span></h2></div>
                    <div class='description-bar'><h4>Zderzenie kreatywności i doświadczenia z domieszką odrobiny magii.<br>
Tak powstają projekty niesamowite, które opowiadają pasjonujące historie.<br>
To obrazy, od których ciężko oderwać wzrok. </h4></div>
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
