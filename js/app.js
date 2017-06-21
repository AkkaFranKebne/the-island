$(document).ready(function(){ 
    //$(window).on('load', function() // works even worse
    
     /* to do:

        - przegrac na serwer i zobaczyc jak dziala
        - potestowac na windows 
        - wyslac opis klientowi
        - wyslac pytanie do Michala (preload obrazkow)

    */
    
    /* do zrobienia po dogadaniu z klientem:
    - mobile  i dotykowe - na razie zamarkowane - jak ma wygladac?
    - stare przegladarki i nie majace js - jak ma wygladac?
    - na pozniej: wyglad i mechanika podstron

    
    */
    
    /*dylematy na warsztaty:

    - problem po przeniesieniu na serwer. jak polepszyc wydajnosc strony? jak trzymac obrazki na czas sesji aby nie ladowaly sie w czasie kolejnych przeladowan strony? ajax? local storage? 
    - sprawdzanie dla starszych przegladarek - jest taki element w gulp? minifikacja js i css tyz?
    - co zrobic z przegladarkami, ktore nie dzialaja i/lub, ktore nie maja js? jak rozpoznawac przegladarke? user-agent php? a moze rozpoznawac lepiej, ze jest blad? 
    - na wszelki wypadek: jak optymalnie wycentrowac w poziomie div?
    
    
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
    var partsofIsland_imgs = $('main').find('img');
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
    
    // OBS!: there is a need to use extra layer(s), as image with map is not resizeable. For now I used on extra img for each island part - if the client want some extra animation with it. If not, it can be changed for 1 extra image with the whole map (and findrelatedpartoftheisland() function can be removed then)
    
    function backToStartAnimation(){           
       // data-source of related part of the island
       var source = main.data('source');
       source = source.split("/");
       source = source[2].split(".");
       //source = source[1].split("."); na prod
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
        var imgWidth = document.getElementById("island_img").naturalWidth; //1098;  - need to do it with vanilla js to get this property
        var imgHeight = document.getElementById("island_img").naturalHeight; // 1881;
        
        var width = Math.round(window.innerWidth *imageScale); 
        var proportion = width/imgWidth;
        var height = Math.round(imgHeight * proportion); 
        widthPx = width +'px';
        heightPx = height +'px';
        
        
        //START animation--------------

       //hiding the whole island image , just in case it is not hidden after the previous action 
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
    
    // fixed size of images for the pageview //////////
    //(not resizable during window resize - that is how maphihlight work for mapped image, and they need to be the same size as mapped imape, to make the animation run smoothly)
       
    function fixedImgSize(){
        var fixedWidth = Math.round(island.width()) + "px";
        var fixedHeight = Math.round(island.height()) + "px"; 
        var fixedWidthImg = Math.round(island_img.width()) + "px";
        var fixedHeightImg = Math.round(island_img.height()) + "px";

        //partsofIsland.each(function(index, ele){
            partsofIsland.css({"width": fixedWidth});  
            partsofIsland.css({"height": fixedHeight});             partsofIsland_imgs.css({"width": fixedWidthImg});  
            partsofIsland_imgs.css({"height": fixedHeightImg});  
        //});
    }
    
//----------------------WWW FLOW--------------------------------------------------------------------------------- 
   

    
    // ---------preloader--gif//////////
    

    //main.addClass('hidden');//moved to  php session
    
    if (body.hasClass('loading')){  //only php session = 0
            showPreloader()
    }
    
    // ----resizing map image - once during pageview//////////
    
   if (main.children().first().hasClass('grpelem')){
            imageMapCalculate(island);     
    }
    
    // ---- fixing the sizes of images of the island - once during pageview ////////
    
    fixedImgSize();
    
     //--------entering index.php without specific area exposed//////////
     //OBS! island needs to be hidden by default not to disturb the  backToStartAnimation();
    
    if (!main.attr('data-source')) {
        island.removeClass('hidden'); 
     }
    
    
    //--------come back to index.php with specific area exposed//////////
    
    
    if (main.attr('data-source') &&  !body.hasClass('loading')) {
        backToStartAnimation()
     }
    
    
//----------------------EVENTS---------------------------------------------------------------------------------
    
      
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
       
       //start position of the image
       var offsetTop = island.offset().top + grpelemPaddingTopPx;
       var offsetLeft = island.offset().left;
       
       
       //START animation--------------
  
       //hiding the whole island image , just in case it is not hidden after the previous action
       island.addClass('hidden');       
       //showing the partial image 
       relatedPartOfIsland
           .removeClass('hidden')
           .addClass('exposed');
       //and changing it to the whole island image 
       relatedPartOfIsland
           .find('img')
           .attr('src', 'images/wyspa%20www.png')
                  .css({ //------------------------------fix for Safari
               "position":"fixed",
                "left": offsetLeft,
                "top": offsetTop
           })
    
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
 //});
});

