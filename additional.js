$(document).ready(function(){
    
    var container = $('.container');
    container.hide();
    
    //preloader    
        
        $(window).on("load", function() {
            //mozna zamienic na  https://github.com/desandro/imagesloaded
		setTimeout(function() {
			  $('body').removeClass('loading');
              container.fadeIn();			  
		}, 800);
	});
        
    
    
    //console.log('ready to party!');
    var elements  = $('.element');
        
    //potrzebne pozniej zmienne
     var offsetTop = 0; 
     var offsetLeft = 0;
     var windowWidth = 0;
     var scaleWidth = 0;  
     var WindowHeight = 0; 
     var scaleHeight = 0; 
    
    // mryganie na poczatek--------------------------------------------------
        
    function noticeMe(ele, delay){
        ele.delay(delay).animate({
                opacity: 1 ,    
                width: "202px",
                height: "202px"
        },200).animate({
                opacity: 0.5,  
                width: "200px",
                height: "200px"
        },400);
    };
    
    noticeMe(elements.eq(0), 1000);
    noticeMe(elements.eq(3), 1200);
    noticeMe(elements.eq(1), 1400);
    noticeMe(elements.eq(2), 1600);

        
   //najazd myszy ------------------------------------------------------
    elements.on('mouseenter', function(){
        $(this).css('cursor','pointer');
        $(this).animate({
            opacity: 1,
            width: "202px",
            height: "202px"
        },200).animate({
            width: "200px",
            height: "200px"
        },100);
    });
    
    elements.on('mouseleave', function (){
        $(this).animate({
            opacity: 0.5         
        },200);
    })
    
  // klik w obrazek----------------------------------------------------------------------


     elements.on('click', function(){
         
        //ustawianie adresow przekierowan:
         
         var linkString = $(this).data('id')+'-page.html';

         
         //wylaczanie niepotrzebnych eventow
        $(this).off('mouseenter').off('mouseleave');
        $(this).css('z-index', '9999');
         //$(this).siblings().css('opacity', '0');
         
         
        //wyliczanie pozycji obrazka 
        
        offsetTop = $(this).offset().top //- $(window).scrollTop();
        offsetLeft = $(this).offset().left //- $(window).scrollLeft();

         
         console.log('offsettop: '+offsetTop);
         console.log('offsetleft: '+offsetLeft);
         
        //wyliczanie nowych rozmiarow obrazka 
        
         
        windowWidth = $(window).innerWidth();
        scaleWidth = windowWidth/$(this).innerWidth();  
        WindowHeight = $(window).innerHeight()-5; 
        scaleHeight = WindowHeight/$(this).innerHeight(); 
         
         console.log('scaleWidth: '+scaleWidth);
         console.log('scaleHeight: '+scaleHeight);
         
        //tworzenie stringa do translate 
         /*
        var transformString = 'translate(-'+offsetLeft+'px, -'+offsetTop+'px) scale('+scaleWidth +','+ scaleHeight +')'
        console.log(transformString);
        
        */

         var transformString2 = 'translate(-'+offsetLeft+'px, -'+offsetTop+'px)'
 
         
         //animacja
         
        $(this)
            .css({
                "position": "fixed"
                //"transform": transformString2, 
                //"transform-origin": "0 0",
                //"transition":  "2s ease",
                })
            .animate({
                left: "0",
                top: "0",
                height: WindowHeight,
                width: windowWidth
                },2000/*,{queue: false},2000, function (){
                    offsetTop = 0; 
                     offsetLeft = 0;
                     windowWidth = 0;
                     scaleWidth = 0;  
                     WindowHeight = 0; 
                     scaleHeight = 0;                
                }*/);
        timeout();
        return false;
         
        
         //ustawianie opoznionego przeladowania stronny
         function timeout() {
            setTimeout(reloadPage, 2000);
         }  
         
         
         
          function reloadPage() {
            location.href = linkString;
          }
    });

   //----------------------------koniec

});
