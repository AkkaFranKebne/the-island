<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
?>
    
<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>NEWBIZ</title>
     <?php include 'elements_meta.php';?>
     <?php include 'elements_contactform_meta.php';?>
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
                    <h2> KONTAKT </h2>
                </div>
            </div> 
            
             
           <div class="row">
                <div class="col-6">
                    <div class="row">
                        <div class="col-12">
                            <h2>ODWIEDZ NAS:</h2>
                            <div id="address">
                                <h3>LemOnHills Sp. z o.o.</h3>
                                <h3>ul. Wiosenna 5a</h3>
                                <h3>55-040 Bielany Wrocławskie</h3>
                                <h3>info@lemonhills.pl</h3>
                                <h3>+48.509.680.400</h3>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                        <?php include 'elements_location.php';?>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <h2> WYSLIJ NAM WIADOMOSC:</h2>
                    <?php include 'elements_contactform.php';?>
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
