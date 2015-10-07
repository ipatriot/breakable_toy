
$('.radio_button').on("click", function(event) {
  problem = $(this).text()
  geoFindMe(problem)
});


function geoFindMe(problem) {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
      method: "POST",
      url: ("/problems"),
      data: { "problem": { name: problem, latitude: latitude, longitude: longitude } },
      dataType: "json"
    })
    window.location.href = "/";

    // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
