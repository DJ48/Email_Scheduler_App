const sgMail = require('@sendgrid/mail');
const key = "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";
const schedule = require('node-schedule');
const email = require('./src/models/email');


function sendEmail(receiver_mail_id){
    sgMail.setApiKey(key);
    const msg = {
      to: receiver_mail_id,
      from: '1606020@kiit.ac.in',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'Hi !!! This is the mail to join Cypher.',
      //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    (async () => {
        try {
          const res=await sgMail.send(msg);
          if(res[0].statusCode==202){
              let data={};
              data.status=2;
              data.email=receiver_mail_id;
              console.log("Message Sent "+receiver_mail_id);
              email.updateStatus(data,function(err,res){
                  if(err){
                      console.log("Error Occured:- "+err);
                  }
                  else{
                      console.log("Status updated.")
                  }
              })
          }
        } catch (error) {
            console.error(error);
            let data={};
            data.status=0;
            data.email=receiver_mail_id;
            console.log("Message not Sent "+receiver_mail_id);
            email.updateStatus(data,function(err,res){
                if(err){
                    console.log("Error Occured:- "+err);
                }
                else{
                    console.log("Status updated.")
                }
            })
        }
    })();
}

function scheduler(req,res){
    console.log('Running Scheduler');
    schedule.scheduleJob('* * * * *',()=>{
        var currentdate = new Date(); 
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        console.log(datetime);
        email.fetchEmailsByDate(function(err, result) {
            if(err) {
                console.log(err);
            }
            for(let data of result){
                sendEmail(data.email_id);
            }
        })
    })
}
module.exports = {scheduler}