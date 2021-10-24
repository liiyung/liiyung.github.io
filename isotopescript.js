

<!--isotope.js-->


<script>
//main function, called isotope
var isotope =  $(function(){
        // filter items when filter link is clicked
        // quick search regex
        var qsRegex;
        var buttonFilter;
        var $container = $('#content');
        var $boxes = $('.box').css('opacity','0');
        
        
        $container.imagesLoaded(function(){
            $container.isotope({ 
                itemSelector : '.box',
                layoutMode : 'masonry',
                masonry: {
                    gutter: {text:Gutter Width}
                },
                fitColumns: {
                    gutter: {text:Gutter Width}
                },
                fitRows: {
                    gutter: {text:Gutter Width}
                },
                cellsByRow: {
                    columnWidth: 110,
                    rowHeight: 110
                },
                vertical: {
                    horizontalAlignment: 0.5,
                },
                masonryHorizontal: {
                    rowHeight: 250
                },
                cellsByColumn: {
                    columnWidth: 110,
                    rowHeight: 110
                },
                filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
            });
        $('.box').css('opacity','1.0');
        
        });

        var captionbefore = document.getElementsByClassName('phototitle');
        var captionafter = document.getElementsByClassName('caption');
        var i;
        for (i = 0; i < captionbefore.length; i++) {

            var captionbeforePtag = captionbefore[i].getElementsByTagName("p");
            for(j = 0; j < captionbeforePtag.length; j++) {
                captionbeforePtag[j].style.display = "none";
            }
            
            var captionafterH2tag = captionafter[i].getElementsByTagName("h2");
            for(k = 0; k < captionafterH2tag.length; k++) {
                captionafterH2tag[k].style.display = "none";
            }
        }
        

//infinite scroll and callback
        $container.infinitescroll({
            navSelector  : '#page_nav', 
            nextSelector : '#page_nav a',  
            itemSelector : '.box',  
            errorCallback: function(){$('.load-more').hide();}, 
            
            bufferPx : 1500,
            loading: {
                msgText: "<em></em>",    
                finishedMsg: ' ',
                img: 'https://i.imgur.com/qkKy8.gif'
                        }
        },
        
        // call Isotope as a callback
        function ( newElements ) {
            var $newElems = jQuery( newElements ).hide(); // hide to begin with
            
               $('.photo-slideshow').pxuPhotoset({
       lightbox: true,
       rounded: false,
       gutter: ' {text:Photoset Gutter Width}px',
       borderRadius: '0px',
       highRes   : true,
       captions  : true,
       photoset: '.photo-slideshow',
       photoWrap: '.photo-data',
       photo: '.pxu-photo'
   });
            
            $( newElements ).find('.photo-slideshow').pxuPhotoset({
               lightbox: true,
               rounded: false,
               gutter: ' {text:Photoset Gutter Width}px',
               borderRadius: '0px',
               highRes   : true,
               captions  : true,
               photoset: '.photo-slideshow',
               photoWrap: '.photo-data',
               photo: '.pxu-photo'
            });
            
            resizeVideos();

            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function(){
            $newElems.fadeIn(); // fade in when ready
            $container.isotope( 'insert', $newElems );
            
            $("#s-m-t-tooltip").css('z-index', '999999999');
            });

            $("#s-m-t-tooltip").css('z-index', '999999999');

        });    //end isotope as callback
        
        

//         //manual infinite scroll
//         $(window).unbind('.infscr');
//         $('.load-more').click(function(){
//         $container.infinitescroll('retrieve');
//         return false
//         });

        
        $("#s-m-t-tooltip").css('z-index', '999999999');


     
        
// tag filter
$('#filters').on( 'click', 'button', function() {
  window.scrollTo(0,0);    
  buttonFilter = $( this ).attr('data-filter');
  // y coordinate at 300 to show filtered posts from top post instead of title 
  window.scrollTo(0,350);
  $container.isotope();
  // y coordinate at 300 to show filtered posts from top post instead of title 
  window.scrollTo(0,350);
  return false
});



// // multiple filters
// // store filter for each group
// var filters = {};

// $('#filters').on( 'click', '.button', function() {
//   var $this = $(this);
//   // get group key
//   var $buttonGroup = $this.parents('.button-group');
//   var filterGroup = $buttonGroup.attr('data-filter-group');
//   // set filter for group
//   filters[ filterGroup ] = $this.attr('data-filter');
//   // combine filters
//   var filterValue = concatValues( filters );
//   $container.isotope({ filter: filterValue });
// });

// // flatten object by concatting values
// function concatValues( obj ) {
//   var value = '';
//   for ( var prop in obj ) {
//     value += obj[ prop ];
//   }
//   return value;
// }


// use value of search field to filter
var $quicksearch = $('#quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $container.isotope();
}) );

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
};
        
});    //ending main function

$(document).ready(isotope);    
</script>		
 
<script>
$(document).ready(function(){
   $('.photo-slideshow').pxuPhotoset({
       lightbox: true,
       rounded: false,
       gutter: ' {text:Photoset Gutter Width}px',
       borderRadius: '0px',
       highRes   : true,
       captions  : true,
       photoset: '.photo-slideshow',
       photoWrap: '.photo-data',
       photo: '.pxu-photo'
   });
});
</script>


