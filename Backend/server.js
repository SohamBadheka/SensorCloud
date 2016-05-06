var amqp = require('amqp'), util = require('util');

var sensorAdmin = require('./services/sensors');
//var endUser = require('./services/endUser');
//var billing = require('./services/billing');

var cnn = amqp.createConnection({
    host : '127.0.0.1'
});

var mongoose = require('mongoose');
//var options = {
//	server: { poolSize: 5 }
//};
var connection = mongoose.connect("mongodb://localhost:27017/sensorCloud");

cnn.on('ready', function() {
    console.log("listening on sensorAdmin_queue");

    cnn.queue('sensorAdmin_queue', function (q) {
        console.log("queue");
        q.subscribe(function (message, headers, deliveryInfo, m) {
            console.log("sub");
            util.log("sensorAdmin_queue: ");
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

            switch (message.func) {
                case "loginCheckSensorAdmin":
                    console.log('login sensor admin');
                    sensorAdmin.loginSensorAdmin(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "addSensorData":
                    console.log('add sensor data');
                    sensorAdmin.addSensorData(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;
                case "listSensors":
                    console.log('List sensor data');
                    sensorAdmin.listSensors(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;
                case "activateSensor":
                    console.log('Activate sensor');
                    sensorAdmin.activateSensor(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "deleteSensor":
                    sensorAdmin.deleteSensor(message, function(err, res){
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "approveCustomer":
                    sensorAdmin.approveCustomer(message, function(err, res){
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
            }
        });
    });
});
