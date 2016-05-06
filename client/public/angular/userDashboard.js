
var listActiveSensors = angular.module('listActiveSensors', []);

listActiveSensors.controller('listActiveSensors', function($scope, $http) {
    alert('one');

   /* $http({

        method: "GET",
        url: '/listActiveSensors'

    }).success(function (data) {
            alert("yeads");


            if(data.status == 400){
                alert("something went wrong !");
            }

            else {
                $scope.sensors = data.data;
            }
        }).error(function(err){
            alert('error');
        });
});*/

$http({

    method: "GET",
    url: '/listActiveSensors'

}).success(function (data) {
    //checking the response data for statusCode
    alert(JSON.stringify(data));
    if (data.status == 400) {
        alert("something went wrong !");
    }

    else {

        $scope.sensors = data.data;

    }
}).error(function (error) {
    alert('error');
})
})