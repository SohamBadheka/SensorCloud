
var Sensors = angular.module('Sensors', []);

Sensors.controller('addSensor', function($scope, $http) {

    $scope.addSensor = function() {
        alert($scope.name);
        $http({

            method : "POST",
            url : '/addSensorData',
            data : {
                "name" : $scope.name,
                "desc" : $scope.description,
                "owner": $scope.owner,
                "to"   : $scope.to,
                "from" : $scope.from,
                "type" : $scope.type,
                "format":$scope.format,
                "city" :$scope.city,
                "state" : $scope.state,
                "status":$scope.status
            }
        }).success(function(data) {
            //checking the response data for statusCode
            alert(JSON.stringify(data));
            if(data.status == 400){
                alert("something went wrong !");
            }

            else {
                //Making a get call to the '/redirectToHomepage' API
                window.location.assign("/sensorAdminDashboard");
            }
        }).error(function(error) {
            $scope.unexpected_error = false;
            $scope.invalid_login = true;
        });
    };
})

Sensors.controller('listSensors',function($scope, $http) {
   // $scope.btnclass = false;

    $scope.activate = function(name){
        $http({

            method : "POST",
            url : "/activateSensor",
            data : {
                "name" : name
            }

        }).success(function(data){

        })
    }
    $http({

        method: "GET",
        url: '/listSensors'

    }).success(function (data) {
        //checking the response data for statusCode
        alert(JSON.stringify(data));
        if (data.status == 400) {
            alert("something went wrong !");
        }
        else if (data.status == 300) {
            alert(data);
        }
        else {

            for(i =0 ; i<data.data.length; i++) {
                if (data.data[i].status == false) {

                    data.data[i].status = "activate";
                    $scope.btnclass = false;
                }
                else {
                    data.data[i].status = "deactivate";
                    $scope.btnclass = true;
                }

            }
            $scope.sensorInfo = data.data;

        }
   })
})