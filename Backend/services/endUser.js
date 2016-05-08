var userSchema = require('./schema/userSchema');
var sensorSchema = require('./schema/sensorSchema');
var subscribeSensorSchema = require('./schema/subscribeSensorSchema');

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
exports.subscribeSensor = function (msg, callback) {

    var email = msg.email;
    var name = msg.name;
    console.log("jordar data is "+email+" "+name);


    sensorSchema.find({name:name}, function (err, users) {
        var json_resp;

        var result = users;
        console.log("Specific info of sensor "+result);

            if(users) {
                    userSchema.update({email: email}, {$push : {subscribedSensors:{$each: result}}}, function (err, users2) {


                    if (err) {
                        console.log(err);
                        json_resp = {"status": 400};

                    }

                    else {
                        sensorSchema.find({"status":true},function(err, users){
                            if(users) {

                                console.log("sensors found" + JSON.stringify(users));

                                json_resp = {"status": 200, "data": users};
                            }
                            callback(null, json_resp);
                        })

                    }

                });
            }

            else{

                console.log("nothing found ! ");

            }

        });

}

exports.listToSubscribeSensors = function(msg, callback) {

    var email = msg.email;
    console.log("we got the mail " + email);

    sensorSchema.find({"status":true}, function (err, users) {
        var json_resp;

        var result = users;
        console.log("av avaa "+result);

        if(users) {

            json_resp = {"status": 200, "data": users};
        }

        else {
               console.log("not found");

            }
                callback(null, json_resp);
            });
        }

    /*userSchema.find({"email": email}, function (err, users) {
        var json_response;
        var result = users[0].subscribedSensors[0];

        console.log("the sensor to be deleted ! " + users + " " + result.name);

        subscribeSensorSchema.find({}, function (err, user) {
            console.log("user here " + JSON.stringify(user));
            json_response = {"status": 200, "data": user}
            callback(null, json_response);
        });
    }); */

        /* subscribeSensorSchema.remove({"name" : result.name},function(err, rlt){
            if(err){
                console.log("error deleting the sensor");
            }
            else{

                    subscribeSensorSchema.find({}, function(err, users) {

                        console.log("here "+users);
                        if (err)
                            json_response = {"status": 400};
                        else {
                            if (users) {

                                console.log("printinng deleted data " + users);
                                json_response = {"status": 200, "data": users}
                            }

                            else
                                json_response = {"status": 300};
                        }

                        callback(null, json_response);

                    });
            }

            })*/



exports.mySensors = function(msg, callback) {

    var email = msg.email;
    console.log("-------In my sensor---------- "+email);
    userSchema.find({"email": email}, function (err, users) {
        var json_response;
        console.log("In sensor response "+JSON.stringify(users[0].subscribedSensors));
        if (err)
            json_response = {"status": 400};
        else {
            if (users)
                json_response = {"status": 200, "data": users[0].subscribedSensors};
            else
                json_response = {"status": 300};
        }
        callback(null, json_response);
    });
}





