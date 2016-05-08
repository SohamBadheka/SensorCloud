
var listActiveSensors = angular.module('listActiveSensors', []);

listActiveSensors.controller('listActiveSensors', function($scope, $http) {

    $http({

        method: "GET",
        url: '/listToSubscribeSensors'

    }).success(function (data) {

        $scope.sensors = data.data;
        alert(JSON.stringify(data));

    }).error(function (error) {
        alert('error');
    });
$scope.subscribebtn = "subscribe";

    $scope.subscribe = function (name) {

        $scope.subscribebtn = "unsubscribe";

            $http({

                method: "POST",
                url: "/subscribeSensor",
                data: {
                    "name": name
                }

            }).success(function (data) {

                $http({

                    method: "GET",
                    url: '/mySensors'

                }).success(function (data) {


                    if (data.status == 400) {
                        alert("something went wrong !");
                    }

                    else {

                        $scope.mySensors = data.data;
                    }

                }).error(function (error) {
                    alert('error');
                });

                $scope.sensors = data.data;

            })

    }
});


listActiveSensors.controller('mySensors', function($scope, $http) {

    $http({

        method: "GET",
        url: '/mySensors'

    }).success(function (data) {


        if (data.status == 400) {
            alert("something went wrong !");
        }

        else {

            $scope.mySensors = data.data;
        }

    }).error(function (error) {
        alert('error');
    });


});


listActiveSensors.controller('analysis', function($scope, $http) {

    $scope.myValue = false;
    $http({

        method: "GET",
        url: '/mySensors'

    }).success(function (data) {


        if (data.status == 400) {
            alert("something went wrong !");
        }

        else {

            $scope.sensors = data.data;
        }

    }).error(function (error) {
        alert('error');
    });
    $scope.getCurrentData = function (type, city) {
        $scope.myValue = true;

        alert(type+" "+city);
        $http({

            method: "GET",
            url: '/getCurrentData',
            params:{
                "type" : type,
                "city" : city
            }

        }).success(function (data) {

            alert("Main thing is "+data.weather[0].main+" Temp is "+data.main);
            if (data.status == 400) {
                alert("something went wrong !");
            }

            else {

                $scope.weather = data.weather[0].main;
                $scope.temp = data.main.temp;
                $scope.maxTemp = data.main.temp_min;
                $scope.minTemp = data.main.temp_max;
                $scope.pressure = data.main.pressure;
                $scope.humidity = data.main.humidity;

            }
        });
  }
});


