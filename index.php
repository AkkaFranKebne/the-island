<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>

<!DOCTYPE html>
<html  lang="pl-PL">
    <head>
        <title>LemOnHills - Agencja Marketingowa</title>
        <?php include 'elements_meta.php';?>
    </head>      
    <body  id="main-page-body"  <?php   
       if ($_SESSION["seen_intro"]==0) {
           echo "class='loading'";
       }  ?>>
        <div id="menuOpacity"> </div> 
        <?php include 'elements_nav_main.php';?>
        <main id="main-page-main" <?php  
          if ($_SESSION["seen_intro"]==0) {
              echo "class='hidden'"; 
              $_SESSION["seen_intro"]=1; 
          };
          if ($_SERVER['REQUEST_METHOD'] ==='GET') {
            if (isset($_GET['source'])===true) {
            $source = $_GET['source'];
            echo "data-source ='$source'";
                }
          };
          ?>  >
        <?php include 'elements_map.php';?>
        <?php include 'elements_island_parts.php';?>
        </main> 
        <noscript>Strona wymaga uruchomionego Java Script. Zaktualizuj lub zmień przeglądarkę.</noscript>    
        <?php include 'elements_footer.php';?>
    </body>
    
    <script type="text/javascript">
        
        //fulscreen tests ------///
          var body = document.getElementById("main-page-body");
        
          function toggleFullScreen() {
            if (!document.mozFullScreen && !document.webkitFullScreen) {
              if (body.mozRequestFullScreen) {
                body.mozRequestFullScreen();
              } else {
                body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            } else {
              if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else {
                document.webkitCancelFullScreen();
              }
            }
          }

          document.addEventListener("keydown", function(e) {
            if (e.keyCode == 13) {
              toggleFullScreen();
            }
          }, false);
    </script>
    
    
</html>
