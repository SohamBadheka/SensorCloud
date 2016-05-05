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



  var newUser = new userSchema({

    fullname : fullname,
    email : email,
    password : password,
    creditcard : creditcard,
    city : city,
    state : state,
    zipcode : zipcode,
    phone : phone
  });

  newUser.save(function(err) {
    var json_responses;
    if (err) {
      console.log(err);
      json_responses = { "status" : 400};
    }

    else {
      console.log('New User created!');

      json_responses = {"status" : 200};

    }
    res.send(json_responses);
  });
}

exports.loginUser = function(req, res){

  res.render('loginUser');
}

exports.loginCheckUser = function (req, res) {
  var email = req.param('email');
  var password = req.param('password');


  console.log("Values : " + email + " " + password);
  userSchema.findOne({email: email, password: password}, function (err, users) {


    console.log("inside");
    var json_responses;
    if (err) {
      console.log(err);
      json_responses = {"status": 400};
      res.send(json_responses);
    }

    else {
      if (users) {
        req.session.email = email;
        console.log('Login successful');
        json_responses = {"status": 200};
        res.send(json_responses);
      }
      else {
        console.log("No user found !");
        json_responses = {"status": 300};
        res.send(json_responses);
      }
    }

  });
}


exports.userDashboard = function(req, res){
  res.render('userDashboard');
};

exports.mySesnors = function(req, res){
  res.render('');
}