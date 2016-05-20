var path = require('path');
var EmailTemplate = require('email-templates').EmailTemplate;
var nodemailer = require('nodemailer');


var templatesDir = path.resolve(__dirname, '..', 'templates');
var template;

// Prepare nodemailer transport object
var transporter = nodemailer.createTransport( {
    service:  'Mailgun',
    auth: {
     user: 'postmaster@sandboxce4801df512340a4b847a62197469bb2.mailgun.org',
     pass: '93e52d04b2459f01ca04b5f1589406cd'   
    },
    tls: {
      ciphers: 'SSLv3'
    }
});

// An example users object with formatted email function
/*
var locals = {
  email: 'aaroncollyer@gmail.com',
  name: {
    first: 'Mamma',
    last: 'Mia'
  }
}
*/


exports.send = function(data, templateName) {
  return new Promise(function(resolve, reject){

    template = new EmailTemplate(path.join(templatesDir, templateName));
    
    // Send a single email
    template.render(data, function (err, results) {

      if (err) {
        console.log("error 1");
        reject(err);
      }

      transporter.sendMail({
        from: 'GA Update <handicap.update@gmail.com>',
        to: data.email,
        subject: results.subject,
        html: results.html,
        text: results.text
      }, function (err, responseStatus) {
        if (err) {
          console.log("error 2");
          reject(err);
        } else {
          resolve(responseStatus.response);
        }
      })
    })

  });


}

