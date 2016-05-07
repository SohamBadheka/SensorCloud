
var listActiveSensors = angular.module('listActiveSensors', []);

listActiveSensors.controller('listActiveSensors', function($scope, $http) {

    $http({

        method: "GET",
        url: '/listActiveSensors'

    }).success(function (data) {

        if (data.status == 400) {
            alert("something went wrong !");
        }

        else {
            for (i = 0; i < data.data.length; i++) {
                if (data.data[i].status == false) {


                    data.data[i].status = "subscribe";
                }
                else {
                    data.data[i].status = "unsubscribe";

                }

            }
            $scope.sensors = data.data;
        }

    }).error(function (error) {
        alert('error');
    });


    $scope.activity = function (name, status) {

        if (status == "subscribe") {
            $http({

                method: "POST",
                url: "/subscribeSensor",
                data: {
                    "name": name
                }

            }).success(function (data) {

            })
        }
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

