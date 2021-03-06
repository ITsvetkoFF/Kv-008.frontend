define(['./module'],function (controllers){
    'use strict';
    controllers.controller('addProblemCtrl', function ($scope,$rootScope,$window,$routeParams,$location,$route,windowWidth,ProblemService,FileUploader,CONSTANTS){
        $scope.tabs = [
            {heading: "Точка", icon: "fa fa-map-marker", content: "app/templates/addMarker.html", active: true},
            {heading: "Опис", icon: "fa fa-info-circle", content: "app/templates/addInfo.html", active: false},
            {heading: "Фото", icon: "fa fa-file-photo-o", content: "app/templates/addPhotos.html", active: false}
        ];
        $scope.fileSizeLeft = 20;
        $scope.fileCountLeft = 10;
        $scope.active = function() {
            return $scope.tabs.filter(function(tab){
                return tab.active;
            })[0].heading;
        };

        $scope.getWindowDimensions = windowWidth.getWindowDimensions;
        var width = $scope.getWindowDimensions();

        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
            if (newValue > 1000) {
                $rootScope.style = function () {
                    return { 
                        'height': 'calc (100% - 52px);'
                    };
                };
            } else {
                $rootScope.style = function () {
                    return { 
                        'height': 'auto',
                        'padding-bottom' : '0'
                    };
                };
            }
        });

        $scope.$watch($scope.active, function (newValue, oldValue) {
            width = $scope.getWindowDimensions();
            if (width <= 1000) {
                if (newValue == "Точка") {
                    $rootScope.style = function () {
                        return { 
                            'height': 'auto',
                            'padding-bottom' : '0'
                        };
                    };
                } else {
                    $rootScope.style = function () {
                        return { 
                            'height': 'calc (100% - 52px);'
                        };
                    };
                }
            } else {
                $rootScope.style = function () {
                    return { 
                        'height': 'calc (100% - 52px);'
                    };
                };
            }
        });

        $scope.problemData = {
            title: "",
            content: "",
            proposal: "",
            latitude: "",
            longitude: "",
            type: ""
        };

        $scope.requiredData = function() {
            if ($scope.problemData.title == "" || $scope.problemData.type == "" || $scope.problemData.latitude == "" || $scope.problemData.longitude == "") {
                return true;
            }
        };

        $rootScope.$broadcast('Update',"_problem");
        //function that places marker on the map
        function getCoordinates(e) {
            $scope.$apply(function(){$scope.problemData.latitude = e.latlng.lat;});        // binds latln values to the input on the form
            $scope.$apply(function(){$scope.problemData.longitude = e.latlng.lng;});

            var tempMarker = L.marker(e.latlng, {draggable: true}).on('drag', function(e) { // onDrag listener for Marker that binds lat & lng values to the input on the form
                $scope.$apply(function() { 
                    $scope.latitude = e.target._latlng.lat;
                }); 
                $scope.$apply(function() { 
                    $scope.longitude = e.target._latlng.lng;
                }); 
            });
                        
                     
            $scope.geoJson.addLayer(tempMarker);                               // adding marker to the map
                                
            $rootScope.tempMarker = tempMarker;
            
            $scope.clearGetCoordinatesListener();                              // disable onMapClickListener that binds eventListener "click" & function that places marker on the map
        }

        $scope.clearGetCoordinatesListener = function() {                      // function with disabling onMapClickListener functionality
            $scope.geoJson.off('click', getCoordinates);
        };

        $scope.geoJson.on('click', getCoordinates); // enable onMapClickListener that binds eventListener "click" & function that places marker on the map

        $scope.showRegFormButtonClick = function () {
            $scope.showRegForm = true;
        };
        //file uploader for photo
        $scope.uploader = new FileUploader({
            withCredentials: true,
            alias: 'photos'
        });
        $scope.uploadPhoto = function() {
            ProblemService.postProblemToDb(
                $scope.problemData.title,
                $scope.problemData.content,
                $scope.problemData.proposal,
                $scope.problemData.latitude,
                $scope.problemData.longitude,
                $scope.problemData.type
            ).success(function(data) {
                $scope.uploader.onBeforeUploadItem = function (item) {
                    if (!$scope.uploader.getNotUploadedItems().length) {
                        $scope.itemValid = false;
                    } else {
                        $scope.itemValid = true;
                        item.url = CONSTANTS.API_URL + 'problems/' + data.id + '/photos';
                        item.formData.push({"comments": item.comments});
                    }
                };
                if ($scope.itemValid) {
                    $scope.uploader.uploadAll();
                }
                $location.path('problem/showProblem/'+data.id);
                $route.reload();
            });
        };

        $scope.$on('$routeChangeStart', function(event, next) { 
            $scope.clearGetCoordinatesListener();
        });

    });
});
