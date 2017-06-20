$(document).ready(function(){ 
    
     /* to do
     - gdzies w toku prac mapa utracila resize on resize - znalezc przyczyne - poczytac dokumentacje bilbioletki
     -mapa przeliczana na kazdy resize - - poczytac dokumentacje bilbioletki
     to pwp ten sam problem i jeszcze wplywa na pozycje w niektorych przegladarkach, poprawic!!
     
 
     - hamburger niewidoczny na innych przegladarkach: trzeba go wyjac z menu?
     - cos mryga  w animacji backto 
    - sprawdzic dla starszych przegladarek - jest taki element w gulp? minifikacja js i css tyz?
        - przegrac na serwer i zobaczyc jak dziala
    */
    
    /*
    do zrobienia po dogadaniu z klientem
    mobile  i dotykowe - na razie zamarkowane - jak ma wygladac?
    wyglad i mechanika podstron
    
    */
    
    /*dylematy na warsztaty:
    >wydaje sie, ze nie sa potrzebne sa w ogole obrazki w kawalkach - ale inaczej nie dziala zmiana rozmiaru  - help
    >jak wycentrowac w poziomie wyspe?
    >jak trzymac obrazki na czas sesji aby nie ladcowaly sie w czasie kolejnych przeladowan strony? ajax? local storage?
    > problem po przeniesieniu na serwer. jak polepszyc wydajnosc strony?
    
    
    */
    
    
    //----------------------VARIABLES-----------------------------------------------------------------------
    
    //basic//////////
     var main = $('main');
     var body = $('body');  
     var mainPaddingLeftVw = 15;
     
    //navigation//////////
     var nav = $('nav');
     var hamburger = $('#hamburger');
     var menuOpacity = $('#menuOpacity');
     var close = $('#close');
    
    //island//////////
    var partsofIsland = $('.grpelem');
    var grpelemPaddingTopPx = 18;
    var island = $('#island');
    var island_img = island.find('#island_img');
    var imageScale = 0.7;
    var areas = $('area');

    
    //maplight library setup //////////
    
    island_img.maphilight({ 
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
    
    //-------------FUNCTIONS--------------------------------------------------------------------------------------------------
    
    //choosing the proper position for every island part//////////
    var left = 0;
    var top = 0;
    function islandPartDisplayParameters(ele){    
       if (ele === "newbiz"){
           left = 700;
           top = -600;
       }
       else if (ele === "eventy"){
           left = -1000;
           top = -500;
       } 
       else if (ele === "kreacja"){
           left = -1800;
           top = 100;
       }
       else if (ele === "www"){
           left = -350;
           top = 250;
       }
       else if (ele === "sm"){
           left = 170;
           top = 100;
       }
    }
    
    // finding related part of the island//////////
      var relatedPartOfIsland; 
      function findRelatedPartOfTheIsland(identifier){  
           partsofIsland.each(function(index, ele){
             if ($(this).attr('id') === identifier) {
                relatedPartOfIsland = $(this);    
             }     
       });               
    }
    
    // recalculating map coordinates //////////
    
        function imageMapCalculate(map) {
        var coordsAll = [];
        for (var i = 0; i < areas.length; i ++) {
                //console.log(areas[i].coords);  //in jquery you cannot see "coords" property
                var thisMapCoords = areas[i].coords.split(','); 
                coordsAll.push(thisMapCoords);
            };
            
        var previousWidth = 2690; //fixed value
        var x = $('body').width() / previousWidth;
        for (var i = 0; i < coordsAll.length; i++){
               for (var j = 0; j < coordsAll[i].length; j++) {
                   coordsAll[i][j] *= x;    
               }
                areas[i].coords = coordsAll[i].join(',');
            } 
        previousWidth = $('body').clientWidth; //for doing it on every resize?
        return true;  //necesarry?
        }
    
    
    
    //showing  preloader on start//////////
    
        function showPreloader(){
        		setTimeout(function() {
			  body.removeClass('loading');
              main.removeClass('hidden');
                noticeMyArea(areas.eq(3), 0, 400);
                noticeMyArea(areas.eq(4), 100, 500);
                noticeMyArea(areas.eq(0), 200, 600);
                noticeMyArea(areas.eq(1), 300, 700);
                noticeMyArea(areas.eq(2), 400, 800);
                noticeMyArea(areas.eq(3), 500, 900);
		}, 4000);        
    }
    
    //map areas animation on start //////////
        
    
     function noticeMyArea(ele, delay1, delay2){
            setTimeout(function(){ele.data('maphilight', { alwaysOn: true }).trigger('alwaysOn.maphilight')}, delay1);
            setTimeout(function(){ele.data('maphilight', { alwaysOn: false }).trigger('alwaysOn.maphilight')}, delay2);
    }; 
    
    // map areas animation after coming back from subpage//////////
    
    function backToStartAnimation(){           
       // data-source of related part of the island
       var source = main.data('source');
       source = source.split("/");
       source = source[2].split(".");
       source = source[0];

        // finding related part of the island
        findRelatedPartOfTheIsland(source);
        
        
        // START position of the image
        islandPartDisplayParameters(source);
        
        //END position of the image 
        var pixOnVw = window.innerWidth/100;
        newLeft =  mainPaddingLeftVw * pixOnVw; 
        newTop =  grpelemPaddingTopPx + nav.height(); 
        
        
        //END size of the img
        var imgWidth = document.getElementById("island_img").naturalWidth; //1098;  - jak wyjme element jquery nie ma tej property
        var imgHeight = document.getElementById("island_img").naturalHeight; // 1881;
        
        var width = Math.round(window.innerWidth *imageScale); 
        var proportion = width/imgWidth;
        var height = Math.round(imgHeight * proportion); 
        widthPx = width +'px';
        heightPx = height +'px';
        
        
        //START animation--------------

       //hiding the whole island image 
       island.addClass('hidden');    
       //showing the partial image 
       relatedPartOfIsland
           .removeClass('hidden')
           .addClass('exposed');
       //and changing it to the whole island image 
       relatedPartOfIsland
           .find('img')
           .attr('src', 'images/wyspa%20www.png') 
       //giving START position of an image
           .css({
               "position":"fixed",
               "left": left,
                "top": top,
               "height": '1647px',
               "width": '2822px'          
           })
       
       //END animation---------------
       //giving END position and END size of an image
           .animate({
               left: newLeft,
               top: newTop,
               height: heightPx,
               width: widthPx
           },2000, function (){
               relatedPartOfIsland
                          .removeClass('exposed')
                            .addClass('hidden');
               $('#island').removeClass('hidden');
           });    
    }
    
    
       
    //----------------------WWW FLOW--------------------------------------------------------------------------------- 
    
    // ---------preloader--gif//////////
    

    //main.addClass('hidden');//moved to  php session
    
    if (body.hasClass('loading')){  //only php session = 0
            showPreloader()
    }
    
    // ----resizing map image - once during visit//////////
    
   if (main.children().first().hasClass('grpelem')){
            imageMapCalculate(island);     
    }
    
    
    //--------come back to index.php with specific area exposed//////////
    
    
    if (main.attr('data-source') &&  !body.hasClass('loading')) {
        backToStartAnimation()
     }
    
    //----------------------EVENTS---------------------------------------------------------------------------------
    
    // resizing island and map on window resize//////////
    
    $(window).on('resize', function(){
        //island.css({"width": "70vw"}); nope
        //imageMapCalculate(island); nope
    });
    
      
    // ----hamburger menu mouseover//////////
       
    hamburger.on('mouseenter', function(event){
        $(this).children().css('background-color', 'white');
    });
    
    hamburger.on('mouseleave', function(event){
        $(this).children().css('background-color', 'cadetblue');
    });
    
    
     // ----hamburger menu onclick//////////
    
    hamburger.on('click', function(){
       $(this).toggleClass('change'); 
        console.log($(this).parent().css("width"));
        if ($(this).parent().find('.sidenav').css("width") === '0px') {
            $(this).parent().find('.sidenav').css("width", "250px");
            menuOpacity.css("background-color", "rgba(0,0,0,0.4)").css("z-index", "1");
            
        }
        else if ($(this).parent().find('.sidenav').css("width") === '250px') {
            $(this).parent().find('.sidenav').css("width", "0px");
            menuOpacity.css("background-color", "transparent").css("z-index", "-3");
        }
       
    });
    
    // ----opacity in menu onclick//////////
    
    menuOpacity.on('click', function(){
        $(this).css("background-color", "transparent").css("z-index", "-3");
        hamburger.toggleClass('change').parent().find('.sidenav').css("width", "0px");
    })
    
    
    //----x close on subpagess mouseover//////////
     
    
    close.on('mouseenter', function(event){
        $(this).children().css('background-color', 'white');
    });
    
    close.on('mouseleave', function(event){
        $(this).children().css('background-color', 'cadetblue');
    });
    
     
    
 //---map areas clicks actions on main page: exposing specific area//////////
    
   areas.on('click', function(event){
       
        //titles of related part of the island
       var title = $(this).attr('title');
        // finding related part of the island      
       findRelatedPartOfTheIsland(title);
       
       
       //END  links to subpages
       var linkString = $(this).attr('href');   
       // END position of the image 
       islandPartDisplayParameters(title); 
       

       
       //START animation--------------
  
       //hiding the whole island image 
       island.addClass('hidden');       
       //showing the partial image 
       relatedPartOfIsland
           .removeClass('hidden')
           .addClass('exposed');
       //and changing it to the whole island image 
       relatedPartOfIsland
           .find('img')
           .attr('src', 'images/wyspa%20www.png')
    
       //END animation--------------
       //setting the proper position
       //relatedPartOfIsland
           .css({
               "position":"fixed"
           })
           .delay(200)
       //extending the image to the proportion of the background at the subpage
           .animate({
               left: left.toString(),
               top: top.toString(),
               height: '1647px',
               width: '2822px'
           },2000);
       //redirect
            timeout();
       //prevent default reload
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

