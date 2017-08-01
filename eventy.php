<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>
    

<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>EVENTY - LemOnHills - Agencja Marketingowa</title>
     <?php include 'elements_meta.php';?>
</head>
   </head>
 <body id = "eventy">
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
                    <div class='title-bar'><h2><span>EVENTY</span></h2></div>
                        <div class='description-bar'><h4>Towarzyszą nam na co dzień.<br>
Różni je rozmiar, rozmach, koncepcja, wykonanie. Niezależnie czy to urodziny, koncerty, podróże dookoła Świata, lądowanie na księżycu, imprezy firmowe, targi, pokazy, konferencje, czy odkrycie Ameryki - ważne by odniosły pożądany skutek. My wiemy jak tego dokonać.</h4></div>
                <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
            </div>
        </div>           
        
        <?php include 'elements_gallery.php';?>
    </main>  
     <?php include 'elements_footer.php';?>
</body>
</html>
