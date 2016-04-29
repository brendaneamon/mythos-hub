# Mythos Hub – The Intersection of Myth and Popular Culture

## Overview and Purpose of the Application

[**Mythos Hub**](https://mythos-hub.herokuapp.com/) is a web application built using the MEAN framework (MongoDB, Express.js, AngularJS, and Node.js). The purpose of this application is to allow users to learn about various pop culture references to and interpretations of classical myths.

This project was initially conceived as a solution to a problem I had when I was teaching an introductory course in classical mythology as the University of Maryland, College Park. When I taught this course, I often tried to connect the themes of Greek and Roman myths to modern concerns in order to convey their ongoing relevance. There is no doubt in my mind that the students wondered what those old Greek tales had to do with their lives in the 21st century---I wanted to answer their questions with examples of how modern figures have interpreted and used these myths to understand how the world works, and what their place in it might be.

The application includes a landing page that is intended to orient the user to the various categories of mythological references and interpretations available in the application: music, film, humor, and theater (I intend to add television, painting/sculpture, and other categories in the future). Currently, the data in the database is limited to songs (mostly due to my own preferences and proclivities), but I will add other examples from different media in the near future.

Users may view a list of modern mythological references and may filter those references using a keyword search. When the user clicks on the name of a particular modern work, the next page displays more detailed information about that work, including the name of the artist, a photo, a description, and a link to a video (a music video in the case of the musical entries).

I hope to furnish the link to [this application](https://mythos-hub.herokuapp.com/) to my former department at the University of Maryland (also an *alma mater* of mine), so that current and future students of mythology can learn more about how modern artists have reinterpreted and referred to these timeless stories from ancient Greece and Rome.

## Technologies Used

This web application was built using using the following technologies:

- AngularJS (version 1.5.3), HTML, and CSS on the front end
- Materialize (version 0.97.6) for styling and responsiveness
  - [http://materializecss.com/](http://materializecss.com/)
- Twitter integration via OAuth for user authentication
- Express.js (version 4.13.4) and Node.js on the back end
- MongoDB and Mongoose ODM
- Hosted on Heroku

## Installation instructions

*For Users*

Visit the application at [(https://mythos-hub.herokuapp.com/)](https://mythos-hub.herokuapp.com/), log in with your Twitter account, and navigate through the application in order to view details and media concerning the various mythological references.

*For Developers*

After you clone down the repo, run `npm install` from the command line to install all dependencies listed in `package.json`. The database is MongoDB, so you will need to run the `mongod` command in order to ensure that your database is running. If you want to avoid running the `node` command repeatedly, be sure to run `nodemon` in a separate tab as well (this will check for changes to the code before restarting the application automatically).

## Unsolved Problems and Future Plan

- User comments should be included in future versions of the app, and those comments should be tied to Twitter accounts
- Future versions of the application should include some custom Angular directives to so that the front end code is more semantic and readable
- Add more data from other arenas and genres (currently the app only includes musical references to myths)
- Add integration with other social media platforms (e.g., Facebook) to allow users to choose their method of authentication
- Implement passport middleware for Express to improve overall security and maintainability
