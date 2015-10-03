
define(
    [
        'async',
        'nodemailer'
    ], 
    function (async, nodemailer) {

        // create reusable transporter object using SMTP transport 
        var transporter = nodemailer.createTransport({
            // service: 'Gmail',

            host: "smtpout.secureserver.net", // hostname
            secureConnection: false, // use SSL
            port: 25, // port for secure SMTP
            auth: {
                user: 'noreply@myapp.org',
                pass: 'noreply_myapp'
            }
        });
        // NB! No need to recreate the transporter object. You can use 
        // the same transporter object for all e-mails 

        function sendEmail(senderEmail, receiverEmail, ccEmail, subject, text, callback){

            // setup e-mail data with unicode symbols 
            var mailOptions = {
                from: senderEmail, // sender address 
                to: receiverEmail, // list of receivers 
                cc: ccEmail,
                subject: subject, // Subject line 
                //text: text, // plaintext body 
                html: text // html body 
            };
             
            // send mail with defined transport object 
            transporter.sendMail(mailOptions, function(err, info){
                if(err){
                    var resultData = {
                        message: 'Error in sendEmail',
                        error: err
                    };
                    callback(resultData);
                }else{
                    console.log('Message sent: ' + info.response);
                    callback(null, info.response);
                }
            });
        }

        function sendMultipleEmail(senderEmail, receiverEmail, ccEmail, subject, text, callback){

            // setup e-mail data with unicode symbols 
            var mailOptions = {
                from: senderEmail, // sender address 
                bcc: receiverEmail, // list of receivers 
                subject: subject,
                cc: ccEmail, // Subject line 
                //text: text, // plaintext body 
                html: text // html body 
            };
             
            // send mail with defined transport object 
            transporter.sendMail(mailOptions, function(err, info){
                if(err){
                    var resultData = {
                        message: 'Error in sendEmail',
                        error: err
                    };
                    callback(resultData);
                }else{
                    console.log('Message sent: ' + info.response);
                    callback(info.response);
                }
            });
        }
        
        return {
            sendEmail: sendEmail,
            sendMultipleEmail: sendMultipleEmail
        }
    }
);