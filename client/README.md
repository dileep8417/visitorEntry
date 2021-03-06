# Visitor Entry Software

## About Project
    It is designed using the following technologies
        ->React
        ->Nodejs
        ->Express
        ->MongoDB

## Configuration

### Port Configuration (Optional)
 Add desired PORT number in `.env file`. Default Port is running on `8000`.
    PORT = `Port-Number`
 If you change the PORT then update the `proxy port` in (client/package.json ).

### Email Configuration
 Add your Gmail and Password in `.env file` for sending Email to the visitor and host.
    MAIL = `Your-Mail`
    MAILPASS = `Mail-Password`

Note: Make sure that less secured option must be turned on for the Gmail you are using in the project.
      You can turn on the option from (https://myaccount.google.com/lesssecureapps).

### Database Configuration (Optional)
 In this project we are using MongoDB (MongoDB Atlas) as database.
 Default it is configured with `essential credentials` if you want to change add the following to `.env file`.
    DBUSER = `Database-Username`
    DBPASS = `Database-Password`
    DBCLUSTER = `Cluster-Name`

## Running the Application  
 Run the following command `npm run dev` for executing the software.

## Operating and Working
 Fill the form details with the information of visitor and host.
 Then an Email will be send to the Host.
 After completion of meeting you have to remove the visitor from the visitors list.
 Then an Email will be send to the Visitor.

