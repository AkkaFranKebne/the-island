$(document).ready(function () {
    

    /* 
do korekty
        > on load img  dla preloadera
        >domyslna strona statyczna, jak sie zaladuje js to pierwsze co popraosic o dynamiczna
        > problemy z media query -  gulp - link w fb, potem przegladanie can i use
        > przesuniete logo lemonhills na podstronach w ie (mimo, ze dalam na stronie glownej niewidoczne X)
        > obszary wyspy przesuniete lekko w lewo na ie i ff, czasem nawet chrome  na win - od czego zalezy?;
        > zaladowywanie gorszej wersji obrazka na poczatku, a potem podmiana na lepsza
        > <!-- change the path for production -->: favicon, images, funkcja path
        > dalej na prod czasem sciska sie animacja
        > mobile: nie scrolluje sie menu
        > stopka na srodku ekranu w mobilnym
        > logo nie wycentrowane w mobilnym
        
        
 do zrobienia po dogadaniu z klientem - wyslany mail z  v.01:
    - stare przegladarki i nie majace js - jak ma wygladac?
    - mobile i podstrony - po przygotowaniu mechaniki: uwagi dot design od projektanta

testowanie: selenium
    */


    //----------------------VARIABLES-----------------------------------------------------------------------

    //basic//////////
    var main = $('main');
    var body = $('body');
    var mainPaddingLeftVw = 15;
    var images =$('img');

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
    
    //time in initial animation
    var duration = 400;
    var delay = 100;
    
    //onclick animation time
    var onclickAnimationMilisec = 2000;
    var onclickAnimationDelay = 200;
    var reloadPageDelay = 2300;  //sum of previous two plus little extra
    
    //backToStartAnimation time
    var backToStartAnimationMilisec = 2000;
    
    //size of extended island part - 150% of original 
    var heightOfExtendedIsland = '1647px';
    var widthOfExtendedIsland = '2822px';



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
    
        function showPreloader(){
        		setTimeout(function() {
			  body.removeClass('loading');
              main.removeClass('hidden');
              island.removeClass('hidden'); //just in case if it is  hidden
                noticeMyArea(areas.eq(3), 0, duration);
                noticeMyArea(areas.eq(4), delay, (duration+delay));
                noticeMyArea(areas.eq(0), (2*delay), (duration+2*delay));
                noticeMyArea(areas.eq(1), (3*delay), (duration+3*delay));
                noticeMyArea(areas.eq(2), (4*delay), (duration+4*delay));
                noticeMyArea(areas.eq(3), (5*delay), (duration+5*delay));
		}, preloaderMilisec);        
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
                    always: function () {  //both fail & success;
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
            $(this).parent().find('.sidenav').css("width", "250px");
            menuOpacity.css("background-color", "rgba(0,0,0,0.4)").css("z-index", "1");

        } else if ($(this).parent().find('.sidenav').css("width") === '250px') {
            $(this).parent().find('.sidenav').css("width", "0px");
            menuOpacity.css("background-color", "transparent").css("z-index", "-3");
        }

    });

    // ----opacity in menu onclick//////////

    menuOpacity.on('click', function () {
        $(this).css("background-color", "transparent").css("z-index", "-3");
        hamburger.toggleClass('change').parent().find('.sidenav').css("width", "0px");
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

    

    //-------------------end----------------------------   
});
