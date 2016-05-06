var userSchema = require('./schema/userSchema');
var sensorSchema = require('./schema/sensorSchema');

exports.registerUser = function (msg, callback) {

    var fullname = msg.fullname;
    var email = msg.email;
    var password = msg.password;

    var creditcard = msg.creditcard;
    var city = msg.city;
    var state = msg.state;
    var zipcode = msg.zipcode;
    var phone = msg.phone;

    console.log(fullname+" "+email+" "+password+" "+creditcard+" "+city+" "+state+" "+zipcode+" "+phone);

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
        callback(null, json_responses);
    });

}


exports.loginCheckUser = function (msg, callback) {
    var email = msg.email;
    var password = msg.password;

    userSchema.findOne({email: email, password: password}, function (err, users) {

        var json_resp;

        if (err) {
            console.log(err);
            json_resp = {"status" : 400};

        }

        else {
            if (users) {

                console.log('Login successful');
                json_resp = {"status": 200, "data":users.email};

            }
            else {
                console.log("No user found !");
                json_resp = {"status": 300};

            }
        }
        callback(null, json_resp);
    });

}

exports.listActiveSensors = function (msg, callback) {

    console.log('Rabbitmq listsensors');
    sensorSchema.find({status:true}, function (err, users) {

        var json_resp;


        if (err) {
            console.log(err);
            json_resp = {"status" : 400};

        }

        else {
                console.log("sensors found"+ JSON.stringify(users));

                json_resp = {"status": 200, "data":users};

        }
        callback(null, json_resp);
    });

}



