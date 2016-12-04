function keywordSearch(e){
  if(e.which == 13) {
     //window.location.replace(window.location.href+"searchResult");
     var _keyword = $('input[name=keyword]').val();
     _keyword=(JSON.stringify(_keyword));
     //TODO send this query to the server
 }
}

function filterSearch(){
  //window.location.replace(window.location.href+"filterSearchResult");
  var _tasteType = "";
  $('input[name=tasteType]:checked').each(function(){
    _tasteType = _tasteType + ", " + $(this).val();
  });
  var _foodType = "";
  $('input[name=foodType]:checked').each(function(){
    _foodType = _foodType + ", " + $(this).val();
  });
  var _sauceType = "";
  $('input[name=sauceType]:checked').each(function(){
    _sauceType = _sauceType + ", " + $(this).val();
  });
  var _without = "";
  $('input[name=without]:checked').each(function(){
    _without = _without + ", " + $(this).val();
  });

  var filterOptions = {
    restaurantId: $('select[name=restaurant]').val(),
    deliveryTime: $('select[name=deliverySpeed]').val(),
    offeredTime: $('select[name=offeredTime]').val(),
    cuisine: $('select[name=cuisine]').val(),
    tasteType: _tasteType.substring(2),
    foodType: _foodType.substring(2),
    sauceType:  _sauceType.substring(2),
    without:  _without.substring(2)
  }
  //TODO send this json to the server

  var urlEncoded = $.param(filterOptions);

  window.location.href="/filter_search?"+urlEncoded;

}
