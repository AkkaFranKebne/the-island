$(document).ready(function(){
    
    
     /* to do
     -zastanowic sie, czy potrzebne sa w ogole obrazki w kawalkach - tak, inaczej nie dziala zmiana rozmiaru ...
    -zrobic animacje odwrotna
    -mryganie na poczatek - jak zrobic tylko raz w sesji? php?
    -przepisac funkcje na jquery
    -animacja css przy toggle class - patrz przyklad hamburger
    - przekazywanie wymiarow get i post?
    - krzyzyk na hover  white
    */
    
    
    /*dylematy
    jak wycentrowac w poziomie wyspe?
    jak naprawde czekac na zaladowanie sie obrazkow - nie dluzej, nie krocej? sprawdz https://github.com/desandro/imagesloaded
    
    jak trzymac obrazki na czas sesji aby nie ladcowaly sie w czasie kolejnych przeladowan strony? ajax? local storage?
    
    
    
    co ze starszymi przegladarkami
    
    problem po przeniesieniu na serwer
    
    jak polepszyc wydajnosc strony
    */
    
   
    
    //----------------------start--------------------
    
    // ---------preloader--gif-----------------------
    
    var main = $('main');
    main.addClass('hidden');
 
		setTimeout(function() {
			  $('body').removeClass('loading');
              main.removeClass('hidden');			  
		}, 3300);
    
    /*
    $('body').imagesLoaded( function() {
            $('body').removeClass('loading');
              main.removeClass('hidden');
});
     */   
    
    // ----hamburger menu mouseover actions------------
     var hamburger = $('#hamburger');
    
    hamburger.on('mouseenter', function(event){
        $(this).children().css('background-color', 'white');
    });
    
    hamburger.on('mouseleave', function(event){
        $(this).children().css('background-color', 'cadetblue');
    });
    
    
     // ----hamburger menu onclick actions------------
    

    hamburger.on('click', function(){
       $(this).toggleClass('change'); 
        console.log($(this).parent().css("width"));
        if ($(this).parent().css("width") === '0px') {
            $(this).parent().css("width", "250px");
            $('#menuOpacity').css("background-color", "rgba(0,0,0,0.4)").css("z-index", "1");
            
        }
        else if ($(this).parent().css("width") === '250px') {
            $(this).parent().css("width", "0px");
            $('#menuOpacity').css("background-color", "transparent").css("z-index", "-3");
        }
       
    });
    
    // ----opacity in menu onclick actions------------
    
    $('#menuOpacity').on('click', function(){
        $(this).css("background-color", "transparent").css("z-index", "-3");
        hamburger.toggleClass('change').parent().css("width", "0px");
    })
    
    
        //----click in x on subpagess header action ------------------------------------------------
   /*
   $('#close').on('click', function(event){
       $(this).parent().parent().parent()
           .css({
                "transition": "2s",
                "transform-origin": "1000 1000",
                "background-size": "70vw auto",
                "background-position": "center" //do dokonczenia - jak uwspolnic z wyspa. jak wycentrowac wyspe optymalnie?
           //do dokonczenia - zrobic animacje css transform
           });
       //setting the delayed rerirect  - see function below
            timeout();
        return false;
         

         function timeout() { //setting the delayed reload
            //setTimeout(reloadPage, 2300);
         }  
           
          function reloadPage() { //setting links
            location.href = 'index.php';
          }
          

   });
    
    */
    
    // ----resizing map image - once during downloading the website------------
    
    //rewrite to jquery maybe?
    var ImageMap = function (map) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                previousWidth = 2690;  
            //console.log(areas);
            for (n = 0; n < len; n++) {
                coords[n] = areas[n].coords.split(',');
            }
            this.resize = function () {
                var n, m, clen,
                    x = document.body.clientWidth / previousWidth;
                for (n = 0; n < len; n++) {
                    clen = coords[n].length;
                    for (m = 0; m < clen; m++) {
                        coords[n][m] *= x;
                    }
                    areas[n].coords = coords[n].join(',');
                }
                previousWidth = document.body.clientWidth;
                return true;
            };
            window.onresize = this.resize;
        },
        imageMap = new ImageMap(document.getElementById('island'));
    imageMap.resize();

    
    //------map areas on hover: maplight library ---------------------------
    
    //jQuery('#island_img').maphilight();

    
    $('#island_img').maphilight({ 
        stroke: false, 
        strokeColor: 'ffffff',
        strokeWidth: 0,
        fillColor: '009DDF', 
        fillOpacity: 0.1,
        shadow: true,
        shadowX: 5,
        shadowY: 5,
        shadowRadius: 6,
        shadowColor: '000000',
        shadowOpacity: 0.8,
        shadowPosition: 'outside',
        alwaysOn: false
    });
    
    
    //--map areas animation on start ---------------------
        
    //$("area").eq(0).data('maphilight', { alwaysOn: true }).trigger('alwaysOn.maphilight');

       var areas = $('area');
    
        function noticeMyArea(ele, delay1, delay2){
        setTimeout(function(){ele.data('maphilight', { alwaysOn: true }).trigger('alwaysOn.maphilight')}, delay1);
        setTimeout(function(){ele.data('maphilight', { alwaysOn: false }).trigger('alwaysOn.maphilight')}, delay2);
    };
    
    noticeMyArea(areas.eq(3), 4000, 4400);
    noticeMyArea(areas.eq(4), 4100, 4500);
    noticeMyArea(areas.eq(0), 4200, 4600);
    noticeMyArea(areas.eq(1), 4300, 4700);
    noticeMyArea(areas.eq(2), 4400, 4800);
    noticeMyArea(areas.eq(3), 4500, 4900);
 
    //--hidden island parts  animation on start ---------------------
   
    var partsofIsland = $('.grpelem');
    //console.log(partsofIsland);


    /*  
        function noticeMe(ele, delay){
        setTimeout(function(){ele.removeClass('hidden')}, delay);
        setTimeout(function(){ele.addClass('exposed')}, delay);
        ele.delay(delay).animate({
                //opacity: 1
        },300).animate({
                //opacity: 0.8
        },200, function(){
            ele.removeClass('exposed');
            ele.addClass('hidden');
        });
    };
    
    noticeMe(partsofIsland.eq(3), 4000);
    noticeMe(partsofIsland.eq(5), 4100);
    noticeMe(partsofIsland.eq(6), 4200);
    noticeMe(partsofIsland.eq(4), 4300);
    noticeMe(partsofIsland.eq(2), 4400);
*/
    
    
 //--------map areas clicks actions------------------------
    
   areas.on('click', function(event){
       //links to subpages
       var linkString = $(this).attr('href');
       //titles of areas
       var title = $(this).attr('title');
       //related parts of the island
       var relatedPartOfIsland; 
       partsofIsland.each(function(index, ele){
         if ($(this).attr('id') === title) {
            relatedPartOfIsland = $(this);    
         }     
       });
       //position of the image for the further animation. the numbers are the position of the background image at the subpage
       var left = "";
       var top = "";
       
       if (title === "newbiz"){
           left = "700";
           top = "-600";
       }
       else if (title === "eventy"){
           left = "-1000";
           top = "-500";
       } 
       else if (title === "kreacja"){
           left = "-1800";
           top = "100";
       }
       else if (title === "www"){
           left = "-350";
           top = "250";
       }
       else if (title === "sm"){
           left = "170";
           top = "100";
       }
       
       //hiding the whole island image 
       $('#island').addClass('hidden');    
       
       //showing the partial image 
       relatedPartOfIsland
       //$('#island')<---------------------------tak nie dziala
           .removeClass('hidden')
           .addClass('exposed');
       //and changing it to the whole island image 
       relatedPartOfIsland
       //$('#island')<---------------------------tak nie dziala: mapa pilnuje rozmiaru?
           .find('img')
           .attr('src', 'images/wyspa%20www.png')
       //giving it the position - see above if-else
           .css({
               "position":"fixed"
           })
           .delay(200)
       //extending the image to the proportion of the background at the subpage
           .animate({
               left: left,
               top: top,
               height: '1647px',
               width: '2822px'
           },2000);
       //setting the delayed rerirect  - see function below
            timeout();
        return false;
         

         function timeout() { //setting the delayed reload
            setTimeout(reloadPage, 2300);
         }  
           
          function reloadPage() { //setting links
            location.href = linkString;
          }

   });
    


 //-------------------end----------------------------   
});