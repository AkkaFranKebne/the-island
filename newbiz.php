<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>
    
<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>NEWBIZ</title>
     <?php include 'elements_meta.php';?>
</head>
 <body id = "newbiz">
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
                    <h2><span>KONTAKT</span>  </h2>
                    <noscript>Strona wymaga uruchomionego Java Script. </noscript>
            <noscript> Zaktualizuj lub zmień przeglądarkę. </noscript>
                </div>
            </div> 
            
             
           <div class="row">
                <div class="col-5">
                    <div class="row">
                        <div class="col-12">
                            <div class="address">
                                <h4>LemOnHills Sp. z o.o.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-7">
                            <div class="address">
                                <h4>ul. Wiosenna 5a</h4>
                                <h4>55-040 Bielany Wrocławskie</h4>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="address">
                                <h4 class="to-right">info@lemonhills.pl</h4>
                                <h4 class="to-right">+48.509.680.400</h4>
                            </div>
                        </div>

                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <div id="frame"><?php include 'elements_location.php';?></div>
                        </div>
                    </div>
                </div>
               
               <div class="col-1"></div>
                <div class="col-6">
                    <?php include 'elements_contactform.php';?>
                </div>
            </div> 
           <div class="row">
                    <div class="col-12">
                        <div class='aboutus'>
                            <a href="#">
                            <img class="aboutus" src="images/about-us.png" alt="" />
                        </a>
                        </div>
                    </div>
                </div>
            </div> 
        
         </div>
        </main>        
      
        
        <div class="row">
            <div class="col-12">
                <?php include 'elements_footer.php';?>
            </div>
        </div>
        
    </div>
</body>
</html>