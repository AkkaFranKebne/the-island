<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?> 

<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>SOCIAL MEDIA - LemOnHills - Agencja Marketingowa</title>
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
                    <div class='title-bar'><h2><span>SOCIAL MEDIA</span></h2></div>
                    <div class='description-bar'><h4>Social Media niczym skomplikowana machina wymagają doświadczonego operatora.<br>
Bez jego doświadczenia i wiedzy ich potencjał i możliwości nie zostaną w pełni wykorzystane.<br>
Suma ich potencjału jest większa niż składowe osobno.</h4></div>
                <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
            </div>
        </div>           
        
        <?php include 'elements_gallery.php';?>
    </main>  
     <?php include 'elements_footer.php';?>
</body>
</html>