!function(a){"use strict";a(document).ready(function(){var e=jQuery("#map-canvas"),o=e.data("map-icon"),t=e.data("map-latitute"),n=e.data("map-longitude"),p=e.data("map-zoom");e.data("map-color");a("#map-canvas").length&&google.maps.event.addDomListener(window,"load",function(){var a={center:new google.maps.LatLng(t,n),zoom:p,styles:[{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#65ac4c"}]}],scrollwheel:!1,backgroundColor:"transparent",mapTypeControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP},e=new google.maps.Map(document.getElementById("map-canvas"),a),m=new google.maps.LatLng(t,n);new google.maps.Marker({position:m,map:e,icon:o})})})}(jQuery);