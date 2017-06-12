$(document).ready(function(){
    
    //resizing map-image - na razie raz, po zaladowaniu strony
    

    var ImageMap = function (map) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                previousWidth = 2780;  
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

    
    //map
    
    jQuery('#island_img').maphilight();


    
    $('#island_img').maphilight({ 
        stroke: true, 
        strokeColor: 'ffffff',
        strokeWidth: 1,
        fillColor: '009DDF', 
        fillOpacity: 0.3 
    });
    
    
    /*
    mozna wstawic w area:
    
    data-maphilight='{"strokeColor":"0000ff","strokeWidth":5,"fillColor":"00ff00","fillOpacity":0.6}'>
    
    http://jsfiddle.net/k67gq/6/
    
    
    */

    
   var areas = $('area');

    
    
    
    
    
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
   
   
    
 //-------------------end----------------------------   
});