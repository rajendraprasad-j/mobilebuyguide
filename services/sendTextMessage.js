var callSendAPI=require("./api.ai")

module.exports=function sendTextMessage(recipientId, messageText) {
  callSendAPI(recipientId,messageText);
}
