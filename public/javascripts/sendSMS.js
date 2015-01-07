/**
 * Created by Zach on 1/6/15.
 */

var SMSconfig = require('../../SMSconfig.log');
var accountSid = SMSconfig.accountSid;
var authToken = SMSconfig.authToken;

var client = require('twilio')(accountSid, authToken);

client.sms.messages.create({
    body: "you smell like soot and poo",
    to: "+13043764884",
    from: SMSconfig.sender
}, function(err, message) {
    process.stdout.write(message.sid);
    console.log(err);
});