     //----------oryginalna funkcja 

https://stackoverflow.com/questions/13321067/dynamically-resizing-image-maps-and-images
//previousWidth is the width which the image had at the time you've originally created the coordinates for area elements

     /*
    var ImageMap = function (map) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                previousWidth = 2690;  
            //console.log(areas); //kazda area ma property coord, to to object ale string
            for (n = 0; n < len; n++) {
                //coords[n] = areas[n].coords.split(','); //podzielenie stringu na array
                var thisMApCoords = areas[n].coords.split(',') 
                coords.push(thisMApCoords);

            }
            //powstaje array z 5 array w srodku
        
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
                previousWidth = document.body.clientWidth; // po co to? aaa, jak by chciec to robic przy kazdym resize strony - czy jest sens?
                return true;
            };
            window.onresize = this.resize;
        },
        imageMap = new ImageMap(document.getElementById('island'));
    imageMap.resize();
     */
     //---------------koniec 