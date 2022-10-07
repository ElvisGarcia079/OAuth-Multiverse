// The reason OAuth is important is because: 
    // 1. When you connec through a third party, your app can compare your third party data with your app data
        // If there is any match, it becomes familiar because you program you app to respond/react based on common data.
    
    // 2. Security. Rest assured that a user will not be authenticated by the third party, if the third party credentials are false. 
const express = require("express");
require("dotenv").config(".env")
const app = express();

const { auth } = require('express-openid-connect');

const {
    AUTH0_SECRET,
    AUTH0_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    PORT
} = process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_BASE_URL,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Restrictive or Private Route
app.get("/products", (req, res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.send(isAuthenticated ? "<h1>Welcome to our Product Page</h1>" : "<h1>Please make sure to authenticate in order to view our products</h1>")
});

 app.listen(PORT, () => {
     console.log(`App is listening on http://localhost:${PORT}`)
 })

