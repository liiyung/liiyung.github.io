// external js: isotope.pkgd.js


// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

///////////////////////////// filter functions /////////////////////////////

// store filter for each group (multiple filters)
var filters = {};

  
// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}



// // bind filter button click
// $('#filters').on( 'click', 'button', function() {
//   var filterValue = $( this ).attr('data-filter');
//   // use filterFn if matches value
//   filterValue = filterFns[ filterValue ] || filterValue;
//   $grid.isotope({ filter: filterValue });
// });


// var A = $( this ).attr('data-filter');
// A = filterFns[ A ] || A;
// $grid.isotope({ filter: A });

// multiple filtering
$('#filters').on( 'click', '.button', function( event ) {
  // button that is just pressed
  var $button = $( event.currentTarget );
  // get group key. activate only buttons that have parent "button-group", with attribute "data-filter-"
  var $buttonGroup = $button.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group, based on which filterGroup
  filters[ filterGroup ] = $button.attr('data-filter');

  ///////////////////// uncertain from here //////////////////////
  // var A = filters[ filterGroup ]; 
  filters[ filterGroup ]  = filterFns [filters[ filterGroup ]] || filters[ filterGroup ];
  $grid.isotope({ filter: filters[ filterGroup ] });
  var filtercValue = concatValues( filters );

  // filtercValue = filterFns [ filters[ filterGroup ] ] ||  filters[ filterGroup ]
  // combine filters
  
  // value parsing filter
  // filterValue = filterFns[ filterValue ] || filterValue;
  // set filter for Isotope
  $grid.isotope({ filter: filtercValue });
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


// // change is-checked class on buttons (uncheck currently selected buttongroup, and check THIS buttongroup)
// $('.button-group').each( function( i, buttonGroup ) {
//   var $buttonGroup = $( buttonGroup );
//   $buttonGroup.on( 'click', 'button', function() {
//     $buttonGroup.find('.is-checked').removeClass('is-checked');
//     $( this ).addClass('is-checked');
//   });
// });


// // change is-checked class on buttons
// $('.button-group').each( function( i, buttonGroup ) {
//   var $buttonGroup = $( buttonGroup );
//   $buttonGroup.on( 'click', 'button', function( event ) {
//     $buttonGroup.find('.is-checked').removeClass('is-checked');
//     var $button = $( event.currentTarget );
//     $button.addClass('is-checked');
//   });
// });


// parsing filters
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};


// bind sort button click
$('#sorts').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  // sorting
  $grid.isotope({ sortBy: sortByValue });
});


