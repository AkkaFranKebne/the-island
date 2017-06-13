$(document).ready(function(){
    
    /*pytania
    mryganie na poczatek - jak zrobic tylko raz w sesji? php?
    
    jak trzymac obrazki na czas sesji aby nie ladcowaly sie w czasie kolejnych przeladowan strony? ajax? local storage?
    
    */
    
    // preloader
    
    var main = $('main');
    main.addClass('hidden');
    
    
    $(window).on("load", function() {
            //mozna zamienic na  https://github.com/desandro/imagesloaded
		setTimeout(function() {
			  $('body').removeClass('loading');
              main.removeClass('hidden');			  
		}, 3300);
	});
    
    
    // mryganie ma poczatek
   
    var partsofIsland = $('.grpelem');
    console.log(partsofIsland);

    
    
        function noticeMe(ele, delay){
        setTimeout(function(){ele.removeClass('hidden')}, delay);
        setTimeout(function(){ele.addClass('exposed')}, delay);
        ele.delay(delay).animate({
                opacity: 1
        },300).animate({
                opacity: 0.8
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

    
    
    
    
    //resizing map-image -  raz, po zaladowaniu strony
    

    var ImageMap = function (map) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                previousWidth = 2690;  
            console.log(areas);
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

    
    // podpiecie biblioteki maplight
    
    jQuery('#island_img').maphilight();

//'009DDF'
    
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
        shadowFrom: false
    });
    
    
   //eventy na najechanie mysza i zjechanie

    
   var areas = $('area');

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
   
   
    
   areas.on('click', function(event){
       event.preventDefault();
       console.log("click");
   });
   
   */
    
 
 //-------------------end----------------------------   
});