var http = require('http');

var urlencode = require('urlencode');


var sendMessage = function(res,next){

    var username = 'Sandeep';

    var hash = urlencode('NDM0NjQ5NjI1MTZiNGU1NTU1NGQ3NTRjNjY2YjQyMzk='); 

    var sender = urlencode('SENDER-NAME');

    var msg=encodeURIComponent("Hello World This is test message");

    var data = '/send?username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=918885450415'  + '&message=' +msg ;

    var options = {

      host: 'api.textlocal.in', path: data

    };

    callback = function (response) {

      var str = '';

    //   response.on('data', function (chunk) {

    //     str += chunk;

    //   });

    //   response.on('end', function () {

    //     // console.log(str);

        

    //   });

    }

    console.log(options);

    http.request(options, callback).end();

};

module.exports.sendMessage = sendMessage;