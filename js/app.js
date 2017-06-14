$(document).ready(function(){
    
    /*dylematy
    
    zastanowic sie, czy potrzebne sa w ogole obrazki w kawalkach
    
    jak naprawde czekac na zaladowanie sie obrazkow - nie dluzej, nie krocej? sprawdz https://github.com/desandro/imagesloaded
    
    jak trzymac obrazki na czas sesji aby nie ladcowaly sie w czasie kolejnych przeladowan strony? ajax? local storage?
    
    mryganie na poczatek - jak zrobic tylko raz w sesji? php?
    
    co ze starszymi przegladarkami
    
    problem po przeniesieniu na serwer
    
    jak polepszyc wydajnosc strony
    
    powtarzajace sie elementy strony - umiescic w pho?
    
    */
    
    /* obczaic
    animacja css przy toggle class - patrz przyklad hamburger
    */
    
    
    //----------------------start-------
    
    // preloader-------------------------------------
    
    var main = $('main');
    main.addClass('hidden');
    
    
    $(window).on("load", function() {
		setTimeout(function() {
			  $('body').removeClass('loading');
              main.removeClass('hidden');			  
		}, 3300);
	});
    
        
     //hamburger onclick-------------------------------
    
    var hamburger = $('#hamburger');
    hamburger.on('click', function(){
       $(this).toggleClass('change'); 
    });
    
    
    //resizing map-image -  raz, po zaladowaniu strony - przepisac na jquery
    

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

    
    // podpiecie biblioteki maplight-----------------
    
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
    
    
    //animacja poczatkowa areas z mapy
        
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
 
    // animacja obrazkow w tle---------------------
   
    var partsofIsland = $('.grpelem');
    //console.log(partsofIsland);


    /*  //do uzycia, jesli zdecydujemy sie bawic opacity 
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
    
    
   //eventy na najechanie mysza i zjechanie - nie sa potrzebne, biblioteka robi je domyslnie


    /*
    areas.on('mouseenter', function(event){
       event.preventDefault();
       console.log("mouseenter");
        $(this).maphilight();
    });
    
    
        
    areas.on('mouseleave', function(event){
       event.preventDefault();
       console.log("mouseleave");
   });
   
     */
    
 //click w obszar ----------------------------------
    
   areas.on('click', function(event){
       //event.preventDefault();
       var linkString = $(this).attr('href');
       var title = $(this).attr('title');
       var relatedPartOfIsland; 
       
       partsofIsland.each(function(index, ele){
         if ($(this).attr('id') === title) {
            relatedPartOfIsland = $(this);    
         }     
       });
       
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
           
       $('#island').addClass('hidden');    

       relatedPartOfIsland
           .removeClass('hidden')
           .addClass('exposed');
       relatedPartOfIsland.find('img')
           .attr('src', 'images/wyspa%20www.png')
           .css({
               "position":"fixed"
           })
           .delay(200)
           .animate({
               left: left,
               top: top,
               height: '1647px',
               width: '2822px'
           },2000);
        timeout();
        return false;
         
        
         //ustawianie opoznionego przeladowania stronny
         function timeout() {
            setTimeout(reloadPage, 2300);
         }  
         
         
         
          function reloadPage() {
            location.href = linkString;
          }

       // dodac dla wszystkich elementow w oparciu o background position  - jak?
       //dodac overflow hidden
       //jak przejsc z wycinanego obrazka do pelnego ? dolozyc go trzeba jeszcze na tej stronie
       //czy ukrywac reszte wyspy?
       //dodac przekierowanie na strone
   });
   
   
  
   
   
   
  
    

 //-------------------end----------------------------   
});