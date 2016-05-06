var mq_client = require('../rpc/client');

exports.signupUser = function(req, res){

  res.render('signup');
}

//var userSchema = require('./.././userSchema');

exports.registerUser = function(req, res){

  var fullname = req.param('fullName');
  var email = req.param('email');
  var password = req.param('password');
  var creditcard = req.param('creditcard');
  var city = req.param('city');
  var state = req.param('state');
  var zipcode = req.param('zipcode');
  var phone = req.param('phone');

console.log(fullname+" "+email+" "+password+" "+creditcard+" "+city+" "+state+" "+zipcode+" "+phone);
  var msg_payload = {
    "fullname": fullname,
    "email": email,
    "password": password,
    "creditcard": creditcard,
    "city": city,
    "state": state,
    "zipcode": zipcode,
    "phone": phone,
    "func": "registerUser"
  };

  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {
    console.log("results response "+JSON.stringify(results));
    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if(results.status == 200) {

        json_response = {"status": 200, "data": results.data}
        res.send(json_response);
      }
      else
      {
        json_response = {"status" : 400}
        res.send(json_response);
      }
    }
  });
}

exports.loginUser = function(req, res){

  res.render('loginUser');
}

exports.loginCheckUser = function (req, res) {
  var email = req.param("email");
  var password = req.param("password");


  var msg_payload = {
    "email": email,
    "password": password,
    "func": "loginCheckUser"
  };


  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {

    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if(results.status == 200) {
        //console.log("about results" + JSON.stringify(results));
        req.session.endUser = results.data;
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
}
exports.listActiveSensors = function(req, res){

  var msg_payload = {
    "func": "listActiveSensors"
  }
  mq_client.make_request("endUser_queue", msg_payload, function(err, results){
    //console.log(JSON.stringify("aayu "+JSON.stringify(results.data)));
    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {

      //console.log("about results" + JSON.stringify(results));
      json_response = {"status": 200, "data": results.data};
      console.log("sending "+JSON.stringify(json_response));
      res.send(json_response);

    }
  });
}

exports.userDashboard = function(req, res){
  res.render('userDashboard');
};

exports.mySesnors = function(req, res){
  res.render('');
}