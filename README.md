# NodeApp

This app has been created in Node using Sequelize ORM & mySQL database.

## Run a App

1.  First installed the mySQL database and node the username & password to connect with database.
2.  Clone this repo into local system.
3.  Open the Terminal with root directory of app.
4.  Run `npm install` to install the node_modules.
5.  Create a file with .env extension in root folder.
6.  Paste the following code in .env file.
    ```
    PORT=5000
    CONNECTIONURL='localhost'
    DATABASENAME='your-database-name'
    USER='root'
    PASSWORD='your-password'
    SECRETKEY='ADMIN'
    ```
7.  Replace the values of USER, PASSWORD and SECRETKEY with your credential.
8.  After that run `npm run start:dev` to run the app.

## User Routes

1.  First you have to hit the `http://localhost:3000/user/register` route with post request to create a User with following parameters.
    -   firstName: 'zia',
    -   lastName: 'Ali'
    -   email: 'your-email@gmail.com',
    -   password: '12345678'
2.  After that you have to hit the `http://localhost:3000/user/login` routes with follwing credential to login with post request and use other routes.
    -   email: 'your-email@gmail.com',
    -   password: '12345678'
3.  `http://localhost:3000/users` route with get request to get all users.
4.  `http://localhost:3000/user/:id` route with get request & specific user Id to get the user information.
5.  `http://localhost:3000/user/:id` route with delete request & specific user Id to delete the user.
6.  `http://localhost:3000/user/:id` route with put request & specific user Id to update the user.
<br/>
    <b>MINOR CHANGES</b>
7. Note: For role I have used enums
8.  Instead of joi validation i prefer to use the sequelize default validlation, because it's recommeded by developers whenever sombody using the sequelize orm.

9.  Run `sequelize db:migrate` if the table isn't creating by automatically.
