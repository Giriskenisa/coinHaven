# coinHaven
In Progress..
Please Run this commands:

npm i


node /src/index.js 

Then program will be work on http://localhost:4000

You can access to post request via : POST: http://localhost:4000/
exampleBody: {
    "name":"isagirisken",
    "email":"giriskenisa@gmail.com",
    "password":"12121212"
}

and then publisher will publish the information and subscriber will be ready for this publish to read and write to console(Will publish User id).


If you want to access this user from from database you can use: 
GET http://localhost:4000/:id


Please be sure that redis-server is installed on your local machine and running on default port : 6379




