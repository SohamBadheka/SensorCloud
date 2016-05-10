

var mq_client = require('../rpc/client');

exports.loginSensorAdmin = function(req, res){
    res.render('loginSensorAdmin');

}
exports.sensorAdminDashboard = function(req, res){
    res.render('sensorAdminDashboard');
}

exports.loginCheckSensorAdmin = function(req, res) {
    var username = req.param("username");
    var password = req.param("password");


    var msg_payload = {
        "username": username,
        "password": password,
        "func": "loginCheckSensorAdmin"
    };

    console.log(msg_payload);
    mq_client.make_request('sensorAdmin_queue', msg_payload, function (err, results) {
        console.log("results response "+JSON.stringify(results));
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        }
        else {
            if(results.status == 200) {
                //console.log("about results" + JSON.stringify(results));
                req.session.sensorAdmin = results.data;
                //console.log("login " + req.session.adminId);
                json_response = {"status": 200, "data": results.data}
                res.send(json_response);
            }
            else
            {
                json_response = {"status" : 300}
                res.send(json_response);
            }
        }
    });
};


exports.addSensorData = function(req, res) {


    var name = req.param('name');
    var desc = req.param('desc');
    var owner = req.param('owner');
    var to = req.param("to");
    var from = req.param("from");
    var type = req.param("type");
    var format = req.param("format");
    var city = req.param("city");
    var state = req.param("state");

    //console.log(name + " " + desc + " " + owner + " " + to + " " + from + " " + type + " " + format + " " + city + " " + state + " " + status);

    var msg_payload = {
        "name": name,
        "desc": desc,
        "owner": owner,
        "to": to,
        "from": from,
        "type": type,
        "format": format,
        "city": city,
        "state": state,

        "func": "addSensorData"
    };

    console.log(msg_payload);
    mq_client.make_request('sensorAdmin_queue', msg_payload, function (err, results) {
        console.log("results response " + JSON.stringify(results));
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        }
        else {
            if (results.status == 200) {
                //console.log("about results" + JSON.stringify(results));
                json_response = {"status": 200, "data": results.data}
                res.send(json_response);
            }
            else {
                json_response = {"status": 300}
                res.send(json_response);
            }

        }
    });
}


exports.listSensors = function(req, res){

    var name = req.name;
    var msg_payload = {
        "func" : "listSensors",
        "name" : name
    }
    mq_client.make_request('sensorAdmin_queue', msg_payload, function (err, results) {
        console.log("results response " + JSON.stringify(results));
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        }
        else {
            if (results.status == 200) {
                //console.log("about results" + JSON.stringify(results));
                json_response = {"status": 200, "data": results.data}
                res.send(json_response);
            }
            else {
                json_response = {"status": 300}
                res.send(json_response);
            }

        }


    });
}

exports.activateSensor = function(req, res){

    var name = req.param('name');
    var msg_payload = {

        "func": "activateSensor",
        "name": name
    }
    mq_client.make_request('sensorAdmin_queue', msg_payload, function (err, results) {
        console.log("--------- results response ---------" + JSON.stringify(results));
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        }
        else {
            if (results.status == 200) {
                //console.log("about results" + JSON.stringify(results));
                json_response = {"status": 200, "data": results.data}
                res.send(json_response);
            }
            else {
                json_response = {"status": 300}
                res.send(json_response);
            }

        }


    });
}

exports.deactivateSensor = function(req, res){

    var name = req.param('name');
    var msg_payload = {

        "func": "deactivateSensor",
        "name": name
    }
    mq_client.make_request('sensorAdmin_queue', msg_payload, function (err, results) {
        console.log("results response " + JSON.stringify(results));
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        }
        else {
            if (results.status == 200) {
                //console.log("about results" + JSON.stringify(results));
                json_response = {"status": 200, "data": results.data}
                res.send(json_response);
            }
            else {
                json_response = {"status": 300}
                res.send(json_response);
            }

        }


    });
}


exports.getCurrentData = function(req, res) {
    var type = req.type;
    var city = req.city;
    var request = require('request');
    var r = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=f17460fa055c8a087eb18ff9b451dc57";
    request(r, function (error, response, body) {
        //console.log("before condition"+body);
        console.log("get current data Response "+response.statusCode+" and  body " +body);
        if (!error && response.statusCode == 200) {
            console.log(body);

            res.send(body);
        }
        else{
            var json_response = {"status":400};
            res.send(json_response);

        }
    });
}

exports.getForecastData = function(req, res) {
    var type = req.type;
    var city = req.city;

    var request = require('request');
    var r = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=f17460fa055c8a087eb18ff9b451dc57";

    request(r, function (error, response, body) {
        //console.log("before condition"+body);
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
        else{
            var json_response = {"status":400};
            res.send(json_response);

        }
    });
}

