<div class="row gallery">
    <div class="col-12 photos">
        <div class="row">
            <picture class="col-4">
                <a href="#" title="MDM Mieszkania na Krzykach  - materiały reklamowe">
                    <img id="gallery" src="images/thumbnail_nowy_produkt.jpg" alt="MDM Mieszkania na Krzykach  - materiały reklamowe" data-source="images/nowy_produkt.jpg" data-order="1">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
            <picture class="col-4">
                <a href="#" title="PIAZZA DI MODA - materiały promocyjne">
                    <img src="images/thumbnail_piazza-di-moda.jpg" alt="PIAZZA DI MODA - materiały promocyjne" data-source="images/piazza-di-moda.jpg" data-order="2">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
            <picture class="col-4">
                <a href="#" title="Konferencja PGN Wrocław Miasto Jutra - projekty i produkcja materiałów konferencyjnych">
                    <img src="images/thumbnail_pgn-wroclaw.jpg" alt="Konferencja PGN Wrocław Miasto Jutra - projekty i produkcja materiałów konferencyjnych" data-source="images/pgn-wroclaw.jpg" data-order="3">
                        <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
        </div>
        
        <div class="row">
            <picture class="col-4">
                <a href="#" title="OSIEDLE PRZYSTAŃ - folder sprzedażowy">
                    <img src="images/thumbnail_osiedle-przystan.jpg" alt="OSIEDLE PRZYSTAŃ - folder sprzedażowy" data-source="images/osiedle-przystan.jpg" data-order="4">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
            <picture class="col-4">
                <a href="#" title="MEDICUS - MATERIAŁY BTL">
                    <img src="images/thumbnail_medicus-materialy-btl.jpg" alt="MEDICUS - MATERIAŁY BTL" data-source="images/medicus-materialy-btl.jpg" data-order="5">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
            <picture class="col-4">
                <a href="#" title="IBS DESIGN - materiały reklamowe">
                    <img src="images/thumbnail_ibs-design.jpg" alt="IBS DESIGN - materiały reklamowe" data-source="images/ibs-design.jpg" data-order="6">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
        </div>
        <div class="row">
            <picture class="col-4">
                <a href="#" title="Gala Oscarów MEDICUSA - oprawa graficzna, produkcja materiałów, scenografia, hostessy, wizaż">
                    <img src="images/thumbnail_gala-oskarow-medicusa.jpg" alt="Gala Oscarów MEDICUSA - oprawa graficzna, produkcja materiałów, scenografia, hostessy, wizaż" data-source="images/gala-oskarow-medicusa.jpg" data-order="7">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
            <picture class="col-4">
                <a href="#" title="QUTE product animation">
                    <img class='video' src="images/thumbnail_QUTE-product-animation.jpg" alt="QUTE - product animation" data-source='https://player.vimeo.com/video/202009420' data-order="8">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
            <picture class="col-4">
                <a href="#" title="PORT LOTNICZY WROCŁAW - sezonowy KeyVisual (jesień/zima 2016/17)">
                    <img src="images/thumbnail_port-lotniczy-wroclaw.jpg" alt="PORT LOTNICZY WROCŁAW - sezonowy KeyVisual (jesień/zima 2016/17)" data-source="images/port-lotniczy-wroclaw.jpg" data-order="9">
                    <div class='image-description'><h3>Andrzej Smutny</h3>
                    <h3>PREZES</h3></div>
                </a>
            </picture>
        </div>

        <!-- The Modal -->
        <div class="row" id="modal" class="modal">
        <div  class="col-12 modal-area">

            <!-- The Close Button -->
            <div class='top-bar hidden'>    
                <span class="close" id="modal-close"></span>
                 <div class="arrow left hidden"></div>
                 <div class="arrow right hidden"></div>
            </div>

            <!-- Modal Content PRE (The Image) -->
            <img class="previous-modal-content" src="#">
  

            <!-- Preloader-->
            <img id="preloader" src="images/loading.gif" >

            <!-- Modal Content (The Image) -->
            <img class="modal-content hidden" src="#">
            <div id="video" class ='video'></div>


            <!-- Modal Content NEXT (The Image) -->
            <img class="next-modal-content hidden" src="#">


            <!-- Modal Caption (Image Text) -->
            <div class='bottom-bar hidden'><div id="caption" class="hidden"></div></div>
            


        </div>
        </div>
        
            <script type="text/javascript">
        
        //fulscreen tests ------///
          var modal = document.getElementById("modal");
          var close = document.getElementById("modal-close");
          var pictures = document.getElementsByTagName('img');
          var mobile = window.matchMedia("screen and  (max-width: 450px)");
          var nondesktop = window.matchMedia("screen  and (max-width: 800px) and (min-width: 451px)");
          var portrait = window.matchMedia("(orientation: portrait)");
        
          function requestFullscreen(ele) {
                if (ele.requestFullscreen) {
                    ele.requestFullscreen();
                } else if (ele.webkitRequestFullscreen) {
                    ele.webkitRequestFullscreen();
                } else if (ele.mozRequestFullScreen) {
                    ele.mozRequestFullScreen();
                } else if (ele.msRequestFullscreen) {
                    ele.msRequestFullscreen();
                } else {
                    console.log('Fullscreen API is not supported.');
                }
            };
                
            var exitFullscreen = function() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else {
                    console.log('Fullscreen API is not supported.');
                }
            };
          
                
        if ((mobile.matches || nondesktop.matches) && !portrait.matches) {
            for (var  i = 0; i < pictures.length; i ++){
                  pictures[i].addEventListener("click", function(e) {
                      requestFullscreen(modal);
                  }, false);              
            }
            close.addEventListener("click", function(e) {
                      exitFullscreen();
                  }, false);

        }
    </script>
    

    </div>
