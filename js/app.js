$(document).ready(function () {
    /* 
      

>full screen dla galerii dla mobile https://wiki.mozilla.org/Gecko:FullScreenAPI 

> galeria o nas - dodatkowe elementy i funkcja - czekac na rysunki od klienta

> inny uklad kontaktu - poprawic mobile

> poprawienie mailer na mailgun albo https://swiftmailer.symfony.com/docs/introduction.html?

> scroll story smok

> estetyka mobile - klient

>cache server - przyspieszy ladowanie animacji, co przyspieszy dzialania jquery?


> na ostatecznym ksztalcie strony:
> wydzielenie osobnych stron galerii 
> dodanie wordpressa do galerii (jak ogarnac wiele rozmiarow obrazkow? czy wordpress sam to ogarnie?) - chyba lepszym rozwiązaniem byłoby dodanie prostego formularza wymagającego hasła aby podmienić galerie. 

> iframe na tablecie: nie dziala swipe, nie chowa sie 


--------------------------------------------------------------
        
do poczytania:
        > lazy load 
        > blur load 
        > creative cloud 
        > gulp svg konwersja 
        > awsomefonts
        > cookie js 
        > instalacja photoshop i ciecie
        > scroll story

-------------------------------------------------------------------
        
Galeria:
Mobile: 350x220
Tablet / Notebook: 800x440
Desktop: 350x220
Duzy Desktop i Desktop wysokiej rozdzielczosci 800x440

Modal: 
Mobile: 450x300
Tablet / Notebook: 800x530
Desktop: 1000x660
Duzy Desktop i Desktop wysokiej rozdzielczosci 2000x1320
        
    */
    

    //----------------------VARIABLES-----------------------------------------------------------------------
    
    //media queries
    var mobile = window.matchMedia("screen and  (max-width: 450px)");
    var nondesktop = window.matchMedia("screen  and (max-width: 800px) and (min-width: 451px)");
    var desktop = window.matchMedia("screen and (min-width: 801px) and (max-width: 960px)");
    var bigdesktop = window.matchMedia("screen and (min-width: 1401px)");
    var touch = window.matchMedia("screen and (pointer: coarse)");
    var nohover = window.matchMedia("screen and (hover: none)");
    var portrait = window.matchMedia("(orientation: portrait)");
    

    // images standards for different media queries
    var imgStandardExt = '.jpg';
    var imgMobileExt = '_mobile.jpg';
    var imgNonDesktopExt = '_nondesktop.jpg';
    var imgDesktopExt = '_desktop.jpg';

    //colors
    var primaryColor = 'white';
    var secondaryColor = '#8a171a';
    var expandedNavMEnuOpacityColor = "rgba(169,203,213, 0)";

    //basic site elements
    var main = $('main');
    var body = $('body');
    var images = $('img');
    var mainPaddingLeftVw = 15;
    var mainPaddingLeftPx = window.innerWidth * mainPaddingLeftVw / 100;
    
    //navigation//////////
    var nav = $('nav');
    var navHeight = nav.height();  
    var navLinks = nav.find('.sidenav').find('a');
    var hamburger = $('#hamburger');
    var menuOpacity = $('#menuOpacity');
    var close = $('#close');
    var titleBar = $('.title-bar');
    var descBar = $('.description-bar');

    //island//////////
    var island = $('#island'); //island used with map
    var island_img = island.find('#island_img');  
    var wholeisland = $('#wholeisland'); //resizable island
    var wholeisland_img = wholeisland.find('#wholeisland_img');
    var grpelemPaddingTopPx = 18;
    var imageScale = 0.7;

    //pins
    var areas = $('area');
    var pins = $('.pin');
    var pulses = $('.pulse');
    
    //subtitels size
    var barWiderThanTitlePx = 100; 
    var boxHigherThenTextPx = 0;

    //map image
    //maplight library setup //////////
    island_img.maphilight({
        //fill
        fill: true,
        fillColor: '009DDF',
        fillOpacity: 0.1,
        //stroke
        stroke: true,
        strokeColor: '000000',
        strokeWidth: 3,
		strokeOpacity: 0.5,
        //shadow    
        shadow: true,
        shadowX: 20,
        shadowY: 12,
        shadowRadius: 16,
        shadowColor: '000000',
        shadowOpacity: 0.8,
        shadowPosition: 'outside',
        shadowFrom: false,
        alwaysOn: false
    });

    //an initial width for the map to rescale
    var initWidth = 1881*1.428; //fixed value based on pic width. why it is bigger than pic width? to check  you cannot use  here island_img.prop("naturalWidth")   - does not work when image is not loaded
    
    //position for every island part//////////
    var left = 0;
    var top = 0;
    var newbizLeft = 700;
    var newbizTop = -600;
    var eventyLeft = -1000;
    var eventyTop = -500;
    var kreacjaLeft = -1800;
    var kreacjaTop = 100;    
    var aboutLeft = -2300; //-1800
    var aboutTop = 100;
    var wwwLeft = -350;
    var wwwTop = 250;
    var smLeft = 170;
    var smTop = 100;

    //size of extended island part: 150% of original 
    var heightOfExtendedIsland = '1647px';
    var widthOfExtendedIsland = '2822px';

    //animations
    //time in preloaderAndAnimation
    var animationFirstSessionTimeStart = 100;
    var animationFirstSessionTimeEnd = 400;
    var Start1 = 0;
    var Start2 = animationFirstSessionTimeStart;
    var Start3 = 2 * animationFirstSessionTimeStart;
    var Start4 = 3 * animationFirstSessionTimeStart;
    var Start5 = 4 * animationFirstSessionTimeStart;
    var Start6 = 5 * animationFirstSessionTimeStart;
    var End1 = animationFirstSessionTimeEnd;
    var End2 = Start2 + animationFirstSessionTimeEnd;
    var End3 = Start3 + animationFirstSessionTimeEnd;
    var End4 = Start4 + animationFirstSessionTimeEnd;
    var End5 = Start5 + animationFirstSessionTimeEnd;
    var End6 = Start6 + animationFirstSessionTimeEnd;


    //onclick animation time
    var onclickAnimationMilisec = 2000;
    var onclickAnimationDelay = 200;
    var reloadPageDelay = onclickAnimationMilisec + onclickAnimationDelay + 100; //sum of previous two plus little extra

    //backToStartAnimation time
    var backToStartAnimationMilisec = 2000;

    //modal animation
    var modalFadeInOutTimeMilisec = 150;

    //galleries element
    var galleryBox  = $('.gallery');
    var galleryImages = $('.gallery').find('img');
    var modal = $('#modal');
    var modalCloseButton = $('span.close');
    var arrows = $('.arrow');

    
    
    //variables for modal images
    var imageSource = "#";
    //preparing variables for 3 images: current, previous and next
    var dataSource = '#';
    var dataSourcePrevious = '#';
    var dataSourceNext = '#';
    var caption = '';
    var barToModalProportion = 1.1;
    var imgNaturalHeight = 660;
    var imgNaturalWidth = 1000;
    var modalImageRatio = imgNaturalWidth/imgNaturalHeight;

    //contact form
    var form = $('form');
    var submitButton = form.find('input[type="submit"]');
    var emailField = form.find('#email');
    var telephoneField = form.find('#tel');
    var errorOne = $('.error-one');
    var errorTwo = $('.error-two');
    var emailValue = emailField.val();


    //-------------FUNCTIONS--------------------------------------------------------------------------------------------------
    
    
    //---------------moving html objects in DOM
    function moveElement(elementToMove, elementAfterMovedElement){
        var element = elementToMove;
        var nextElement =  elementAfterMovedElement;
        element.detach();
        element.insertAfter(nextElement);        
    }
    
    
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
        } else if (ele === "about") {
            left = aboutLeft;
            top = aboutTop;
        } else if (ele === "www") {
            left = wwwLeft;
            top = wwwTop;
        } else if (ele === "sm") {
            left = smLeft;
            top = smTop;
        }
    }

    // recalculating map coordinates ////////////////////////////
    //previousWidth is the width which the image had at the time you've originally created the coordinates for area elements

    function imageMapCalculate(map) {
        var coordsAll = [];
        for (var i = 0; i < areas.length; i++) {
            //console.log(areas[i].coords);  //in jquery you cannot see "coords" property
            var thisMapCoords = areas[i].coords.split(',');  //array with coords for 1 area
            coordsAll.push(thisMapCoords); //array with arrays for all areas
        };
        
        var previousWidth = initWidth;
        var x = body[0].clientWidth / previousWidth;  
        for (var i = 0; i < coordsAll.length; i++) {  //array level
            for (var j = 0; j < coordsAll[i].length; j++) {  //integer level
                coordsAll[i][j] *= x;  //times size parameter
            }
            areas[i].coords = coordsAll[i].join(','); //string from array
        }
        previousWidth = body[0].clientWidth; //cleaning the variable just in case  
        return true; //necesarry?
    }
    
    // position of pins////////////////////////////////////////
    function setPinsCoords(){
    var param = body[0].clientWidth / initWidth;  //size param
    areas.each(function(){
        var coords = $(this).attr('coords').split(",");  //array of x and y coords
        var coordsX = [];
        var coordsY = [];
        var sumX = 0;
        var sumY = 0;
        for (i = 0; i < coords.length; i++){
            if (i%2 == true) {
                coordsY.push(coords[i]); //array of y coords
                sumY = sumY + parseInt(coords[i]);
            }
            else {
                coordsX.push(coords[i]);  //array of x coords
                sumX = sumX + parseInt(coords[i]);
            }
        };
        var x = sumX/(coords.length/2);   //x for pin
        var y = sumY/(coords.length/2);   //y for pin
        x = x * param;  //adjusting to the new img size
        y = y * param;
        x = x + mainPaddingLeftPx   ; //icluding padding 
        y = y + grpelemPaddingTopPx;
        //fix for unusuall shape of newbiz
        if ($(this).attr('alt') == 'newbiz'){
            y = y + 120;
        }
         //fix for unusuall shape of about
        if ($(this).attr('alt') == 'about'){
            y = y +50;
        }
        var yPluse = y + 10;  // y for pulse under pin
        x= x+'px';
        y= y+'px';
        yPluse= yPluse +'px';  //string with px
        
        //pairing area with pin
        var area = $(this).attr('alt');
        //locating pin
        pins.each(function(){
            if ($(this).attr('title') === area) {
                $(this).css('left', x);
                $(this).css('top', y);
            }
        });
        //locating pulse
        pulses.each(function(){
            if ($(this).attr('title') === area) {
                $(this).css('left', x);
                $(this).css('top', yPluse);
            }
        });
        
    });       
    }
    
    //hiding main page elements for the preload/////////////////////////
    
    function hidePage(){
        //hiding menu for mobile (As it is exended)
        if (mobile.matches || nondesktop.matches) {
            navLinks.addClass('hidden');
        }
        //hiding the body
        body.addClass('loading');
        //hiding the island
        island.addClass('hidden');
        island_img.addClass('hidden');        
    }
    
    //showing main page elements after preload///////////////////
    
    function showPage(){
            //showing the body and its elements
            body.removeClass('loading');
            main.removeClass('hidden');
            island.removeClass('hidden');
            island_img.removeClass('hidden');
            //showing the menu elements
            navLinks.removeClass('hidden');
            //showing pins for touchscreens, with delay if there is back to start animation
            if (main.attr('data-source')) {
            setTimeout(function () {
                isTouch();
            },2500);                
            }
            else {
                isTouch();
            }       
    }
    
    //showing  preloader without animation on start//////////////////////////////// 
   
    function showPreloader() {
        //hiding menu for mobile (As it is exended)
        hidePage();
        //waiting for the island to be downloaded
        island_img.on("load", function () {
            showPage();
        });
        //if picture is in cache:
        var pictureInCache = document.getElementById('island_img').complete;
        if (pictureInCache == true) {
            showPage();
        }
    }

    //showing  preloader and animation on start (when body is hidden) ///////////////  

    function showPreloaderAndAnimation() {
        hidePage();
        island_img.on("load", function () {
            showPage();
            //showing animation
            noticeMyArea(areas.eq(3), Start1, End1);
            noticeMyArea(areas.eq(4), Start2, End2);
            noticeMyArea(areas.eq(0), Start3, End3);
            noticeMyArea(areas.eq(1), Start4, End4);
            noticeMyArea(areas.eq(2), Start5, End5);
            noticeMyArea(areas.eq(3), Start6, End6);
        });
        var pictureInCache = document.getElementById('island_img').complete;
        if (pictureInCache == true) {
            showPage();
            //showing animation
            noticeMyArea(areas.eq(3), Start1, End1);
            noticeMyArea(areas.eq(4), Start2, End2);
            noticeMyArea(areas.eq(0), Start3, End3);
            noticeMyArea(areas.eq(1), Start4, End4);
            noticeMyArea(areas.eq(2), Start5, End5);
            noticeMyArea(areas.eq(3), Start6, End6);

        }        
    }

    //map areas animation on start //////////////////////////

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

    // map areas animation after coming back from subpage///
    // OBS!: there is a need to use extra layer, as image with map is not resizeable. 

    function backToStartAnimation() {
        //getting the proper island part from GET
        var source = main.data('source');
        source = source.replace('/the-island', ''); //for localhost only
        source = source.split("/");
        source = source[1].split(".");
        source = source[0];  //the name of the part of the island

        // START position of the image
        islandPartDisplayParameters(source);

        //END position of the image 
        var pixOnVw = window.innerWidth / 100;  //how many pixels are in vw
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
        //recalculating the size of map image areas in case it's not done
        fixedImgSize();

        //hiding the map island image , just in case it is not hidden after the previous action 
        island.addClass('hidden');
        
        //showing the resizable island image 
        wholeisland
            .removeClass('hidden')
            .addClass('exposed');
        //giving START position of an image
        wholeisland //added
            .find('img') 
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
                    always: function () { //in this form this happens both fail & success;
                        wholeisland
                            .removeClass('exposed')
                            .addClass('hidden');
                        island.removeClass('hidden');
                        //isTouch(); //pins can be hidden after click 
                    }
                }
            );
    }

    // fixing the size of resizable island img for the pageview to be the same as the map image island //////////
    //(OBS! map image is not resizable during window resize - that is how maphihlight work for mapped image, and they need to be the same size as mapped imape)

    function fixedImgSize() {
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
        
    // introducing media queries for images in galleries  //////////////

    function mediaMatches(dataSource, dataSourcePrevious, dataSourceNext) {
        if (mobile.matches) {
            if (typeof dataSource != "undefined") {
                dataSource = dataSource.replace(imgStandardExt, imgMobileExt);
            }

            if (typeof dataSourcePrevious != "undefined") {
                dataSourcePrevious = dataSourcePrevious.replace(imgStandardExt, imgMobileExt);
            }

            if (typeof dataSourceNext != "undefined") {
                dataSourceNext = dataSourceNext.replace(imgStandardExt, imgMobileExt);
            }

        } else if (nondesktop.matches) {
            if (typeof dataSource != "undefined") {
                dataSource = dataSource.replace(imgStandardExt, imgNonDesktopExt);
            }

            if (typeof dataSourcePrevious != "undefined") {
                dataSourcePrevious = dataSourcePrevious.replace(imgStandardExt, imgNonDesktopExt);
            }

            if (typeof dataSourceNext != "undefined") {
                dataSourceNext = dataSourceNext.replace(imgStandardExt, imgNonDesktopExt);
            }
        } else if (desktop.matches) {
            if (typeof dataSource != "undefined") {
                dataSource = dataSource.replace(imgStandardExt, imgDesktopExt);
            }

            if (typeof dataSourcePrevious != "undefined") {
                dataSourcePrevious = dataSourcePrevious.replace(imgStandardExt, imgDesktopExt);
            }

            if (typeof dataSourceNext != "undefined") {
                dataSourceNext = dataSourceNext.replace(imgStandardExt, imgDesktopExt);
            }
        }
    }

    // introducing media queries for pins => touchscreens //////////

    function isTouch() {
        if ((touch.matches && nohover.matches) && !island.hasClass('hidden')) {
            pins.removeClass("hidden");
            pulses.removeClass("hidden");
        }
    }
    

    

    //funding current image  in modal //////////////////////////////// 
    function findCurrentImage(){
        var modalContentElements = modal.find('.modal-content');
        //choosing the visible one (between two: img and iframe)
        modalContentElements.each(function () {
            if ($(this).is(":visible")) {
                imageSource = $(this).attr('src');
            }
        });        
    }
    
    
    // set img as a modal image//////////////////////////////////
    
    function setImg(){
        modal.find('img.modal-content').attr('src', dataSource).removeClass('hidden').fadeIn(modalFadeInOutTimeMilisec);
        //removing the existing iframe
        $('#video').find('iframe').remove();

        if (!mobile.matches && !nondesktop.matches){
            //setting the bar
            modalBarLength($('img.modal-content'));
            //setting the arrows
            modalArrowPosition($('img.modal-content'));
            //setting element height
            modalElementHeight($('img.modal-content'));
            //setting the bars width
            modalBarLength($('img.modal-content')); 
        }

    }
    // set iframe as a modal image//////////////////////////
    
    
     function setIframe(){
         //creating the iframe
         var iframe = $('<iframe>');
         iframe.addClass('modal-content');
         iframe.attr('src',dataSource);
         $('#video').html(iframe);
        modal.find('img.modal-content').fadeOut(modalFadeInOutTimeMilisec).addClass('hidden');
            modalArrowPosition($('iframe.modal-content'));
        if (!mobile.matches && !nondesktop.matches){
            
            //setting element height
            modalElementHeight($('iframe.modal-content'));
            //setting the bars width
            modalBarLength($('iframe.modal-content')); 
            //setting arrows
        }
    }
    
        // set img as a nxt modal image//////////////////////////////////
    
    function setImgNxt(){
         modal.find('img.next-modal-content').attr('src', dataSourceNext);    
    }
     // set img as a previous modal image//////////////////////////////////
    
    function setImgPre(){
         modal.find('img.previous-modal-content').attr('src', dataSourcePrevious);    
    }
    
    
    
    //moving to the next image in galleries////////////////////////
        
    function showNextImg() {
        
        //finding current image
        findCurrentImage(); 

        //finding these three images
        galleryImages.each(function (index) {
            if ($(this).data('source') === imageSource) {
                //the image after next become next image (as we move forward)
                dataSourceNext = galleryImages.eq(index + 2).data('source');
                //next image become the actual image (as we move forward)
                dataSource = galleryImages.eq(index + 1).data('source');
                //this image become the previous one (as we move forward)
                dataSourcePrevious = $(this).data('source');
                //caption is taken from the actual image
                caption = galleryImages.eq(index + 1).attr('alt');

                //showing / hiding arrows, based on data-order in html
                //if the actual image is the last one
                if (galleryImages.eq(index + 1).data('order') < 9) {
                    modal.find('.right').fadeIn();
                } else {
                    modal.find('.right').fadeOut();
                }
                //if the actual image is the first one
                if (galleryImages.eq(index + 1).data('order') > 1) {
                    modal.find('.left').fadeIn();
                } else {
                    modal.find('.left').fadeOut();
                }

                //if the user wants to go beyond the first or last image close the modal
                if (typeof galleryImages.eq(index + 1).data('order') === "undefined") {
                    closeTheModal();
                }
            }
        });

        // resize difrent images sizes for different screens        
        mediaMatches(dataSource, dataSourcePrevious, dataSourceNext);

        // loading three images
        galleryImages.each(function (index) {
            //load the actual image
            if (galleryImages.eq(index + 1).data('source') === dataSource) {
                //as the video
                if (galleryImages.eq(index + 1).hasClass('video')) {
                    setIframe();
                }
                //as an image
                else {
                    setImg();
                }
                //prepare the previous image/video
                if (!$(this).hasClass('video')) {
                    setImgPre();
                } 
                //prepare the next image/video
                if (!galleryImages.eq(index + 2).hasClass('video')) {
                    setImgNxt();
                } 
            }
        });
        //insert caption
        modal.find('#caption').html(caption);
    }


    //moving to the previous image in galleries------------------------------

    function showPreviousImg() {
        
        //finding current image
        findCurrentImage(); 

        //finding these three images
        galleryImages.each(function (index) {
            if ($(this).data('source') === imageSource) {
                //this image become the next one (as we move backward)
                dataSourceNext = $(this).data('source');
                //the  previous image become the actual image (as we move backward)
                dataSource = galleryImages.eq(index - 1).data('source');
                //the image before the previous image become the previous image (as we move backward)
                dataSourcePrevious = galleryImages.eq(index - 2).data('source');
                //caption is taken from the actual image
                caption = galleryImages.eq(index - 1).attr('alt');

                //showing / hiding arrows, based on data-order in html
                //if the actual image is the last one
                if (galleryImages.eq(index - 1).data('order') < 9) {
                    modal.find('.right').fadeIn();
                } else {
                    modal.find('.right').fadeOut();
                }
                //if the actual image is the first one
                if (galleryImages.eq(index - 1).data('order') > 1) {
                    modal.find('.left').fadeIn();
                } else {
                    modal.find('.left').fadeOut();
                }
                //if the user wants to go beyond the first or last image
                if (typeof galleryImages.eq(index - 1).data('order') === "undefined") {
                    closeTheModal();
                }
            }
        });
        // resize difrent images sizes for different screens        
        mediaMatches(dataSource, dataSourcePrevious, dataSourceNext);

        // loading three images
        galleryImages.each(function (index) {
            //load the actual image
            if (galleryImages.eq(index - 1).data('source') === dataSource) {
                //as the video
                if (galleryImages.eq(index - 1).hasClass('video')) {
                    setIframe();
                }
                //as an image
                else {
                    setImg();
                }
                //prepare the previous image/video
                if (!galleryImages.eq(index - 2).hasClass('video')) {
                    setImgPre();
                } 
                //prepare the next image/video
                if (!$(this).hasClass('video')) {
                    setImgNxt();
                } 
            }
        });
        //insert caption
        modal.find('#caption').html(caption);
    }
    
        //----------setting the bigger size of the thumbnails for galleries  for big desktop and tablets/////////

    function setThumbnailsSize() {
        if (nondesktop.matches || bigdesktop.matches) {
            if ($('.row').hasClass('gallery')) {
                var images = $('.row').find('picture img');
                images.each(function (e) {
                    var source = $(this).attr("src");
                    source = source.replace('.jpg', '_nondesktop.jpg');
                    $(this).attr('src', source);
                });
            }
        }
    }

    //-------------closing modal in galleries----///////////////////

    function closeTheModal() {
        // hiding the modal
        modal.fadeOut("slow", function () {
            //preparing the preloader for the next click
            modal.find('#preloader').show('slow');
            modal.find('.modal-content').each(function(){
                $(this).fadeOut('slow');
            });
            modal.find('.bottom-bar').addClass('hidden');
            modal.find('.top-bar').addClass('hidden');

            //preparing arrows
            modal.find('.right').show();
            modal.find('.left').show();

            //withdraw possible changes from body
            body.removeClass('fitInViewport').css("position", "relative"); 
            
            //hamburger z-index back
            hamburger.css("z-index", "5");
        });
    }
    
    // ------------validating contact form  telephone///////////////////////


    function validateTelephone() {
        var telephoneValue = telephoneField.val();
        var filter = /^[0-9-+ ]+$/;  //signs that can be included in the number
        if (filter.test(telephoneValue) && telephoneValue.length > 7) {
            errorOne.text("").hide();
        } else {
            errorOne.text("Podaj numer").show();

        }
    }

    // ------------validating contact form  email/////////////////////////

    function validateEmail() {
        var emailValue = emailField.val();
        if (emailValue.indexOf("@") == -1 || emailValue.indexOf(".") == -1 || emailValue.length < 5) {
            errorTwo.text("Podaj poprawny email").show();
        } else {
            errorTwo.text("").hide();
        }
    }
    
    //scroll to contactform  //////////////////////////////////////////
    
    function scrollToContactForm(){
        var hash = $("#wrap").offset().top;
        $('html, body').animate({ scrollTop: hash });
    }
    
    
    //--------------removing specific item from the side menu on the specific page ----------//
    function removeFromMenu() {
        var url = window.location.href;
        url = url.replace('/the-island', ''); //fix for localhost only
        url = url.split("?");
        url = url[0];
        url = url.split("/");
        url = url[3];

        var sideNavLinks = $('.sidenav a');
        sideNavLinks.show(); //in case that some of them are hidden
        sideNavLinks.each(function () {
            //hide the link to actual page
            if ($(this).attr('href') == url) {
                $(this).hide();
            //hide a link to the main page on main page
            } else if ($(this).attr('href') == "index.php" && url == "") {
                $(this).hide();
            }
        });
    }
    
    
    //-----------------setting the length for title bar - non active for now///////////////////
    
    function titleBarLength(){
        var titleWidth = main.find('.title-bar').find('h2 span').width();
        //console.log(titleWidth);
        var titleBarWidth = titleWidth + barWiderThanTitlePx;
        $('.title-bar').width(titleBarWidth);
    }
    
     //--------------------------the height of subtitle box//////////////////////// 
        function subtitleBoxHeight(){
            var  subtitleBoxHeight = 250; //initial
            var subtitleHeight = descBar.find('h4').height();
            subtitleBoxHeight = subtitleHeight + boxHigherThenTextPx;  //background image is very irregular
            
        if (mobile.matches || nondesktop.matches) {
           subtitleBoxHeight = subtitleHeight;  //as there is no background image in mobile
        }
        descBar.height(subtitleBoxHeight);
    }
    
    //--------------------------the length of modal image bar////////////////////
    
    function  modalBarLength(currentImage){
            var width = currentImage.width() * barToModalProportion;
            $('.top-bar').css('width', width);
            $('.bottom-bar').css('width', width);
    }

     //---------------------modal arrows position in the middle ----
    
    function  modalArrowPosition(currentImage){
             var arrowFromTop = currentImage.height() / 2; 
            $('.arrow').css('top', arrowFromTop);
    }
    
    //--------------setting iframe or image height in modal 
    
     function modalElementHeight(el) {
                var bottomBarHeight = $('.bottom-bar').outerHeight();
                var topBarHeight = $('.top-bar').outerHeight();
                var elementHeight = Math.round($(window).outerHeight() - bottomBarHeight - topBarHeight) - 30;
                var elementHeightPx = elementHeight +"px";
                el.css('height',elementHeightPx);
                 //setting element width if it is iframe
                if (el.parent().hasClass('video')){
                    iframeWidthSameAsImageWidth(elementHeight, el);
                }  
 }
    
    //---------------setting iframe width in modal 
    
    function iframeWidthSameAsImageWidth(imageHeight, el){
        console.log("modalImageRatio" +modalImageRatio);
        console.log("imageHeight"+imageHeight);
        var iframeWidth = Math.round(imageHeight * modalImageRatio);
        var iframeWidthPx = iframeWidth+"px";
         el.css('width', iframeWidthPx);
        console.log("iframeWidth"+iframeWidthPx);
    }
    
       //----show element after preloader in modal --//////////
    
    function showAfterPreloader(el){
              modal.find('#preloader').hide(); modal.find(el).removeClass('hidden').fadeIn(modalFadeInOutTimeMilisec);
                modal.find('.arrow').removeClass('hidden');
                modal.find('.arrow-background').removeClass('hidden');
                modal.find('#caption').removeClass('hidden');
                modal.find('.bottom-bar').removeClass('hidden');
                modal.find('.top-bar').removeClass('hidden');
                if (!mobile.matches && !nondesktop.matches) {
                    //setting element height
                    modalElementHeight($(el));
                    //setting iframe width 
                    modalBarLength($(el));
                }

        
    }
    
   //--------------fitting the gallery to window height
    
    function galleryHeightFittingToWindowsHeight(){
        var offset = nav.outerHeight() + titleBar.outerHeight() + descBar.outerHeight();    
        var expetedHeight = ($(window).height() - offset)/3;
        galleryImages.css("height",expetedHeight);        
    }




    //----------------------WWW FLOW--------------------------------------------------------------------------------- 
    
    //scroll to the contact form after sending the message
    if   (window.location.href.indexOf("message") != -1 ){
        scrollToContactForm();
    }
    
   //--------------------------setting the height of subtitle box 
    if (main.children().children().first().next().hasClass('description-bar')) {  //pages with description only
        subtitleBoxHeight();
    }

    // ---------preloader for main page//////////

    //for the first  session
    //main.addClass('hidden');//moved to  php session
    if (body.hasClass('loading')) { //only php session = 0
        showPreloaderAndAnimation();
    }
    //for all the other sessions
    else {
        //for the main page
        if (main.children().first().hasClass('grpelem')) {
        showPreloader(); }
    }
    
    //--------entering index.php without specific area
    //OBS! island needs to be hidden by default not to disturb the  backToStartAnimation();
    
    if (!main.attr('data-source')) { 
            island.removeClass('hidden');  
    }
 
    //-----locating pins
    // ----resizing map image - once during pageview//////////
    // ---- fixing the sizes of images of the island - once during pageview ////////
    
    
    if (main.children().first().hasClass('grpelem')) {  //main page only
        setPinsCoords();
        imageMapCalculate(island);
        fixedImgSize();
        
    }
    
    //--------come back to index.php with specific area exposed and not in first session//////////
    if (main.attr('data-source') && !body.hasClass('loading')) {
        backToStartAnimation();
    }

    //--------- hiding specific link from side menu ///////   
    removeFromMenu();

    //----------setting the size of the thumbnails for galleries /////////

    if (main.children().first().next().hasClass('gallery')) {  //gallery page only
        setThumbnailsSize();
            //--------------fitting the gallery to window height for desktop
        if (!mobile.matches && !nondesktop.matches && !portrait.matches) {
            galleryHeightFittingToWindowsHeight();
        }
    }

    
    //----------------setting the length for title bar - to discuss with client 
    
    //titleBarLength();
    

   //---------------moving surname in mobile form
    
    
    if (main.children().first().next().children().first().children().first().children().first().children().first().hasClass('address') && (mobile.matches || nondesktop.matches) ) {  //only for contact page and mobile forms
        
        moveElement($('label[for="surname"]'), $('input[name="name"]'));
        
        moveElement($('input[name="surname"]'), $('label[for="surname"]'));
    };

     

    //----------------------EVENTS---------------------------------------------------------------------------------
    
        
    //  showing / hiding pins on hoover/////////////////
    
    areas.on('mouseenter', function(){
        pins.addClass('hidden');
        var whichArea = $(this).attr('title');
        pins.each(function(){
            if ($(this).attr('title') == whichArea) {
                $(this).removeClass("hidden");
            }
        });
        pulses.each(function(){
            if ($(this).attr('title') == whichArea) {
                $(this).removeClass("hidden");
            }
        });
    });
    
   body.on('mouseover', function(event){
       event.stopImmediatePropagation();
        console.log("body");
        pins.addClass('hidden');   
    }).children().mouseover(function() {
  return false;
});
    
    
    /*
    areas.add(pulses).on('mouseleave', function(){
         var whichArea = $(this).attr('title');
        pins.each(function(){
            if ($(this).attr('title') == whichArea) {
                $(this).addClass("hidden");
            }
        });
        pulses.each(function(){
            if ($(this).attr('title') == whichArea) {
                $(this).addClass("hidden");
            }
        });
    });
    
    */
    

    // ----hamburger menu mouseover//////////

    hamburger.on('mouseenter', function (event) {
      if(!nohover.matches) {
        $(this).children().css('background-color', secondaryColor);
      }
    });

    hamburger.on('mouseleave', function (event) {
      if(!nohover.matches) {
        if ($(this).parent().find('.sidenav').css("width") === '0px') {
        $(this).children().css('background-color', primaryColor);
        }
                    }
    });

    // ----hamburger menu onclick//////////
    

    hamburger.on('click', function () {
        $(this).toggleClass('change'); //rotation to x  and back
        //console.log($(this).parent().css("width"));
        if ($(this).parent().find('.sidenav').css("width") === '0px') {
            //expand
            $(this).parent().find('.sidenav').addClass('expanded');
            //change hamburger color
            $(this).children().css('background-color', secondaryColor);
            //add opacity
            menuOpacity.css("background-color", expandedNavMEnuOpacityColor).css("z-index", "4");
            if (mobile.matches || nondesktop.matches) {
               // console.log('mobile');
             //hide evryting that goes outside and fix body
            body.css("height", "100vh").css("overflow", "hidden").css("position", "fixed");                
            }

        } else if ($(this).parent().find('.sidenav').hasClass('expanded')) {
            $(this).parent().find('.sidenav').removeClass('expanded'); //hide menu
            menuOpacity.css("background-color", "transparent").css("z-index", "-3");  //remove opacity
            //change hamburger color
            $(this).children().css('background-color', primaryColor);
            if (mobile.matches || nondesktop.matches) {
               // console.log('mobile');
            //show evryting that goes outside and unfix body
            body.css("height", "auto").css("overflow", "auto").css("position", "relative");  
            }
        }

    });

    // ----opacity in menu onclick//////////

    menuOpacity.on('click', function () {
        $(this).css("background-color", "transparent").css("z-index", "-3");
        hamburger.toggleClass('change').parent().find('.sidenav').removeClass('expanded');
        //change hamburger color
         hamburger.children().css('background-color', primaryColor);
    })


    //----x close on subpagess mouseover//////////

    close.on('mouseenter', function (event) {
      if(!nohover.matches) {
          $(this).children().css('background-color', secondaryColor);
      }  
    });

    close.on('mouseleave', function (event) {
      if(!nohover.matches) {        
        $(this).children().css('background-color', primaryColor);
      }
    });

    //---map areas clicks actions on main page: exposing specific area//////////
    // rewriting in on function does not work (changed all this to function param) - test
    //OBS!! this event  is huge and should be moved to a function


    areas.add(pins).add(pulses).on('click', function (event) {
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
            .find('img') 
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

    $('nav a').on('click', function (event) {
        event.preventDefault();
        $('main').fadeOut("fast");
        var link = $(this).attr("href");
        setTimeout(function () {
            window.location = link;
        }, onclickAnimationDelay);

    });


    //-------------opening modal in galleries----///////////////////////////
    //OBS!! this event  is huge  and has the repeated code, and should be moved to a function


    galleryImages.on('click', function () {
                
        //unabling with portait mode
      if (portrait.matches) {
          alert("Aby powiększyć obrazek obróć urządzenie w tryb pejzażu!");
          return false;
      }
        else
    
       {
        //fix body
        //body.css("height", "100vh").css("overflow", "hidden");
        if (mobile.matches || nondesktop.matches) {
            //body.css("position", "fixed");  
     }
           
        //hide hamburger
        hamburger.css("z-index", "3");
           
           
        //prepare variables for loading 3 images: current, previous and next 
        dataSource = $(this).data('source');
        var dataSourcePrevious = '';
        var dataSourceNext = '';


        //finding these 3 images
        galleryImages.each(function (index) {
            if ($(this).data('source') === dataSource) {
                dataSourcePrevious = galleryImages.eq(index - 1).data('source');
                dataSourceNext = galleryImages.eq(index + 1).data('source');
            }
        });

        // resize difrent images sizes for different screens        
        mediaMatches(dataSource, dataSourcePrevious, dataSourceNext);

        //loading 3 images  
        galleryImages.each(function (index) {
            //load the actual image
            if ($(this).data('source') === dataSource) {
                //as the video
                if ($(this).hasClass('video')) {
                    setIframe();
                    modal.find('img.modal-content').addClass('hidden');  
                }
                //as an image
                else {
                    modal.find('img.modal-content').attr('src', dataSource); 
                }

                //prepare the previous image/video
                if (galleryImages.eq(index - 1).hasClass('video')) {
                    modal.find('iframe.previous-modal-content').attr('src', dataSourcePrevious);
                } else {
                    modal.find('img.previous-modal-content').attr('src', dataSourcePrevious);
                }
                //prepare the next image/video
                if (galleryImages.eq(index + 1).hasClass('video')) {
                    modal.find('iframe.next-modal-content').attr('src', dataSourceNext);
                } else {
                    modal.find('img.next-modal-content').attr('src', dataSourceNext);
                }
            }
        });
        //loading the description of the current img
        modal.find('#caption').html($(this).attr('alt'));


        //showing / hiding arrows, based on data-order in html
        //if the actual image is the last one
        if ($(this).data('order') == 9) {
            modal.find('.right').hide();
        }
        //if the actual image is the first one
        if ($(this).data('order') == 1) {
            modal.find('.left').hide();
        }

        //showing the modal
        modal.fadeIn();

        //limiting the body height
        body.addClass('fitInViewport');

        //hiding the preloader    
        if ($(this).hasClass('video')) {
                showAfterPreloader('iframe.modal-content');
                    //setting thr arrows
                    //if (!mobile.matches && !nondesktop.matches){
                        modalArrowPosition($('iframe.modal-content'));
                    //}
        } 
        else {
            modal.find('img.modal-content').on("load", function () {
                showAfterPreloader('img.modal-content');
                    //setting thr arrows
                    //if (!mobile.matches && !nondesktop.matches){
                        modalArrowPosition($('img.modal-content'));
                    //}
            });
            if ($(this).complete) {
                showAfterPreloader('img.modal-content');
                    //setting thr arrows
                    //if (!mobile.matches && !nondesktop.matches){
                        modalArrowPosition($('img.modal-content'));
                    //}
            }
        }
    }

    });
    
    //--------------------closing gallery using X  -------------------

    modalCloseButton.on('click', function () {
        closeTheModal();
    });
    
    
    //--------------------closing gallery clicking modal (but not its children)  -------------------

    modal.find('.modal-area').on('click', function (){
       closeTheModal();
    }).children().on('click', function () {
        return false;
    });

    //------------------closing gallery using scroll -  touchSwipe library -------------------

    $(function () {
        $(modal).swipe({
            swipeDown: function () {
                closeTheModal();
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            //threshold:0
        });

        $(modal).swipe({
            swipeUp: function () {
                closeTheModal();
            },
            //threshold:0
        });
    });


    //-------------navigating gallery using arrows-----------------------


    $('.right').on('click', function() {
        showNextImg();
    });

    $('.left').on('click', function() {
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


    $(function () { //strange type of notation - to check   

        $(modal).swipe({
            swipeLeft: function () {
                showNextImg();
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            //threshold:0
        });
        $(modal).swipe({
            swipeRight: function () {
                showPreviousImg();
            },
            //threshold:0
        });

    });


    // --------------validating fields in contact form  during filing the form----- TO DISCUSS WITH CLIENT: ON KEYPRESS OR CHANGE/BLUR


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
        }

    });
    

    //-----------------reloading the page on orientation change in mobile ---///

    $(window).on("orientationchange", function () {
        location.reload();
    });
    
    // hiding browser test
    
      if (navigator.userAgent.match(/Android/i)) {
    window.scrollTo(0,0); // reset in case prev not scrolled  
    var nPageH = $(document).height();
    var nViewH = window.outerHeight;
    if (nViewH > nPageH) {
      nViewH -= 250;
      $('BODY').css('height',nViewH + 'px');
    }
    window.scrollTo(0,1);
  }

    //-------------------end----------------------------   
});