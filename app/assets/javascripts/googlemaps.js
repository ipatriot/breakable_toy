"http://maps.googleapis.com/maps/api/js"

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(42.3518161,-71.0611098),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

  pathName = window.location.pathname;


  $.ajax({
    url: pathName,
    method: 'GET',
    dataType: 'json'
  }).done(function(problem){

   var problem = problem;

   var LatLong = {lat: parseFloat(problem.latitude), lng: parseFloat(problem.longitude)};
   var nameOfProblem = problem.name;

    var marker = new google.maps.Marker({
     position: LatLong,
     map: map,
     title: nameOfProblem
    });
   marker.addListener('click', function() {
     infowindow.open(map, marker);
   });

   var infowindow = new google.maps.InfoWindow({
     content: nameOfProblem
   });
 })
}
google.maps.event.addDomListener(window, 'load', initialize);
