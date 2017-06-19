<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>

<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>MAIN</title>
     <?php include 'elements_meta.php';?>
</head>
        
 <body   <?php  
       if ($_SESSION["seen_intro"]==0) {
           echo "class='loading'";
       }  ?>>
    <div id="menuOpacity"> </div> 
    <?php include 'elements_nav_main.php';?>
    <main <?php  
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
   <?php include 'elements_footer.php';?>
 </body>
</html>




