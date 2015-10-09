"http://maps.googleapis.com/maps/api/js"

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(42.3518161,-71.0611098),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var geocoder = new google.maps.Geocoder;
  var infoWindow = new google.maps.InfoWindow;

  pathName = window.location.pathname;

  $.ajax({
    url: pathName,
    method: 'GET',
    dataType: 'json'
  })
  .done(function(problem){
   geocodeLatLng(geocoder, map, infoWindow, problem);
 });
}
google.maps.event.addDomListener(window, 'load', initialize);

function geocodeLatLng(geocoder, map, infowindow, problem) {
   var latlng = {lat: parseFloat(problem.latitude), lng: parseFloat(problem.longitude)};
   geocoder.geocode({'location': latlng}, function(results, status) {
     if (status === google.maps.GeocoderStatus.OK) {
       if (results[1]) {
         map.setZoom(14);
         var marker = new google.maps.Marker({
           position: latlng,
           map: map
         });
           debugger;
         infowindow.setContent("Problema: " + problem.name + ", Dirección: " + results[0].formatted_address);
         infowindow.open(map, marker);
        //  ajax call to send the address to the controller!

         $.ajax({
           method: "PATCH",
           url: ("/problems"),
           data: { "problem": { address: results[0].formatted_address } },
           dataType: "json"
         })

       } else {
         window.alert('No results found');
       }
     } else {
       window.alert('Geocoder failed due to: ' + status);
     }
   });
 }

 // $.ajax({
 //   method: "POST",
 //   url: ("/problems"),
 //   data:{}
 // })
