
exports.loginSensorAdmin = function(req, res){
    res.render('loginSensorAdmin');
}
exports.loginCheckSensorAdmin = function(req, res){
    var username = req.param("username");
    var password = req.param("password");
    console.log(username+" "+password);
    if(username == "admin" && password == "admin") {
        res.send();
    }
    else {
        json_response = {"status" : 300};
        res.send(json_response);
    }
}

var sensorSchema = require('./schema/userSchema');
exports.addSensorData = function(req, res){


        var name = req.param('name');
        var desc = req.param('desc');
        var owner = req.param('owner');
        var to = req.param("to");
        var from = req.param("from");
        var type = req.param("type");
        var format = req.param("format");
        var city = req.param("city");
        var state = req.param("state");
        var country = req.param("coutry");
        var status = req.param("status");


        var sensorData = new addSensorData({

            name : name,
            desc : desc,
            owner : owner,
            to : to,
            from : from,
            type : type,
            format : format,
            city : city,
            state : state,
            coutry : country,
            status : status

        });

        sensorData.save(function(err) {
            var json_responses;
            if (err) {
                console.log(err);
                json_responses = { "status" : 400};
            }

            else {
                console.log('New sensor added !');

                json_responses = {"status" : 200};

            }
            res.send(json_responses);
        });
    }
exports.sensorAdminDashboard = function(req, res){
    res.render('sensorAdminDashboard');
}
exports.testSensor = function(req, res) {
    var request = require('request');
    request('http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=f17460fa055c8a087eb18ff9b451dc57', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    });
}


