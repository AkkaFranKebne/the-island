<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
include 'elements_db_connection.php';?>
    

<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>BRAK STRONY</title>
     <?php include 'elements_meta.php';?>
</head>
   </head>
 <body id = "page-404">
     <?php include 'elements_tagManagerBodyElement.php';?>
    
    <div id="menuOpacity"> </div> 
     
    <div class="grid-container">
        
        <div class="row">
            <div class="col-12">

            </div>
        </div>
        
     <main>
        <div class="row">
            <div class="col-12">
                <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
            </div>
        </div> 

    </main>  

        </body>
</html>
