# Software Documentation

I am in the process of developing an app where a parts company can list their stock and where end users can view request stock. Below is information on the software requirements and architecture I will use when developing this web application.
#
#
## System Architecture

I will be using the MERN stack to develop my application. I will use "`Create React App`" to develop the front end of my application. I chose this because I am more familiar with CRA than other tools like Vite/Next.js. I am going to style the app using bootstrap and CSS. 
#
#
## System Requirements Specifications
#
### Functional Requirements
 - The system must allow the user to sign up and/or login with an email.
 - The system must allow any user to view products on offer in the Menu page.
 - The system must allow a logged in user to view the contact page and make enquiries about the business.
 - The system must allow a logged in user to be able to recommend a product not on offer but could be.
 - The system must allow a logged in user to be able to view the products they recommended.
 - The system must allow an admin user to add, edit, or remove products from the Menu page.
#
### Non-Functional Requirements
- It is built using Express, React, and MongoDB (the MERN stack).
- It creates, reads, updates, and deletes (CRUD) information from MongoDB.
- It has a custom server built using Express.
- It authenticates users using JWT.
- The front-end is built using React. You can use a React framework (e.g. Create React App or Next.js) of your choice.
- The application allows for normal end-user access and admin access. An administrator should be able to monitor and make changes to users’ behaviour. 
#
### User Stories
 - As a user, I should be able to navigate between the different pages the site has to offer.
 - As a user I should be able to sign up or login to the site.
 - As a user I should be able to add part enquiries on the Stock page.
 - As a user I should be able to view the contact information of the business when logged in. 
 - As a user I should be able to provide my own contact information when logged in.
 - As an admin user I should be able to add, edit, or remove products from the Menu page
 
#
This webapp will have a simple and easy to use UI. The architecture of the backend will not delay the user from accessing the different parts of the site. This webapp will allow a user to add product recommendations, thus allowing the business to cater more specifically to consumer needs.
#

# Usage

### Home Page
This is the landing page where users can navigate from.
#
### Stock Page
Here the user can view parts that are in stock and also request parts that aren't in stock. The admin user will be able to add, edit and delete parts from this page
#
### Contact Page
Here the user can log any additional queries via a contact form.
#
### Sign In/Sign Up Page
Here the user can log in with their email and password, or sign up with that information if they haven't already.
#
## Running this application locally
 Run `npm install` then `npm start` from the backend directory, thereafter run `npm install` then `npm start` from the frontend directory. No API keys are needed. 
 
## Testing
To test the app run npm test from the frontend directory

## Security
No API keys were needed for the usage of this application. User passwords are salted and hashed when storing them in the database so we don't save any plain text passwords.
#
## Deployment
This application is not deployed due to Heroku not being free by the time of creating this app.
#
