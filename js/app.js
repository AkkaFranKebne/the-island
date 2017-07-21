$(document).ready(function () {
    /* 
        
testowanie - znalezione bledy NA EMULATORZE - SPRAWDZIC NA FAKTYCZNYCH URZADZENIACH:


> chrome 58 - obszary wyspy przesuniete lekko w lewo na ie i ff, czasem nawet chrome  na win -> szwankuje imageMapCalculate(map); nie pomogla zmiana na 
> chrome 58 - form zwija sie podczas pisania
> edge -  menu przesuwa sie w prawo przy kliku w modal i wejsciu na podstrony 


>iphone 6, galaxy note  - czasem wyspa dla 1 sesji jest niewidoczna (nie jest usunieta klasa loading z body) ustawic timeout na info o przeladowaniu strony?
>ipad air  - nie pokazuja sie piny
>motorola  - nie widac calego menu przy pozimym ostawieniu, schowany ostatni link

nie dziala na opera mini - jak to wyglada?:
> transform
> transition 
> animation 
> border radius 
> box shadow 

--------------------------------------------------------------
  
 
jak zdaze to do:
        > na ostatecznym ksztalcie strony - dodanie wordpressa do galerii (jak ogarnac wiele rozmiarow obrazkow? czy wordpress sam to ogarnie?)
        > przepisanie na funkcje next/previous image
        > przerobienie walidacji formularza z blur na natychmiastowa
        > 404 page               

do zmiany przed oddaniem:
        > linki do mini css i zoptymalizowanych obrazkow zmienic - czemu imagemin nie dziala?
        
extra homework:
        > lazy load obczaic
        > blur load obczaic
        > creative cloud obczaic
        > gulp svg konwersja obczaic
        > cookie js obczaic

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

    var imgStandardExt = '.jpg';
    var imgMobileExt = '_mobile.jpg';
    var imgNonDesktopExt = '_nondesktop.jpg';
    var imgDesktopExt = '_desktop.jpg';

    //colors
    var primaryColor = 'cadetblue';
    var secondaryColor = 'white';
    var expandedNavMEnuOpacityColor = "rgba(0,0,0,0.4)";

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

    //pins
    var areas = $('area');
    var pins = $('.pin');
    var pulses = $('.pulse');


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


    //size of extended island part - 150% of original 
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
    var galleryImages = $('.gallery').find('img');
    var modal = $('#modal');
    var modalCloseButton = $('span.close');
    var arrows = $('.arrow');

    //contact form
    var form = $('form');
    var submitButton = form.find('input[type="submit"]');
    var emailField = form.find('#email');
    var telephoneField = form.find('#tel');
    var errorOne = $('.error-one');
    var errorTwo = $('.error-two');
    var successAlert = $('.alert-success');
    var emailValue = emailField.val();



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

    // recalculating map coordinates ////////////////////////////

    function imageMapCalculate(map) {
        var coordsAll = [];
        for (var i = 0; i < areas.length; i++) {
            //console.log(areas[i].coords);  //in jquery you cannot see "coords" property
            var thisMapCoords = areas[i].coords.split(',');
            coordsAll.push(thisMapCoords);
        };
        //console.log("width: "+ $('body').width());
        //console.log("client-width: "+ $('body')[0].clientWidth);
        
        var previousWidth = initWidth;
        var x = $('body')[0].clientWidth / previousWidth;  //changed from .width()
        for (var i = 0; i < coordsAll.length; i++) {
            for (var j = 0; j < coordsAll[i].length; j++) {
                coordsAll[i][j] *= x;
            }
            areas[i].coords = coordsAll[i].join(',');
        }
        previousWidth = $('body')[0].clientWidth; //cleaning the var just in case  //changed
        return true; //necesarry?
    }


    //showing  preloader on start//////////////////////////////// 

    function showPreloader() {
        //console.log(idOfImageThatIsLoading);
        body.addClass('loading');
        island.addClass('hidden');
        island_img.addClass('hidden');
        island_img.on("load", function () {
            console.log("showPreloader - on load");
            body.removeClass('loading');
            main.removeClass('hidden');
            island.removeClass('hidden');
            island_img.removeClass('hidden');
        });
        var pictureInCache = document.getElementById('island_img').complete;
        console.log(pictureInCache);
        if (pictureInCache == true) {
            console.log("showPreloader - cache");
            body.removeClass('loading');
            main.removeClass('hidden');
            island.removeClass('hidden');
            island_img.removeClass('hidden');

        }
    }

    //showing  preloader and animation on start///////////////  

    function showPreloaderAndAnimation() {
        island_img.on("load", function () {
            console.log("showPreloaderAndAnimation - on load");
            body.removeClass('loading');
            main.removeClass('hidden');
            island.removeClass('hidden');
            //showing pins for touchscreens
            isTouch();
            //showing animation
            noticeMyArea(areas.eq(3), Start1, End1);
            noticeMyArea(areas.eq(4), Start2, End2);
            noticeMyArea(areas.eq(0), Start3, End3);
            noticeMyArea(areas.eq(1), Start4, End4);
            noticeMyArea(areas.eq(2), Start5, End5);
            noticeMyArea(areas.eq(3), Start6, End6);
        });
        var pictureInCache = document.getElementById('island_img').complete;
        console.log(pictureInCache);
        if (pictureInCache == true) {
            console.log("showPreloaderAndAnimation - cache");
            body.removeClass('loading');
            main.removeClass('hidden');
            island.removeClass('hidden');
            //showing pins for touchscreens
            isTouch();
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
        console.log(source);
        source = source.replace('/the-island', ''); //for localhost only
        console.log(source);
        source = source.split("/");
        source = source[1].split(".");
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
                    always: function () { //in this form this happens both fail & success;
                        wholeisland
                            .removeClass('exposed')
                            .addClass('hidden');
                        island.removeClass('hidden');
                        //showing pins for touchscreens
                        isTouch();
                    }
                }

            );
    }

    // fixing the size of map images for the pageview //////////
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
        //check if it works properly
        //console.log(dataSource);
        //console.log(dataSourcePrevious);
        //console.log(dataSourceNext);

    }

    // introducing media queries for pins => touchscreens //////////

    function isTouch() {
        if (touch.matches && !island.hasClass('hidden')) {
            pins.removeClass("hidden");
            pulses.removeClass("hidden");
        }
    }



    //moving to the next image in galleries////////////////////////
    //OBS! this function is to big, should be divided to different small functions

    function showNextImg() {
        //finding current image
        var imageSource = "#";
        var modalContentElements = modal.find('.modal-content');
        //choosing the visible one (between two: img and iframe)
        modalContentElements.each(function () {
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

                //this image become the previous one (as we move forward)
                dataSourcePrevious = $(this).data('source');
                //next image become the actual image
                dataSource = galleryImages.eq(index + 1).data('source');
                //the image after next become next image
                dataSourceNext = galleryImages.eq(index + 2).data('source');
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

                //if the user wants to go beyond the first or last image
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
                    //console.log("to video");
                    modal.find('iframe.modal-content').removeClass('hidden').attr('src', dataSource).fadeIn(modalFadeInOutTimeMilisec);
                    modal.find('img.modal-content').fadeOut(modalFadeInOutTimeMilisec);
                }
                //as an image
                else {
                    //console.log("to img");
                    modal.find('img.modal-content').attr('src', dataSource).fadeIn(modalFadeInOutTimeMilisec);
                    modal.find('iframe.modal-content').fadeOut(modalFadeInOutTimeMilisec);
                }

                //prepare the previous image/video
                if ($(this).hasClass('video')) {
                    modal.find('iframe.previous-modal-content').attr('src', dataSourcePrevious);
                } else {
                    modal.find('img.previous-modal-content').attr('src', dataSourcePrevious);
                }
                //prepare the next image/video
                if (galleryImages.eq(index + 2).hasClass('video')) {
                    modal.find('iframe.next-modal-content').attr('src', dataSourceNext);
                } else {
                    modal.find('img.next-modal-content').attr('src', dataSourceNext);
                }
            }
        });
        //insert caption
        modal.find('#caption').html(caption);
    }


    //----------setting the size of the thumbnails for galleries /////////

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



    //moving to the previous image in galleries------------------------------
    //OBS!! the code is simmilar to showNextImg() - in vol2 it can be put into one function with ifs;

    function showPreviousImg() {

        //finding current image
        var imageSource = "#";
        var modalContentElements = modal.find('.modal-content');
        //choosing the visible one (between two: img and iframe)
        modalContentElements.each(function () {
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
                //this image become the next one (as we move backward)
                dataSourceNext = $(this).data('source');
                //the  previous image become the actual image
                dataSource = galleryImages.eq(index - 1).data('source');
                //the image before the previous image become the previous image
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
                    console.log("to video");
                    modal.find('iframe.modal-content').removeClass('hidden').attr('src', dataSource).fadeIn(modalFadeInOutTimeMilisec);
                    modal.find('img.modal-content').fadeOut(modalFadeInOutTimeMilisec);
                }
                //as an image
                else {
                    console.log("to img");
                    modal.find('img.modal-content').attr('src', dataSource).fadeIn(modalFadeInOutTimeMilisec);
                    modal.find('iframe.modal-content').fadeOut(modalFadeInOutTimeMilisec);
                }
                //prepare the previous image/video
                if (galleryImages.eq(index - 2).hasClass('video')) {
                    modal.find('iframe.previous-modal-content').attr('src', dataSourcePrevious);
                } else {
                    modal.find('img.previous-modal-content').attr('src', dataSourcePrevious);
                }
                //prepare the next image/video
                if ($(this).hasClass('video')) {
                    modal.find('iframe.next-modal-content').attr('src', dataSourceNext);
                } else {
                    modal.find('img.next-modal-content').attr('src', dataSourceNext);
                }
            }
        });
        //insert caption
        modal.find('#caption').html(caption);
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

            //preparing arrows
            modal.find('.right').show();
            modal.find('.left').show();

            //withrdaw changes from body
            body.removeClass('fitInViewport');
        });


    }
    
    

    // ------------validating contact form  telephone///////////////////////


    function validateTelephone() {
        var telephoneValue = telephoneField.val();
        var filter = /^[0-9-+ ]+$/;
        if (filter.test(telephoneValue) && telephoneValue.length > 7) {
            errorOne.text("").hide();
        } else {
            errorOne.text("Podaj poprawny numer").show();

        }
    }

    // ------------validating contact form  email/////////////////////////

    function validateEmail() {
        var emailValue = emailField.val();
        if (emailValue.indexOf("@") == -1 || emailValue.indexOf(".") == -1 || emailValue.length < 5) {
            errorTwo.text("Podaj poprawny adres email").show();
        } else {
            errorTwo.text("").hide();
        }
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
        sideNavLinks.show();
        sideNavLinks.each(function () {
            if ($(this).attr('href') == url) {
                $(this).hide();
            } else if ($(this).attr('href') == "index.php" && url == "") {
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
    //for all the other sessions
    else {
        if (main.children().first().hasClass('grpelem')) {
        showPreloader(); }
    }
    
    //--------entering index.php without specific area
    if (!main.attr('data-source')) { 
        //if (main.children().first().hasClass('grpelem')) { //for the main page
            //showPreloader(island_img, 'island_img'); //not for the first session 
            island.removeClass('hidden'); 
            isTouch(); //----------------showing pins for touchscreens
        //}
    }

    //OBS! island needs to be hidden by default not to disturb the  backToStartAnimation();


    // ----resizing map image - once during pageview//////////

    if (main.children().first().hasClass('grpelem')) {
        imageMapCalculate(island);
    }

    // ---- fixing the sizes of images of the island - once during pageview ////////
    fixedImgSize();


    //--------come back to index.php with specific area exposed and not in first session//////////
    if (main.attr('data-source') && !body.hasClass('loading')) {
        backToStartAnimation();
    }

    //--------- hiding specific link from side menu ///////   
    removeFromMenu();

    //----------setting the size of the thumbnails for galleries /////////

    setThumbnailsSize();

    //----------------------EVENTS---------------------------------------------------------------------------------

    // ----hamburger menu mouseover//////////

    hamburger.on('mouseenter', function (event) {
        $(this).children().css('background-color', secondaryColor);
    });

    hamburger.on('mouseleave', function (event) {
        $(this).children().css('background-color', primaryColor);
    });

    // ----hamburger menu onclick//////////

    hamburger.on('click', function () {
        $(this).toggleClass('change');
        console.log($(this).parent().css("width"));
        if ($(this).parent().find('.sidenav').css("width") === '0px') {
            $(this).parent().find('.sidenav').addClass('expanded');
            menuOpacity.css("background-color", expandedNavMEnuOpacityColor).css("z-index", "1");
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
        $(this).children().css('background-color', secondaryColor);
    });

    close.on('mouseleave', function (event) {
        $(this).children().css('background-color', primaryColor);
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
        //prepare variables for loading 3 images: current, previous and next 
        var dataSource = $(this).data('source');
        var dataSourcePrevious = '';
        var dataSourceNext = '';
        //console.log(dataSourcePrevious);

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
                    modal.find('iframe.modal-content').attr('src', dataSource);
                    modal.find('img.modal-content').hide();
                }
                //as an image
                else {
                    console.log("to img");
                    modal.find('img.modal-content').attr('src', dataSource);
                    modal.find('iframe.modal-content').hide();
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
            modal.find('iframe.modal-content').on("load", function () {
                console.log("modal on load video");
                modal.find('#preloader').hide();
                modal.find('iframe.modal-content').removeClass('hidden').fadeIn(modalFadeInOutTimeMilisec);
                modal.find('.arrow').removeClass('hidden');
                modal.find('.arrow-background').removeClass('hidden');
                modal.find('#caption').removeClass('hidden');
            }); 
            //for cache
            if ($(this).complete) {
                   console.log("modal cache video");
                     modal.find('#preloader').hide();
                    modal.find('iframe.modal-content').removeClass('hidden').fadeIn(modalFadeInOutTimeMilisec);
                    modal.find('.arrow').removeClass('hidden');
                    modal.find('.arrow-background').removeClass('hidden');
                    modal.find('#caption').removeClass('hidden');               
            }
        } 
        else {
            modal.find('img.modal-content').on("load", function () {
                console.log("modal on load img");  modal.find('#preloader').hide().addClass('notDisplayed');
                modal.find('img.modal-content').removeClass('hidden').fadeIn(modalFadeInOutTimeMilisec);
                modal.find('.arrow').removeClass('hidden');
                modal.find('.arrow-background').removeClass('hidden');
                modal.find('#caption').removeClass('hidden');
            });
            if ($(this).complete) {
                   console.log("modal cache img");
                     modal.find('#preloader').hide();
                    modal.find('img.modal-content').removeClass('hidden').fadeIn(modalFadeInOutTimeMilisec);
                    modal.find('.arrow').removeClass('hidden');
                    modal.find('.arrow-background').removeClass('hidden');
                    modal.find('#caption').removeClass('hidden');               
            }
        }
        
        
              

 

    });
    



    //--------------------closing gallery using X  -------------------

    modalCloseButton.on('click', function () {
        closeTheModal();
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


    $(function () { //sprawdzic co to za typ zapisu    

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

    $(window).on("orientationchange", function () {
        location.reload();
    });

    //-------------------end----------------------------   
});
