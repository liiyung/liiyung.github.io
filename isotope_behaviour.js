

//main function, called isotope
var isotope =  $(function(){
        // filter items when filter link is clicked
        // quick search regex
        var qsRegex;
        var filtercValue;
        var A;
        var sortByValue;
        var $grid = $('.grid');
        var $boxes = $('.box').css('opacity','0');
        
        
        $grid.imagesLoaded(function(){
            $grid.isotope({ 
                itemSelector : '.box',
                layoutMode : 'masonry',
                masonry: {
                    gutter: 10,
                },
                getSortData: {
                  name: '.name',
                  symbol: '.symbol',
                  number: '.number parseInt',
                  category: '[data-category]',
                  weight: function( itemElem ) {
                    var weight = $( itemElem ).find('.weight').text();
                    return parseFloat( weight.replace( /[\(\)]/g, '') );
                  },
                },
                filter: function() {
                  var $this = $(this);
                  var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
                  // get search result based on already selected filters !!!!!!! 
                  var buttonResult = filtercValue ? $this.is( filtercValue ) : true;
                  return searchResult && buttonResult;
                },
            });
        $('.box').css('opacity','1.0');
        });

              
// // custom parsing filters
// var filterFns = {
//   // show if number is greater than 50
//   numberGreaterThan50: function() {
//     var number = $(this).find('.number').text();
//     return parseInt( number, 10 ) > 50;
//   },
//   // show if name ends with -ium
//   ium: function() {
//     var name = $(this).find('.name').text();
//     return name.match( /ium$/ );
//   }
// };

////////////////////////////////////// MULTIPLE FILTERS /////////////////////////////////////////

// store filter for each group
var filters = {};

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

// multiple filters
$('.filters').on( 'click', 'button', function( event ) {  
  var $button = $( event.currentTarget );
  var $buttonGroup = $button.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  filters[ filterGroup ] = $button.attr('data-filter');
  // concatenate selected filter values
  filtercValue = concatValues( filters );
  // isotope display results
  $grid.isotope();
  return false
});

// change is-checked class on buttons (just behaviour of buttons, not isotope )
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function( event ) {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    var $button = $( event.currentTarget );
    $button.addClass('is-checked');
  });
});
////////////////////////////////////// MULTIPLE FILTERS /////////////////////////////////////////





////////////////////////////////////// SORTING //////////////////////////////////////
// // bind sort button click
// $('#sorts').on( 'click', 'button', function() {
//   var sortByValue = $(this).attr('data-sort-by');
//   // sorting
//   $grid.isotope({ sortBy: sortByValue });
// });
////////////////////////////////////// SORTING //////////////////////////////////////





////////////////////////////////////// SEARCH FILTER //////////////////////////////////////
// use value of search field to filter
var $quicksearch = $('#quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
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
////////////////////////////////////// SEARCH FILTER //////////////////////////////////////

        
});    //ending main function

$(document).ready(isotope);  