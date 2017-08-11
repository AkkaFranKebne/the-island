<?php
session_start();
if(empty($_SESSION["seen_intro"]))$_SESSION["seen_intro"]=0;
include 'elements_db_connection.php';?>
    
<!DOCTYPE html>
<html  lang="pl-PL">
 <head>
<title>KONTAKT - LemOnHills - Agencja Marketingowa</title>
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
                    <div class='title-bar'><h2><span><?php include 'elements_title.php';?></span></h2></div>
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
                                <h4>ul. Wiosenna 5a</h4>
                                <h4>55-040 Bielany Wrocławskie</h4>
                                <a href="mailto:info@lemonhills.pl"><h4 >info@lemonhills.pl</h4></a>
                                <a href="tel:+48509680400"><h4 >+48.509.680.400</h4></a>
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
         <!--
           <div class="row">
                    <div class="col-12">
                        <div>
                        <div class="aboutus intro"><h4> Tworzymy kreacje, planujemy media, zajmujemy się wizerunkiem, organizujemy, eventy. </h4><h4> Synergia wiedzy i doświadczenia pozwala nam projektować kampanie kompleksowo, w oparciu o najnowsze technologie i standardy. Wiemy, jak ważna jest komunikacja, dlatego zawsze chętnie z Wami porozmawiamy.</h4></div>
                            
                            
                        <div class="aboutus last">
                            <div class="row">  
                              <div class="col-3">  
                            <img class="person" src="images/person.jpg" alt="" />
                            </div>

                             <div class="col-9">    
                            <h4 class="person-name"> Karolina Kaspi Czyczerska</h4><h4 class="person-description">Karolina, czyli #KolekcjonerkaLajków mieszka #NaWyspie Cytrynowe Wzgórza od niedawna. Zadomowiła się w krainie #SocialMedia, gdzie całymi dniami siedzi na fejsie. </h4></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
             
             ->>
           
        <!--
        <div class="row">
          <div class="col-12">
            <div class = "team">
                    <div class = "mate" id="czycz"></div>
                    <div class = "mate"  id="majk"></div>
                    <div class = "mate"  id="marys"></div>
                    <div class = "mate" id="pabik"></div>
                    <div class = "mate"  id="pawel"></div>
                    <div class = "mate"  id="kaspi"></div>
                    <div class = "mate"  id="klaudia"></div>
                </div>
            </div>
        </div>
        -->
        
         
        </main>        
      
        
        <div class="row">
            <div class="col-12">
                <?php include 'elements_footer.php';?>
            </div>
        </div>
        
    </div>
        
    </div>
     </div>
</body>
</html>