# Task Manager App

## Overview
Task Manager App is designed to help you efficiently manage your tasks and to-dos. Stay organized, track your progress, and achieve your goals with ease.

## Features
- Create, edit, and delete tasks
- Set due dates
- Seen & update Task status pending to in progress -> Complete
- Organize tasks by categories or projects
- Prioritize tasks with different levels
- Sync across multiple devices

### Prerequisites
- Javascript
- React.js as Javascript library
- Express.js
- Node.js
- npm (Node Package Manager)
- mongoDB (for database)

## Installation
 ## To setup the projest locally 
- First you should have to start your backend server
- for doing that you should have to run a build command on your terminal -> npm install
- to start server run -> node server.js
- after that you have to install all the dependencies for your Frontend
- for do so run a Command on terminal -> npm install
- to run the frontend server on local host -> npm run dev

## For User 
- user can create an account with security by hashing their password by using bycrpt
- once a user logged in, it creates a token (JWT token) to stay logged. it enhance the user experience.
- after login, user can create a task or go to their dashboard to preview task.
- user can make the task status pending to in progress.. just by clicking on the task.
- In processing status, user can't edit or delete the task, it disable these buttons.

## for Admin 
- An admin can view all the task created or completed on their dashboard.

==> All this functionality in a simple app in modular way.




