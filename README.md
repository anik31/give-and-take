<p align="center">
  <a href="https://give-and-take.netlify.app/">
    Give&Take
  </a>
</p>
<h4 align="center"><i>Give reviews and Take reviews</i></h4>
<p align="center"><a href="https://give-and-take.netlify.app/">Be a part of Give&Take »</a></p>

## Introduction
Give&Take is a pull request management web application. Give&Take is publicly hosted on Netlify at https://give-and-take.netlify.app/.

## Made during hackneoG'22
- Theme : Community
- Team : Panik
## Features
- Pull Requests listing page
- Profile page
    - User data
    - Reviewed pull requests
    - Added pull requests
- Add a new Pull request for review
- Review a pull
- All types of error validation
- Authentication
    - Sign up
    - Login (Persisting)
    - Logout
## Tech stack
- ReactJS
- React Router v6
- useContext + useReducer for state management
- Chakra-UI
- Firebase for backend

## Installation
- Clone repository and change directory.
```bash
git clone https://github.com/anik31/give-and-take.git
cd give-and-take
```
- Switch to `dev` branch.
```bash
git checkout dev
```
- Create a firebase project & register your app, then copy the `firebaseConfig` object inside the SDK & replace with the `firebaseConfig` object in the `config/firebase-config.js`.
```javascript
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};
```
- Install dependencies and start server.
```bash
npm install
npm start
```
## Socials
* Twitter - [_anik_31](https://twitter.com/_anik_31)
* Github - [anik31](https://www.linkedin.com/in/anik31/)