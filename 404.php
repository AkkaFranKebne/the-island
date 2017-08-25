<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>
    

<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>BRAK STRONY</title>
     <?php include 'elements_meta.php';?>
</head>
   </head>
 <body id = "social-media">
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
                <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
                    <h2 id='error_page404'>404</h2>
                    <h2 id='error_page_info'>Nic tu nimo...</h2>
            </div>
        </div> 
        <div class="row">
            <div class="col-4">

                
            </div>
            <div class="col-4">
                    <img id='error_page_image' src="images/404.jpg" alt="404" height="150" width="280">
                
            </div>
                 <div class="col-4">

                
            </div>
        </div>
    </main>  
     <?php include 'elements_footer.php';?>
</body>
</html>
