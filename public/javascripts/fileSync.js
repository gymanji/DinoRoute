/**
 * Created by Zach on 1/4/15.
 */

var fs = require('fs');
var path = "//DinoRoute/DinoRoute/text.log";
var options = {encoding: 'utf8', flag: 'r'};

fs.readFile(path, options, function(err, data) {
   if (err) {
       return console.log(err);
   }
    var parsed = JSON.parse(data);
    console.log(parsed.Message);
    console.log(parsed.Key);
});