/**
 * Imports Twilio node library and passes in user variables for custom message.
 */

var DinoMessage = module.exports = {

    sendMessage: function(body, to) {

        var client = require('twilio')();

        client.sms.messages.create({
            body: body,
            to: to,
            from: "+12019571381"
        }, function(err, message) {
            process.stdout.write(message.sid);
            console.log(err);
        });
    }
}

