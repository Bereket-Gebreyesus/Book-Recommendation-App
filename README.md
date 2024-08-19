![Screenshot of the app](./client/src/assets/screenshot.png)

# Cohort 47 Group A final project

This is the final project for the HackYourFuture curriculum we did as a cohort using the [MERN stack](https://www.mongodb.com/resources/languages/mern-stack) by following the agile methodology with our team and a group of mentors. A quick guide to what we built:

Book Recommandations application allows you to explore a wide range of books, add them to your collection, and mark your favorites. You can also add reviews, give ratings, and see the most popular and latest books. Based on your favorite books, we will send you personalized recommendations via email to help you discover new books that match your interests.

[Project URL](https://c47-group-a.hackyourfuture.tech/)

## 1. Setup

First, to setup all the directories run the following in the main directory:

`npm install`

`npm run setup`

The first command will install `cypress` and some small libraries needed for running the rest of the commands. The second will go into the `client` and `server` directories and set those up to be ran.

In the `client` and `server` directory there are two `.env.example` files. Create a copy and rename that to `.env`. Then follow the instructions in those files to fill in the right values.

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 2. Code structure

```
client
├── public
└── src
|   └── __tests__
|   └── __testUtils__
|   └── components
|   └── hooks
|   └── pages
|       └── __tests__
|       └── components
|   └── util
|   index.jsx
server
└── src
    └── __tests__
    └── __testUtils__
    └── controllers
    └── db
    └── models
    └── routes
    └── util
    index.js
```

### 2.1 Client structure

- `public` || public facing client code
- `__tests__` || any `jest` tests for specific components will be in a `__tests__` folder on the same level
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `components` || all of our shared components that are used over multiple pages
- `hooks` || all of our custom hooks
- `pages` || the page components of our app, any routing will go between these components
- `pages/components` || components used specifically on those pages
- `util` || any utility functions that can be used anywhere on the client side
- `index.jsx` || the start point of the client

### 2.2 Cypress structure

- `fixtures` || any data/files that `cypress` needs can be placed here
- `integration` || all of our tests are in here, separated in folders based on the pages in our app
- `plugins` || any plugins for our `cypress` configuration can be placed here
- `support` || custom commands and other support files for `cypress` can be placed here

### 2.3 Server structure

- `__tests__` || any `jest` tests for the api endpoints as that is our testing strategy for the backend
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `controllers` || all of our controller functions that interact with the database
- `db` || all of our configuration for the database
- `models` || all of our `mongoose` models will be placed here
- `routes` || code to match up the API with our controllers
- `util` || any utility functions that can be used anywhere on the server side
- `index.js` || the start point of the server

## 3. Stack / external libraries

The base stack of the app is a MERN stack (Mongoose, Express, React, Node). Next to that we make use of the following extras:

### 3.1 Configuration libraries

- `dotenv` || To load the .env variables into the process environment. See [docs](https://www.npmjs.com/package/dotenv)
- `webpack` / `html-webpack-plugin` || To bundle our React app and create a static app to host. See [docs](https://webpack.js.org/)
- `husky` || To run our tests and linter before committing. See [docs](https://typicode.github.io/husky/#/)
- `eslint` || To check our code. We have different configurations for frontend and backend. You can check out the configuration in the `.eslintrc.(c)js` files in the respective `client` and `server` folders. See [docs](https://eslint.org/)
- `prettier` || To automatically format our code. See [docs](https://prettier.io/)
- `concurrently` || To run commands in parallel. See [docs](https://github.com/open-cli-tools/concurrently#readme)

For more information on how these work together including the automatic deployment to heroku, have a look at our detailed [DEV](./DEV.md) file.

### 3.2 Client-side libraries

- `@testing-library/*` || We use React Testing Library to write all of our tests. See [docs](https://testing-library.com/docs/react-testing-library/intro/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `jest-fetch-mock` || To mock out the backend for our testing purposes. See [docs](https://github.com/jefflau/jest-fetch-mock#readme)
- `prop-types` || To type-check our components. See [docs](https://github.com/facebook/prop-types)
- `axios` || To make HTTP requests. See [docs](https://axios-http.com/docs/intro)
- `bootstrap` || For styling and responsive design. See [docs](https://getbootstrap.com/)
- `firebase` || For backend services like authentication and database. See [docs](https://firebase.google.com/docs)
- `react` || A JavaScript library for building user interfaces. See [docs](https://reactjs.org/)
- `react-bootstrap` || Bootstrap components built with React. See [docs](https://react-bootstrap.github.io/)
- `react-dom` || Serves as the entry point to the DOM and server renderers for React. See [docs](https://reactjs.org/docs/react-dom.html)
- `react-icons` || Include popular icons in your React projects easily. See [docs](https://react-icons.github.io/react-icons/)
- `react-multi-carousel` || A flexible carousel component for React. See [docs](https://www.npmjs.com/package/react-multi-carousel)
- `react-router-bootstrap` || Integration between React Router and React Bootstrap. See [docs](https://github.com/react-bootstrap/react-router-bootstrap)
- `react-router-dom` || DOM bindings for React Router. See [docs](https://reactrouter.com/web/guides/quick-start)
- `react-slick` || Carousel component built with React. See [docs](https://react-slick.neostack.com/)
- `slick-carousel` || Carousel library. See [docs](https://kenwheeler.github.io/slick/)

### 3.3 Server-side libraries

- `nodemon` || To automatically restart the server when in development mode. See [docs](https://nodemon.io/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `supertest` || To more easily test our endpoints. See [docs](https://github.com/visionmedia/supertest#readme)
- `mongodb-memory-server` || To mock out our database in our backend tests. See [docs](https://github.com/nodkz/mongodb-memory-server)
- `cors` || To open up our API. See [docs](https://github.com/expressjs/cors#readme)
- `mongoose` || To add schemas to our database. See [docs](https://mongoosejs.com/)
- `bcrypt` || To hash passwords. See [docs](https://github.com/kelektiv/node.bcrypt.js#readme)
- `cloudinary` || For image and video management in the cloud. See [docs](https://cloudinary.com/documentation)
- `dotenv` || To load environment variables from a .env file. See [docs](https://github.com/motdotla/dotenv#readme)
- `express` || A web framework for Node.js. See [docs](https://expressjs.com/)
- `firebase-admin` || Firebase Admin SDK for server-side Firebase integration. See [docs](https://firebase.google.com/docs/admin/setup)
- `jsonwebtoken` || To create and verify JSON Web Tokens. See [docs](https://github.com/auth0/node-jsonwebtoken#readme)
- `multer` || Middleware for handling multipart/form-data, which is primarily used for uploading files. See [docs](https://github.com/expressjs/multer#readme)
- `multer-storage-cloudinary` || Cloudinary storage engine for Multer. See [docs](https://github.com/affanshahid/multer-storage-cloudinary#readme)
- `node-cron` || To schedule tasks in Node.js. See [docs](https://github.com/node-cron/node-cron#readme)
- `nodemailer` || To send emails with Node.js. See [docs](https://nodemailer.com/about/)
