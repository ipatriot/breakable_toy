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
   geocodeLatLng(geocoder, map, infoWindow, problem, pathName);
 });
}
google.maps.event.addDomListener(window, 'load', initialize);

function geocodeLatLng(geocoder, map, infowindow, problem, pathName) {
   var latlng = {lat: parseFloat(problem.latitude), lng: parseFloat(problem.longitude)};
   geocoder.geocode({'location': latlng}, function(results, status) {
     if (status === google.maps.GeocoderStatus.OK) {
       if (results[1]) {
         map.setZoom(14);
         var marker = new google.maps.Marker({
           position: latlng,
           map: map
         });
         var address = results[0].formatted_address
         infowindow.setContent("Problema: " + problem.name + ", Dirección: " + results[0].formatted_address);
         infowindow.open(map, marker);
        //  ajax call to send the address to the controller!
        pathName;
        var test = pathName.split("/");
        test.pop();
        var path = test.join("/");



        $('#problem_address').val(results[0].formatted_address);


        var geotag_location_address = results[0].formatted_address;

        $('.confirm_address').on("click", function(event) {
        var search_box_address = $('#problem_address').val();
          if (geotag_location_address == search_box_address) {
             $.ajax({
               method: "PATCH",
               url: path,
               data: { "problem": { address: results[0].formatted_address } },
               dataType: "json"
             })
          } else if (geotag_location_address != search_box_address) {
        
            geocodeAddress(geocoder, map, search_box_address, infowindow, pathName);
          }
        });


       } else {
         window.alert('No results found');
       }
     } else {
       window.alert('Geocoder failed due to: ' + status);
     }
   });
 }


 function geocodeAddress(geocoder, resultsMap, address, infoWindow, pathName) {
   geocoder.geocode({'address': address}, function(results, status) {
     if (status === google.maps.GeocoderStatus.OK) {
       resultsMap.setCenter(results[0].geometry.location);
       var marker = new google.maps.Marker({
         map: resultsMap,
         position: results[0].geometry.location
       });

       pathName;
       var test = pathName.split("/");
       test.pop();
       var path = test.join("/");

       $.ajax({
         method: "PATCH",
         url: path,
         data: { "problem": { latitude: results[0].geometry.location.J, longitude: results[0].geometry.location.M, address: results[0].formatted_address } },
         dataType: "json"
       })

     } else {
       alert('Geocode was not successful for the following reason: ' + status);
     }
   });
 }
