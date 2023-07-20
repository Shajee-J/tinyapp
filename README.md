# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs.
 This was a project done for educational purposes. 

## Final Product


![main /urls page accessed while logged in](image-1.png)




![/register page form can only be accessed while signed out](image.png)




![/register page form can only be accessed while signed out](image-2.png)





## Dependencies

- Node.js
- Express
- EJS
- bcryptjs
- cookie-session
- nodemon (optional)

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.


## important note to consider

Hello please note, if you happen to save or restart the server while logged-in, this will result in the app going back to the default layout (ie: logout will be replaced with login/register), but because of limitations with using session.cookie..the cookies will persist and cause abnormal behavior.

- To fix this, you just need to delete the currently active cookies using inspect on the browser. 
- To avoid this, simply log-out before restarting the server for whatever reason. 