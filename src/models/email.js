const sqlConnection = require("../services/sqlConnection");

function addEmail(data,cb){
    let sql = `INSERT INTO email_scheduler_t
    (email_id, status, scheduledAt, createdAt, updatedAt)
    Values (? , 1, ?, now(), now())`;
    let values = [];
    values.push(data.email);
    values.push(data.scheduled_time);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function fetchEmails(cb){
    let sql = `SELECT * from email_scheduler_t`;
    let values = [];
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function fetchFailedEmails(cb){
    let sql = `SELECT * from email_scheduler_t where status=0`;
    let values = [];
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function updateSchedule(data,cb){
    let sql = `UPDATE email_scheduler_t SET scheduledAt=?, status = 1, updatedAt = now() WHERE id=?`;
    let values = [];
    values.push(data.scheduled_time);
    values.push(data.id);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err,result);
    });
}

function deleteSchedule(data,cb){
    let sql = `DELETE FROM email_scheduler_t WHERE id = ?`;
    let values = [];
    values.push(data.id);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err,result);
    });
}

function fetchEmailsByDate(cb){
    let sql = `SELECT email_id from email_scheduler_t where scheduledAt <= now() and status=1`;
    let values = [];
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function updateStatus(data,cb){
    let sql = `UPDATE email_scheduler_t SET status = ?, updatedAt = now() WHERE scheduledAt <= now() and email_id=? and status = 1`;
    let values = [];
    values.push(data.status);
    values.push(data.email);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err,result);
    });
}

module.exports={addEmail, fetchEmails, fetchEmailsByDate, updateStatus, updateSchedule, deleteSchedule, fetchFailedEmails};