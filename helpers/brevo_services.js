const SibApiV3Sdk = require('sib-api-v3-sdk');


const sendOneEmail = async (nombre, email, telf)  => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  apiKey.apiKey = process.env.BREVO_API;

  sendSmtpEmail = {
    to: [{
      email: email,
      NOMBRE: nombre
    }],
    templateId: 1,
    params: {
      NOMBRE: nombre,
      email: email,
    },
    

    headers: {
      'api-key': process.env.BREVO_API,
      'Content-Type': 'application/json;', // This is important for sending attachments with
      'Accept': 'application/json;'
    }
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail).then, function (error) {
    // console.log(`error ${error}`);
  };

}




const createContactBrevo = async (nombre, correo, telf, listIds = [3, 2]) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  var createContact = new SibApiV3Sdk.CreateContact();
  var apiInstance = new SibApiV3Sdk.ContactsApi();
  apiKey.apiKey = process.env.BREVO_API;

  createContact.email = correo;
  createContact.attributes = {
    "NOMBRE": nombre,
    "SMS": telf,
  }

  createContact.listIds = listIds

  createContact.headers = {
    'api-key': process.env.BREVO_API,
    'Content-Type': 'application/json;', // This is important for sending attachments with
    'Accept': 'application/json;'
  }

  await apiInstance.createContact(createContact).then(function (data) {
    return 
  }, function (error) {
    console.log(error);
  });

}

module.exports = {

  createContactBrevo,
  sendOneEmail
}