"http://maps.googleapis.com/maps/api/js"

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(48.8567,2.3508),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


    var marker = new google.maps.Marker({
     position: {lat: 48.8567, lng: 2.3508},
     map: map,
     title: 'You are here'
    });
   marker.addListener('click', function() {
     infowindow.open(map, marker);
   });

   var infowindow = new google.maps.InfoWindow({
     content: 'You are here!'
   });

}
google.maps.event.addDomListener(window, 'load', initialize);
