const email= require('../models/email');

function addEmail(req,res){
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for adding Email."
    };

    if(data.email && data.date && data.time) {
        data.scheduled_time = data.date + " "+data.time+":00";
        email.addEmail(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in adding email.";
                return res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "Successfully added the email";
            responseData.data = {
                email: data.email,
                scheduled_date: data.date
            };
            return res.status(200).send(responseData);
        })
    } else {
        return res.status(400).send(responseData);
    }
}

function fetchEmails(req,res){
    let responseData = {
        success: false
    };
    email.fetchEmails(function(err, result) {
        if(err) {
            console.log(err);
            responseData.msg = "Error in fetching Emails.";
            return res.status(500).send(responseData);
        }
        responseData.success = true;
        responseData.msg = "Successfully displaying the Emails.";
        responseData.data=result;
        return res.status(200).send(responseData);
    })
}

function fetchFailedEmails(req,res){
    let responseData = {
        success: false
    };
    email.fetchFailedEmails(function(err, result) {
        if(err) {
            console.log(err);
            responseData.msg = "Error in fetching failed Emails.";
            return res.status(500).send(responseData);
        }
        responseData.success = true;
        responseData.msg = "Successfully displaying the Failed Emails.";
        responseData.data=result;
        return res.status(200).send(responseData);
    })
}

function updateSchedule(req,res){
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for updating Schedule."
    };
    if(data.id && data.date && data.time) {
        data.scheduled_time = data.date + " "+data.time+":00";
        email.updateSchedule(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in updating Schedule.";
                return res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "Successfully updated the Schedule";
            responseData.data = {
                email: data.email,
                Rescheduled_date: data.date
            };
            return res.status(200).send(responseData);
        })
    } else {
        return res.status(400).send(responseData);
    }
}

function deleteSchedule(req,res){
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for deleting Schedule."
    };
    if(data.id) {
        email.deleteSchedule(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in deleting Schedule.";
                return res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "Successfully deleted the Schedule";
            responseData.data = {
                email: data.email
            };
            return res.status(200).send(responseData);
        })
    } else {
        return res.status(400).send(responseData);
    }
}

module.exports = {addEmail , fetchEmails, updateSchedule, deleteSchedule, fetchFailedEmails};