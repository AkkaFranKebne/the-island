$(document).ready(function () {



    /* 
to do:
        > hinty na mapie dla ekranow dotykowych - dodac klik, potestowac na realnych tabletach lokalizacje   s
        > preloader dla obrazkow nie w pierwszej sesji - wywala sie na obrazkach w cache
        > obrazek wyspy: pogadac z grafikiem, czy starczy jpg, bo png strasznie muli 
        na gotowej stronie -  dodanie wordpressa do galerii (jak ogarnac wiele rozmiarow obrazkow? czy wordpress sam to ogarnie?)
        
        
        
        
do poprawnienia z "can  I use": 
> dodac wszedzie backup color dla bcgr opacity;
> grid layout : chrome 49 i nizej, ios safari 10.2 i nizej, opera mini, android browser 4.4 i nizej
> transform  ie <9 - The scale transform can be emulated in IE < 9 using Microsoft's "zoom" extension, others are (not easily) possible using the MS Matrix filter  + nie dziala na opera mini
> transition opera mini
> animation w opera mini
> border radius opera mini
> box shadow opera mini


>testowanie - znalezione bledy:
> obszary wyspy przesuniete lekko w lewo na ie i ff, czasem nawet chrome  na win - od czego zalezy?;
> form nie on focus tylko na zmiane, dlaczego nie dziala?
> dalej na prod czasem sciska sie animacja i nie wlacza animacja poczatkowa; 
  
  
inne do poprawienia przed oddaniem:
        > linki - zmienic tak, by nie trzeba bylo zmieniac - przy wysylaniu na prod;
        > css i js zmienne
        >  opozniona animacja poczatkowa - czemu nie dzialaja zmienne?
        > powtorzony kod w js zamienic na zmienne
        > kod mapy przerzucic do app.js
        > sprawdzic czy sesja dziala poprawnie
        > ladny css i js https://www.w3schools.com/jquery/jquery_events.asp  polaczenie eventow w 1
        > linki do mini css i zoptymalizowanych obrazkow zmienic - czemu imagemin nie dziala?
        > creative cloud obczaic
        > gulp svg konwersja obczaic
        
        
        thumbnail: 350x220
        nondesktop_thumbnail: 800x440
        
    */

    //----------------------VARIABLES-----------------------------------------------------------------------

    //basic//////////
    var main = $('main');
    var body = $('body');
    var mainPaddingLeftVw = 15;
    var images = $('img');

    //navigation//////////
    var nav = $('nav');
    var hamburger = $('#hamburger');
    var menuOpacity = $('#menuOpacity');
    var close = $('#close');

    //island//////////
    var island = $('#island'); //island used with map
    var island_img = island.find('#island_img');
    var wholeisland = $('#wholeisland'); //resizable island
    var wholeisland_img = wholeisland.find('#wholeisland_img');
    var grpelemPaddingTopPx = 18;
    var imageScale = 0.7;
    var areas = $('area');
    var pins = $('.pin');
    var pulses = $('.pulse');

    //galleries element
    var galleryImages = $('.gallery').find('img');
    var modal = $('#modal');
    var modalCloseButton = $('span.close');
    var arrows = $('.arrow');



    //map image
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

    //an initial width for the map to rescale
    var initWidth = 2690; //fixed value based on pic width. why it is bigger than pic width (1,43)? to check

    //position for every island part//////////
    var left = 0;
    var top = 0;
    var newbizLeft = 700;
    var newbizTop = -600;
    var eventyLeft = -1000;
    var eventyTop = -500;
    var kreacjaLeft = -1800;
    var kreacjaTop = 100;
    var wwwLeft = -350;
    var wwwTop = 250;
    var smLeft = 170;
    var smTop = 100;

    //animations
    //time in preloader
    var preloaderMilisec = 4000;


    //onclick animation time
    var onclickAnimationMilisec = 2000;
    var onclickAnimationDelay = 200;
    var reloadPageDelay = 2300; //sum of previous two plus little extra

    //backToStartAnimation time
    var backToStartAnimationMilisec = 2000;

    //size of extended island part - 150% of original 
    var heightOfExtendedIsland = '1647px';
    var widthOfExtendedIsland = '2822px';

    //contact form
    var form = $('form');
    var submitButton = form.find('input[type="submit"]');
    var emailField = form.find('#email');
    var telephoneField = form.find('#tel');
    var errorOne = $('.error-one');
    var errorTwo = $('.error-two');
    var successAlert = $('.alert-success');
    var emailValue = emailField.val();

    
    //media queries
    var mobile = window.matchMedia("screen and  (max-width: 450px)");
    var nondesktop = window.matchMedia("screen  and (max-width: 800px) and (min-width: 451px)");
    var desktop = window.matchMedia("screen and (min-width: 801px) and (max-width: 960px)");
    var bigdesktop = window.matchMedia("screen and (min-width: 1401px)");
    var touch = window.matchMedia("screen and (pointer: coarse)");


    //-------------FUNCTIONS--------------------------------------------------------------------------------------------------

    //choosing the proper position for every island part//////////

    function islandPartDisplayParameters(ele) {
        if (ele === "newbiz") {
            left = newbizLeft;
            top = newbizTop;
        } else if (ele === "eventy") {
            left = eventyLeft;
            top = eventyTop;
        } else if (ele === "kreacja") {
            left = kreacjaLeft;
            top = kreacjaTop;
        } else if (ele === "www") {
            left = wwwLeft;
            top = wwwTop;
        } else if (ele === "sm") {
            left = smLeft;
            top = smTop;
        }
    }

    // recalculating map coordinates //////////

    function imageMapCalculate(map) {
        var coordsAll = [];
        for (var i = 0; i < areas.length; i++) {
            //console.log(areas[i].coords);  //in jquery you cannot see "coords" property
            var thisMapCoords = areas[i].coords.split(',');
            coordsAll.push(thisMapCoords);
        };

        var previousWidth = initWidth;
        var x = $('body').width() / previousWidth;
        for (var i = 0; i < coordsAll.length; i++) {
            for (var j = 0; j < coordsAll[i].length; j++) {
                coordsAll[i][j] *= x;
            }
            areas[i].coords = coordsAll[i].join(',');
        }
        previousWidth = $('body').clientWidth; //for doing it on every resize?
        return true; //necesarry?
    }



    //showing  preloader on start//////////  
      //not works when pic is in cache - fix, eg read about lazy loading and blur loading 
       function showPreloader() {
           body.addClass('loading');  
            island_img.on("load", function() { 
                console.log("pic loaded");
                body.removeClass('loading');
                main.removeClass('hidden');
                island.removeClass('hidden'); 
            });
    } 
    
    
     //showing  preloader and animation on start//////////  
      
       function showPreloaderAndAnimation() {
            island_img.on("load", function() { 
                console.log("pic loaded for the first time");
                body.removeClass('loading');
                main.removeClass('hidden');
                island.removeClass('hidden'); 
                //showing pins for touchscreens
                isTouch();
                //showing animation
                noticeMyArea(areas.eq(3), 0, 400);
                noticeMyArea(areas.eq(4), 100, 500);
                noticeMyArea(areas.eq(0), 200, 600);
                noticeMyArea(areas.eq(1), 300, 700);
                noticeMyArea(areas.eq(2), 400, 800);
                noticeMyArea(areas.eq(3), 500, 900); 
            });
    }

    

    //map areas animation on start //////////


    function noticeMyArea(ele, delay1, delay2) {
        setTimeout(function () {
            ele.data('maphilight', {
                alwaysOn: true
            }).trigger('alwaysOn.maphilight')
        }, delay1);
        setTimeout(function () {
            ele.data('maphilight', {
                alwaysOn: false
            }).trigger('alwaysOn.maphilight')
        }, delay2);
    };

    // map areas animation after coming back from subpage//////////

    // OBS!: there is a need to use extra layer, as image with map is not resizeable. 

    function backToStartAnimation() {
        var source = main.data('source');
        source = source.split("/");
        source = source[2].split(".");
        //source = source[1].split("."); for production, where there url is different
        source = source[0];


        // START position of the image
        islandPartDisplayParameters(source);

        //END position of the image 
        var pixOnVw = window.innerWidth / 100;
        newLeft = mainPaddingLeftVw * pixOnVw;
        newTop = grpelemPaddingTopPx + nav.height();


        //END size of the img
        var imgWidth = document.getElementById("island_img").naturalWidth; //1098;  - need to do it with vanilla js to get this property
        var imgHeight = document.getElementById("island_img").naturalHeight; // 1881;

        var width = Math.round(window.innerWidth * imageScale);
        var proportion = width / imgWidth;
        var height = Math.round(imgHeight * proportion);
        widthPx = width + 'px';
        heightPx = height + 'px';


        //START animation--------------
        fixedImgSize();

        //hiding the map island image , just in case it is not hidden after the previous action 
        island.addClass('hidden');
        //showing the resizable island image 
        wholeisland
            .removeClass('hidden')
            .addClass('exposed');
        //giving START position of an image
        wholeisland //added
            .find('img') //not sure if necesarry
            .css({
                "position": "fixed",
                "left": left,
                "top": top,
                "height": heightOfExtendedIsland,
                "width": widthOfExtendedIsland
            })

            //END animation---------------
            //giving END position and END size of an image
            .animate({
                    left: newLeft,
                    top: newTop,
                    height: heightPx,
                    width: widthPx
                }, {
                    duration: backToStartAnimationMilisec,
                    always: function () { //both fail & success;
                        wholeisland //added
                            .removeClass('exposed')
                            .addClass('hidden');
                        island.removeClass('hidden');
                        //showing pins for touchscreens
                        isTouch();
                    }
                }

            );
    }



    // fixed size of images for the pageview //////////
    //(not resizable during window resize - that is how maphihlight work for mapped image, and they need to be the same size as mapped imape, to make the animation run smoothly)

    function fixedImgSize() {
        //console.log("island.width():   " + island.width());
        //console.log("island.height():  " + island.height());
        var fixedWidth = Math.round(island.width()) + "px";
        var fixedHeight = Math.round(island.height()) + "px";
        var fixedWidthImg = Math.round(island_img.width()) + "px";
        var fixedHeightImg = Math.round(island_img.height()) + "px";
        wholeisland.css({
            "width": fixedWidth
        });
        wholeisland.css({
            "height": fixedHeight
        });
        wholeisland_img.css({
            "width": fixedWidthImg
        });
        wholeisland_img.css({
            "height": fixedHeightImg
        });
    }
    

    // introducing media queries for images 
    
    function mediaMatches(dataSource,dataSourcePrevious,dataSourceNext){
        if (mobile.matches ) {
           if (typeof dataSource != "undefined") {
            dataSource= dataSource.replace('.jpg','_mobile.jpg');
           }
            
           if (typeof dataSourcePrevious != "undefined") {
               dataSourcePrevious= dataSourcePrevious.replace('.jpg','_mobile.jpg');
           }
            
           if (typeof dataSourceNext != "undefined") {
               dataSourceNext= dataSourceNext.replace('.jpg','_mobile.jpg');
           } 
            
		} 
        else if (nondesktop.matches) {
           if (typeof dataSource != "undefined") {
            dataSource= dataSource.replace('.jpg','_nondesktop.jpg');
           }
            
           if (typeof dataSourcePrevious != "undefined") {
            dataSourcePrevious= dataSourcePrevious.replace('.jpg','_nondesktop.jpg');
           }
            
            if (typeof dataSourceNext != "undefined") {           
            dataSourceNext= dataSourceNext.replace('.jpg','_nondesktop.jpg');
            }
        }
        
        else if (desktop.matches) {
          if (typeof dataSource != "undefined") {
            dataSource= dataSource.replace('.jpg','_desktop.jpg');
          }
            
           if (typeof dataSourcePrevious != "undefined") {
            dataSourcePrevious= dataSourcePrevious.replace('.jpg','_desktop.jpg');
           }
            
            if (typeof dataSourceNext != "undefined") {           
            dataSourceNext= dataSourceNext.replace('.jpg','_desktop.jpg');
            }
        }
        //check if it works properly
        //console.log(dataSource);
        //console.log(dataSourcePrevious);
        //console.log(dataSourceNext);
            
    }
    
    // introducing media queries for pins => touchscreens
    
    function isTouch(){
        if (touch.matches && !island.hasClass('hidden')) {
           pins.removeClass("hidden");
           pulses.removeClass("hidden");
        }
    }
     
    
    //moving to the next image in galleries---------------------------------

    function showNextImg() {
        //finding current image
        var imageSource ="#";
        var modalContentElements = modal.find('.modal-content');
        modalContentElements.each(function(){
          if ($(this).is(":visible")) {
              imageSource = $(this).attr('src');
          } 
        });

        //preparing variables for 3 images: current, previous and next
        var dataSource = '#';
        var dataSourcePrevious = '#';
        var dataSourceNext = '#';
        var caption = '';

        //finding these three images
        galleryImages.each(function (index) {
            if ($(this).data('source') === imageSource) {

                dataSourcePrevious = $(this).data('source');
                dataSource = galleryImages.eq(index + 1).data('source');
                dataSourceNext = galleryImages.eq(index + 2).data('source');
                caption = galleryImages.eq(index + 1).attr('alt');

                //console.log(galleryImages.eq(index + 1).data('order'));

                //showing / hiding arrows, based on data-order in html
                if (galleryImages.eq(index + 1).data('order') < 9) {
                    modal.find('.right').fadeIn();
                } else {
                    modal.find('.right').fadeOut();
                }


                if (galleryImages.eq(index + 1).data('order') > 1) {
                    modal.find('.left').fadeIn();
                } else {
                    modal.find('.left').fadeOut();
                }

                if (typeof galleryImages.eq(index + 1).data('order') === "undefined") {
                    closeTheModal();
                }
    
            }
                                                
        });
        
        // resize difrent images sizes for different screens        
        mediaMatches(dataSource,dataSourcePrevious,dataSourceNext);

        // loading three images
        
    galleryImages.each(function (index) {
    if (galleryImages.eq(index + 1).data('source') === dataSource) {
        if (galleryImages.eq(index + 1).hasClass('video')) {
            console.log("to video");
            modal.find('iframe.modal-content').removeClass('hidden').attr('src', dataSource).fadeIn(150);
            modal.find('img.modal-content').fadeOut(150);
        }
        else {
            console.log("to img");
            modal.find('img.modal-content').attr('src', dataSource).fadeIn(150);
            modal.find('iframe.modal-content').fadeOut(150);
        }
        
        
        if ($(this).hasClass('video')){
            modal.find('iframe.previous-modal-content').attr('src', dataSourcePrevious);
        }
        else {
            modal.find('img.previous-modal-content').attr('src', dataSourcePrevious); 
        }
        
        if (galleryImages.eq(index + 2).hasClass('video')){
            modal.find('iframe.next-modal-content').attr('src', dataSourceNext);
        }
        else {
            modal.find('img.next-modal-content').attr('src', dataSourceNext);
        }
    }
    });
        modal.find('#caption').html(caption);
    }


    //moving to the previous image in galleries------------------------------


    function showPreviousImg() {
                
        //finding current image
        var imageSource ="#";
        var modalContentElements = modal.find('.modal-content');
        modalContentElements.each(function(){
          if ($(this).is(":visible")) {
              imageSource = $(this).attr('src');
          } 
        });

        //preparing variables for 3 images: current, previous and next
        var dataSource = '#';
        var dataSourcePrevious = '#';
        var dataSourceNext = '#';
        var caption = '';

        //finding these three images
        galleryImages.each(function (index) {
            if ($(this).data('source') === imageSource) {
                dataSourceNext = $(this).data('source');
                dataSource = galleryImages.eq(index - 1).data('source');
                dataSourcePrevious = galleryImages.eq(index - 2).data('source');
                caption = galleryImages.eq(index - 1).attr('alt');

                console.log(galleryImages.eq(index - 1).data('order'));

                //showing / hiding arrows, based on data-order in html
                if (galleryImages.eq(index - 1).data('order') < 9) {
                    modal.find('.right').fadeIn();
                } else {
                    modal.find('.right').fadeOut();
                }


                if (galleryImages.eq(index - 1).data('order') > 1) {
                    modal.find('.left').fadeIn();
                } else {
                    modal.find('.left').fadeOut();
                }
                if (typeof galleryImages.eq(index - 1).data('order') === "undefined") {
                    closeTheModal();
                }
            }

        });
        
        // resize difrent images sizes for different screens        
        mediaMatches(dataSource,dataSourcePrevious,dataSourceNext);

        // loading three images
        
    galleryImages.each(function (index) {
    if (galleryImages.eq(index - 1).data('source') === dataSource) {
        if (galleryImages.eq(index - 1).hasClass('video')) {
            console.log("to video");
            modal.find('iframe.modal-content').removeClass('hidden').attr('src', dataSource).fadeIn(150);
            modal.find('img.modal-content').fadeOut(150);
        }
        else {
            console.log("to img");
            modal.find('img.modal-content').attr('src', dataSource).fadeIn(150);
            modal.find('iframe.modal-content').fadeOut(150);
        }
        
        
        if (galleryImages.eq(index - 2).hasClass('video')){
            modal.find('iframe.previous-modal-content').attr('src', dataSourcePrevious);
        }
        else {
            modal.find('img.previous-modal-content').attr('src', dataSourcePrevious); 
        }
        
        if ($(this).hasClass('video')){
            modal.find('iframe.next-modal-content').attr('src', dataSourceNext);
        }
        else {
            modal.find('img.next-modal-content').attr('src', dataSourceNext);
        }
    }
    });
        modal.find('#caption').html(caption);
    }

    //-------------closing modal in galleries----

    function closeTheModal() {
        // hiding the modal
        modal.fadeOut("slow", function () {
            //preparing the preloader for the next click
            modal.find('#preloader').show('slow');
            modal.find('.modal-content').fadeOut('slow');

            //preparing arrows
            modal.find('.right').show();
            modal.find('.left').show();
            
            //withrdaw changes from body
            body.removeClass('fitInViewport');
        });


    }

    // ------------validating contact form  telephone-------------



    function validateTelephone() {
        var telephoneValue = telephoneField.val();
        var filter = /^[0-9-+ ]+$/;
        if (filter.test(telephoneValue) && telephoneValue.length > 7) {
            errorOne.text("").hide();
        } else {
            errorOne.text("Podaj poprawny numer").show();


        }
    }

    // ------------validating contact form  email-------------
    function validateEmail() {
        var emailValue = emailField.val();
        if (emailValue.indexOf("@") == -1 || emailValue.indexOf(".") == -1 || emailValue.length < 5) {
            errorTwo.text("Podaj poprawny adres email").show();
        } else {
            errorTwo.text("").hide();
        }
    }

    
    //--------------removing specific page from menu on the specific page ----------//
    function removeFromMenu(){
       var url = window.location.href; 
       url = url.split("?");
       url=url[0];
       url = url.split("/");
       url = url[4];  // on production change for 3
        
      var sideNavLinks = $('.sidenav a');
      sideNavLinks.show();
      sideNavLinks.each(function(){
          if ($(this).attr('href') == url) {
              $(this).hide();
          }
          else if ($(this).attr('href') == "index.php" && url == "") {
              $(this).hide();
          }
      });
    }
    

    //----------------------WWW FLOW--------------------------------------------------------------------------------- 

    

    // ---------preloader--gif//////////

    //for the first  session
    //main.addClass('hidden');//moved to  php session

    if (body.hasClass('loading')) { //only php session = 0
        showPreloaderAndAnimation();
    }
    else if (!main.attr('data-source')){  //--------entering index.php without specific area
        //showPreloader();  //not for the first session 
        island.removeClass('hidden'); 
        isTouch(); //----------------showing pins for touchscreens
    }
    
    //OBS! island needs to be hidden by default not to disturb the  backToStartAnimation();
    

    // ----resizing map image - once during pageview//////////

    if (main.children().first().hasClass('grpelem')) {
        imageMapCalculate(island);
    }

    // ---- fixing the sizes of images of the island - once during pageview ////////

    fixedImgSize();


    //--------come back to index.php with specific area exposed//////////


    if (main.attr('data-source') && !body.hasClass('loading')) {
        backToStartAnimation();
    }
    
    //--------- hiding specific link from side menu ///////
    
       
    removeFromMenu();
    
    //----------setting the size of the thumbnails for galleries /////////
    
    if (nondesktop.matches || bigdesktop.matches) {
            if ($('.row').hasClass('gallery')) {
            var images = $('.row').find('picture img');
            images.each(function(e){
                var source = $(this).attr("src");
                source = source.replace('.jpg','_nondesktop.jpg');
                $(this).attr('src', source);
            });        
     }
    }


    
    

    //----------------------EVENTS---------------------------------------------------------------------------------


    // ----hamburger menu mouseover//////////

    hamburger.on('mouseenter', function (event) {
        $(this).children().css('background-color', 'white');
    });

    hamburger.on('mouseleave', function (event) {
        $(this).children().css('background-color', 'cadetblue');
    });


    // ----hamburger menu onclick//////////

    hamburger.on('click', function () {
        $(this).toggleClass('change');
        console.log($(this).parent().css("width"));
        if ($(this).parent().find('.sidenav').css("width") === '0px') {
            $(this).parent().find('.sidenav').addClass('expanded');
            menuOpacity.css("background-color", "rgba(0,0,0,0.4)").css("z-index", "1");
            body.css("overflow", "hidden");

        } else if ($(this).parent().find('.sidenav').hasClass('expanded')) {
            $(this).parent().find('.sidenav').removeClass('expanded');
            menuOpacity.css("background-color", "transparent").css("z-index", "-3");
            body.css("overflow", "auto");
        }

    });

    // ----opacity in menu onclick//////////

    menuOpacity.on('click', function () {
        $(this).css("background-color", "transparent").css("z-index", "-3");
        hamburger.toggleClass('change').parent().find('.sidenav').removeClass('expanded');
    })


    //----x close on subpagess mouseover//////////


    close.on('mouseenter', function (event) {
        $(this).children().css('background-color', 'white');
    });

    close.on('mouseleave', function (event) {
        $(this).children().css('background-color', 'cadetblue');
    });



    //---map areas clicks actions on main page: exposing specific area//////////
    // if  i add ".add(pins).add(pulses)" in click in pin or pulse i do not have proper this. maybe area should be totally transparent and pins should be visible from underneath? will it help faster downloading as well?
    
    areas.on('click', function (event) {
        //hiding pins if they are visible
           pins.addClass("hidden");
           pulses.addClass("hidden");

        //titles of related part of the island
        var title = $(this).attr('title');

        //END  links to subpages
        var linkString = $(this).attr('href');
        // END position of the image 
        islandPartDisplayParameters(title);

        //start position of the image
        var offsetTop = island.offset().top + grpelemPaddingTopPx;
        var offsetLeft = island.offset().left;


        //START animation--------------
        fixedImgSize();

        //hiding the whole  map island image , just in case it is not hidden after the previous action
        island.addClass('hidden');
        //showing the resizable island image 
        wholeisland
            .removeClass('hidden')
            .addClass('exposed');
        wholeisland
            .find('img') //not sure if necesarry
            .css({ //------------------------------fix for Safari
                "position": "fixed",
                "left": offsetLeft,
                "top": offsetTop
            })

            //END animation--------------
            //setting the proper position
            //relatedPartOfIsland
            .css({
                "position": "fixed"
            })
            .delay(onclickAnimationDelay)
            //extending the image to the proportion of the background at the subpage
            .animate({
                left: left.toString(),
                top: top.toString(),
                height: heightOfExtendedIsland,
                width: widthOfExtendedIsland
            }, onclickAnimationMilisec);
        //redirect
        timeout();
        //prevent default reload
        return false;


        function timeout() { //setting the delayed reload
            setTimeout(reloadPage, reloadPageDelay);
        }

        function reloadPage() { //setting links
            location.href = linkString;
        }

    });
    
    //----------------moving between pages with animation --------------------------------------//
    
    $('nav a').on('click', function(event){
        event.preventDefault();
        $('main').fadeOut("fast"); 
        var link = $(this).attr("href");
        setTimeout(function(){
            window.location = link;
      },200);
 
    });
    
    
    

    //-------------opening modal in galleries----//use here preloading as well, when you fix it


    galleryImages.on('click', function () {
        //prepare variables for loading 3 images: current, previous and next 
        var dataSource = $(this).data('source');
        var dataSourcePrevious = '';
        var dataSourceNext = '';
        console.log(dataSourcePrevious);

        //finding these 3 images
        galleryImages.each(function (index) {
            if ($(this).data('source') === dataSource) {
                dataSourcePrevious = galleryImages.eq(index - 1).data('source');
                dataSourceNext = galleryImages.eq(index + 1).data('source');
            }
        });
        
        // resize difrent images sizes for different screens        
        mediaMatches(dataSource,dataSourcePrevious,dataSourceNext);

        //loading 3 images  
    galleryImages.each(function (index) {
    if ($(this).data('source') === dataSource) {
        if ($(this).hasClass('video')) {
            console.log("to video");
            modal.find('iframe.modal-content').attr('src', dataSource).show();
            modal.find('img.modal-content').hide();
        }
        else {
            console.log("to img");
            modal.find('img.modal-content').attr('src', dataSource).show();
            modal.find('iframe.modal-content').hide();
        }
        
        
        if (galleryImages.eq(index - 1).hasClass('video')){
            modal.find('iframe.previous-modal-content').attr('src', dataSourcePrevious);
        }
        else {
            modal.find('img.previous-modal-content').attr('src', dataSourcePrevious); 
        }
        
        if (galleryImages.eq(index + 1).hasClass('video')){
            modal.find('iframe.next-modal-content').attr('src', dataSourceNext);
        }
        else {
            modal.find('img.next-modal-content').attr('src', dataSourceNext);
        }
    }
    });
        //loading the description of the current img
        modal.find('#caption').html($(this).attr('alt'));


        //showing / hiding arrows, based on data-order in html
        if ($(this).data('order') == 9) {
            modal.find('.right').hide();
        }
        if ($(this).data('order') == 1) {
            modal.find('.left').hide();
        }

        //showing the modal
        modal.fadeIn();
        
        //limiting the body height
        body.addClass('fitInViewport');

        //hiding the preloader 
    
       if ($(this).hasClass('video')) {
        modal.find('iframe.modal-content').on("load", function() { 
            modal.find('#preloader').hide();
            modal.find('iframe.modal-content').removeClass('hidden').fadeIn(150);
            modal.find('.arrow').removeClass('hidden');
            modal.find('.arrow-background').removeClass('hidden');
            modal.find('#caption').removeClass('hidden');
          });
       }
        else {
        modal.find('img.modal-content').on("load", function() { 
            modal.find('#preloader').hide();
            modal.find('img.modal-content').removeClass('hidden').fadeIn(150);
            modal.find('.arrow').removeClass('hidden');
            modal.find('.arrow-background').removeClass('hidden');
            modal.find('#caption').removeClass('hidden');
          });            
        }


    });

    //--------------------closing gallery using X  -------------------

    modalCloseButton.on('click', function () {
        closeTheModal();
    });

    //------------------closing gallery using scroll -  touchSwipe library -------------------
    
    $(function() {      
      $(modal).swipe( {
        swipeDown:function() {
          closeTheModal();
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         //threshold:0
      });
           
      $(modal).swipe( {  
        swipeUp:function() {
          closeTheModal();
        },
         //threshold:0
      });
    });
    

    //-------------navigating gallery using arrows-----------------------


    $('.right').on('click', function (e) {
        showNextImg();
    });

    $('.left').on('click', function (e) {
        showPreviousImg();
    });


    //-------------navigating gallery using keyboard---------------


    $('body').on('keydown', function (e) {
        if ((e.keyCode == 37)) { // left button
            showPreviousImg();
        } else if ((e.keyCode == 39)) { // right button
            showNextImg();
        } else if ((e.keyCode == 27)) { //esc button
            closeTheModal();
        }

    });


    //-------------navigating gallery using swipe -  touchSwipe library---------------

    
     $(function() {  //sprawdzic co to za typ zapisu    

      $(modal).swipe( {
        swipeLeft:function() {
          showNextImg();
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         //threshold:0
      });
        $(modal).swipe( {
        swipeRight:function() {
          showPreviousImg();
        },
         //threshold:0
      });       
         
    });




    // --------------validating fields in contact form  during filing the form-----


    telephoneField.on("change", function () {
        validateTelephone();
    });

    emailField.on("change", function () {
        validateEmail();
    });


    //---------validating the contact form on  submiting ------

    submitButton.on('click', function (event) {
        var telephoneValue = telephoneField.val();
        var emailValue = emailField.val();
        validateEmail();
        validateTelephone();
        if (errorOne.text() !== '' || errorTwo.text() !== '') {
            event.preventDefault();
            console.log("error");
        }

    });
    
    //-----------------reloading the page on orientation change in mobile ---///
    
    $(window).on("orientationchange",function(){
        location.reload();
  }); 

    //-------------------end----------------------------   
});
