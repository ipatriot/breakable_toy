"http://maps.googleapis.com/maps/api/js"

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(48.8567,2.3508),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

}
google.maps.event.addDomListener(window, 'load', initialize);
