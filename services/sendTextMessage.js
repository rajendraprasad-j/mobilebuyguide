var PAGE_ACCESS_TOKEN="EAAJ94KKZCT1IBAMWoxJApEeFwa6YjpEMQ5v4IPbeyKPcPdjMeZBDUqfEAE5isxj9xPb6ErpEaK00qEN7LRDzV3qQITldIOZCb4t6FKQdYncD6a2gfCYhZAVLSmaE48UJ5CgssU4UdcJpbBVZBCA8jGYAhCyGkZCtjzS2BYDZC5xLQZDZD";
module.exports=function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
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
