var apiai = require('apiai');
var request = require('request');

var PAGE_ACCESS_TOKEN="EAAJ94KKZCT1IBAMWoxJApEeFwa6YjpEMQ5v4IPbeyKPcPdjMeZBDUqfEAE5isxj9xPb6ErpEaK00qEN7LRDzV3qQITldIOZCb4t6FKQdYncD6a2gfCYhZAVLSmaE48UJ5CgssU4UdcJpbBVZBCA8jGYAhCyGkZCtjzS2BYDZC5xLQZDZD";
var app = apiai("dbdf3c0e3afb40b0a2d1fbb805d0976c");
module.exports=function(requestText,session){
  var requestapi = app.textRequest(requestText, {
    sessionId: session
  });

  requestapi.on('response', function(response) {
      console.log(response);
      var messageData = {
        recipient: {
          id: session
        },
        message: {
          text: response.result.fulfillment.speech;
        }
      };
      callSendAPI(messageData);
  });

  requestapi.on('error', function(error) {
      console.log(error);
  });
  requestapi.end();

}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}
