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
                            <h3>ODWIEDZ NAS:</h3>
                            <div id="address">
                                <h4>LemOnHills Sp. z o.o.</h4>
                                <h4>ul. Wiosenna 5a</h4>
                                <h4>55-040 Bielany Wrocławskie</h4>
                                <h4>info@lemonhills.pl</h4>
                                <h4>+48.509.680.400</h4>
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
                    <h3> WYSLIJ NAM WIADOMOSC:</h3>
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
