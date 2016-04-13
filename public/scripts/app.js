angular.module('app',[])

angular.module('app')
  .controller('mainController',["$scope","$http", function($scope, $http){

     L.mapbox.accessToken = 'pk.eyJ1IjoibWF4d2VsbG8iLCJhIjoiY2ltc2Fma2UxMDFpb3ZsbTR2MjJvMmlwcCJ9.-czd-gCxko0qiczeOvUbig';

     var click = document.getElementById('click'),
         mousemove = document.getElementById('mousemove');

     var map = L.mapbox.map('map', 'mapbox.streets');

     map.on('mousemove click', function(e) {
       window[e.type].innerHTML = e.containerPoint.toString() + ', ' + e.latlng.toString();
       $scope.lat = e.latlng.lat
       $scope.lng = e.latlng.lng
       $scope.url = 'mapperdev.tomnod.com/chip_api/chip/lat/' + $scope.lat + '/lng/' + $scope.lng
     });

     //attempting to place marker on click so that user understands where current zoom is on the map
     map.on('click', addMarker);

    function addMarker(e){
      if (typeof circleMarker !== "undefined" ){
        map.removeLayer(circleMarker);
      }
      //add marker
      circleMarker = new L.circleMarker(e.latlng, {"radius":15}).addTo(map);;
    }
    
    //end of controller
  }])

  //custom directive that uses loading gif as tomnod image is being called.
  .directive("mySrc", function() {
    return {
      link: function(scope, element, attrs) {
        var img, loadImage;
        img = null;

        loadImage = function() {

          element[0].src = "./images/loading.gif";

          img = new Image();
          img.src = attrs.mySrc;

          img.onload = function() {
            element[0].src = attrs.mySrc;
          };
        };

        scope.$watch((function() {
          return attrs.mySrc;
        }), function(newVal, oldVal) {
          if (oldVal !== newVal) {
            loadImage();
          }
        });
      }
    };
  });
