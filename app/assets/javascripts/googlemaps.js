"http://maps.googleapis.com/maps/api/js"

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(42.3518161,-71.0611098),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


// How to make this data pass autmatically from the controller to the javascript??
 var newMapData = {"id":1,"name":"\n    \n    Falta de agua\n  ","created_at":"2015-10-07T22:33:33.302Z","updated_at":"2015-10-07T22:33:33.302Z","latitude":"42.3518161","longitude":"-71.0611098"}
 var LatLong = {lat: parseFloat(newMapData["latitude"]), lng: parseFloat(newMapData["longitude"])};
 var nameOfProblem = newMapData["name"];

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

}
google.maps.event.addDomListener(window, 'load', initialize);
