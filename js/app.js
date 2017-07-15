$(document).ready(function () {

    

    /* 
to do

problemy na warsztaty - do obgadania z prowadzacym:
        > Dodanie prefixow: gulp - https://www.npmjs.com/package/gulp-autoprefixer   +jshint
        > przegladniecie can i use i ewen poprawki
        >testowanie selenium:
                > obszary wyspy przesuniete lekko w lewo na ie i ff, czasem nawet chrome  na win - od czego zalezy?;
                > form nie on focus tylko na zmiane, dlaczego nie dziala?
                > galeria: bugi 
                > dalej na prod czasem sciska sie animacja i nie wlacza animacja poczatkowa;   
        
 
 do zrobienia pozniej:
        > domyslna strona statyczna dla przegladarek bez js, jak sie zaladuje js to pierwsze co poprosic o dynamiczna (narzedzie)
        > hinty na mapie dla ekranow dotykowych (gdzie brak hovera)
        > animacje na pojawianie sie elementow na podstronach 
        > poprawki wizualne
        > dodanie wordpressa do obrazkow (jak ogarnac media?)
  
  do poprawienia przed oddaniem:
        > <!-- change the path for production -->: favicon, images, funkcja path - zmienic tak, by nie trzeba bylo zmieniac - php?
        > kolory w js w zmienne
        >  opozniona animacja poczatkowa - czemu nie dzialaja zmienne?
        > powtorzony kod w js zamienic na zmienne
        > kod mapy przerzucic do app.js
        > sprawdzic czy sesja dziala poprawnie
        > ladny css https://www.w3schools.com/jquery/jquery_events.asp  polaczenie eventow w 1
        > minifikacja
        
        
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
/*
    function showPreloader() {
        setTimeout(function () {
            body.removeClass('loading');
            main.removeClass('hidden');
            island.removeClass('hidden'); //just in case if it is  hidden
            noticeMyArea(areas.eq(3), 0, 400);
            noticeMyArea(areas.eq(4), 100, 500);
            noticeMyArea(areas.eq(0), 200, 600);
            noticeMyArea(areas.eq(1), 300, 700);
            noticeMyArea(areas.eq(2), 400, 800);
            noticeMyArea(areas.eq(3), 500, 900);
        }, preloaderMilisec);
    }
 */   
      
       function showPreloader() {
            island_img.on("load", function() { 
                body.removeClass('loading');
                main.removeClass('hidden');
                island.removeClass('hidden'); //just in case if it is  hidden
                console.log("2 done");
                console.log("3 start");
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
        // data-source of related part of the island
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
        if (mobile.matches) {
           if (typeof dataSource != "undefined") {
            dataSource= dataSource.replace('.png','_mobile.png');
           }
            
           if (typeof dataSourcePrevious != "undefined") {
               dataSourcePrevious= dataSourcePrevious.replace('.png','_mobile.png');
           }
            
           if (typeof dataSourceNext != "undefined") {
               dataSourceNext= dataSourceNext.replace('.png','_mobile.png');
           } 
            
		} 
        else if (nondesktop.matches) {
           if (typeof dataSource != "undefined") {
            dataSource= dataSource.replace('.png','_nondesktop.png');
           }
            
           if (typeof dataSourcePrevious != "undefined") {
            dataSourcePrevious= dataSourcePrevious.replace('.png','_nondesktop.png');
           }
            
            if (typeof dataSourceNext != "undefined") {           
            dataSourceNext= dataSourceNext.replace('.png','_nondesktop.png');
            }
        }
        
        else if (desktop.matches) {
          if (typeof dataSource != "undefined") {
            dataSource= dataSource.replace('.png','_desktop.png');
          }
            
           if (typeof dataSourcePrevious != "undefined") {
            dataSourcePrevious= dataSourcePrevious.replace('.png','_desktop.png');
           }
            
            if (typeof dataSourceNext != "undefined") {           
            dataSourceNext= dataSourceNext.replace('.png','_desktop.png');
            }
        }
        //check if it works properly
        console.log(dataSource);
        console.log(dataSourcePrevious);
        console.log(dataSourceNext);
            
    }
    
    
    //moving to the next image in galleries

    function showNextImg() {

        //preparing variables for 3 images: current, previous and next
        var imageSource = modal.find('.modal-content').attr('src');
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
        modal.find('.modal-content').attr('src', dataSource);
        modal.find('.previous-modal-content').attr('src', dataSourcePrevious);
        modal.find('.next-modal-content').attr('src', dataSourceNext);
        modal.find('#caption').html(caption);
    }

    //moving to the previous image in galleries


    function showPreviousImg() {
        //preparing variables for 3 images: current, previous and next
        var imageSource = modal.find('.modal-content').attr('src');
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
        modal.find('.modal-content').attr('src', dataSource);
        modal.find('.previous-modal-content').attr('src', dataSourcePrevious);
        modal.find('.next-modal-content').attr('src', dataSourceNext);
        modal.find('#caption').html(caption);
    }

    //-------------closing modal in galleries----

    function closeTheModal() {
        // hiding the modal
        modal.fadeOut("slow", function () {
            //preparing the preloader for the next click
            modal.find('#preloader').show('slow');
            modal.find('.modal-content').addClass('hidden');

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

    
    


    //----------------------WWW FLOW--------------------------------------------------------------------------------- 



    // ---------preloader--gif//////////


    //main.addClass('hidden');//moved to  php session

    if (body.hasClass('loading')) { //only php session = 0
        showPreloader()
    }

    // ----resizing map image - once during pageview//////////

    if (main.children().first().hasClass('grpelem')) {
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


    if (main.attr('data-source') && !body.hasClass('loading')) {
        backToStartAnimation()
    }
    
    //----------setting the size of the thumbnails for galleries /////////
    
    if (nondesktop.matches) {
            if ($('.row').hasClass('gallery')) {
            var images = $('.row').find('picture img');
            images.each(function(e){
                var source = $(this).attr("src");
                source = source.replace('.png','_nondesktop.png');
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

    areas.on('click', function (event) {

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
        modal.find('.modal-content').attr('src', dataSource);
        modal.find('.previous-modal-content').attr('src', dataSourcePrevious);
        modal.find('.next-modal-content').attr('src', dataSourceNext);


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

        //showing the preloader - now is for all clicks, should be based on img loaded - to fix
        /*
        setTimeout(function () {
            modal.find('#preloader').hide();
            modal.find('.modal-content').removeClass('hidden');
            modal.find('.arrow').removeClass('hidden');
            modal.find('#caption').removeClass('hidden');
        }, 3000);
        */
        
        modal.find('.modal-content').on("load", function() { 
            modal.find('#preloader').hide();
            modal.find('.modal-content').removeClass('hidden');
            modal.find('.arrow').removeClass('hidden');
            modal.find('#caption').removeClass('hidden');
          });

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

    //-------------------end----------------------------   
});
