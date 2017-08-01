<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>

<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>O NAS - LemOnHills - Agencja Marketingowa</title>
     <?php include 'elements_meta.php';?>
</head>
 <body id = "about">
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
                    <div class='title-bar'><h2><span>O NAS</span></h2></div>
                    <div class='description-bar'><h4>Tworzymy kreacje, planujemy media, zajmujemy się wizerunkiem, organizujemy eventy.<br>
Synergia wiedzy i doświadczenia pozwala nam projektować kampanie kompleksowo, w oparciu o najnowsze technologie i standardy.<br>
Wiemy, jak ważna jest komunikacja, dlatego zawsze chętnie z Wami porozmawiamy.<br>
Zapraszamy do współpracy.</h4></div>
                <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
            </div>
        </div>           
        
        <?php include 'elements_gallery.php';?>
    </main>  
     <?php include 'elements_footer.php';?>
</body>
</html>