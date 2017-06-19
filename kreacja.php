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
    <?php include 'elements_nav.php';?>
    <main>
    </main> 
    <?php include 'elements_footer.php';?>
</body>
</html>