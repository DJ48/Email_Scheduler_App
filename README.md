# Email_Scheduler_App

## Description

I have created the backend of Email Scheduling App using Nodejs, Express and Sendgrid.

Functionality
1. Users will be able to schedule an email on a particular day at a particular time.
2. Users will be able to reschedule an email.
3. Users will be able to delete an scheduled email.
4. Users will be able to see all the scheduled emails.
5. Users will be able to see the failed scheduled emails.

## Getting Started

### Installation & Setup

1. Install [Node.js](https://nodejs.org/en/) and [MySql](https://dev.mysql.com/downloads/installer/)
2. Clone this repository and install the dependencies.
    ```
      git clone https://github.com/DJ48/Email_Scheduler_App.git
      cd Email_Scheduler_App
      npm install
    ```     
3. Now Setup the database (ex: email_app). If you are using another name please change the below queries accordingly.
    * Create the email_scheduler_t table.
    ```
   CREATE TABLE `email_app`.`email_scheduler_t` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email_id` VARCHAR(150) NULL,
    `status` INT NULL,
    `scheduledAt` TIMESTAMP NULL,
    `createdAt` DATETIME NULL,
    `updatedAt` DATETIME NULL,
    PRIMARY KEY (`id`));

    ```
4. Now update the backendConfig.js ( Path: Email_Scheduler_App>src>constants ) file for database connection.
    * Update the following entries.
    ```
      host: "ip_addr",
      user: "your_username",
      password: "your_password",
      database: "db_name"
    ```
5. Now, within the Email_Scheduler_App directory. Start the server.
    ```
      node app.js
    ```
    
### Executing program

1. Download [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/) for web api testing.
2. I have created five api. I am gonna explain each api and their input json.
    * Create Api :- The user will pass email, date and time for creating an email schedule. 

        ```
        URL: http://127.0.0.1:3000/api/v1/emails
        Method: POST
        
        Input JSON:-
        {
	        "email":"test@gmail.com",
	        "date": "2022-04-16",
	        "time": "16:01"
        }
        ```
     * List All Schedule Api :- This api will list out all the scheduled emails.

        ```
        URL: http://127.0.0.1:3000/api/v1/emails
        Method :- GET
        ```
     
     * List Failed Schedule Api :- This api will list out all the failed emails. 

        ```
        URL: http://127.0.0.1:3000/api/v1/failedEmails
        Method: GET
        ```
        
    * Reschedule Api :- The user will able to reschedule by passing the id(assigned to email that user wants to modify), new date and time.

        ```
        URL:- http://127.0.0.1:3000/api/v1/emails
        Method: PUT
        
        Input JSON:-
        {
	        "id":"11",
	        "date": "2022-04-16",
	        "time": "16:01"
        }
        ```
    * Delete Api :- The user will able to delete an email schedule by passing the id(assigned to email that user wants to remove).

        ```
        URL: http://127.0.0.1:3000/api/v1/emails
        Method: DELETE
        
        Input JSON:-
        {
	        "id":"11"
        }
        ```

## Author

Deepak Jaiswal

[Read & Rate my Article on Linked List](https://www.geeksforgeeks.org/multiplication-of-two-polynomials-using-linked-list/)

## Version History

* v1
    * Initial Release
