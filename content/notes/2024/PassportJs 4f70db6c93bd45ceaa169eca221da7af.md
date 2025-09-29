---
title: PassportJs
date: 2025-09-21
draft: true
tags:
  - passport
  - nodejs
  - auth
---

# PassportJs

### How Express `Middleware` works ?

`Middleware` is a function which has a access to the request and response cycle ,

```javascript

app.get("/getuser",async(req,res,next)=>{
      console.log("user")
      res.send("user details");
})

// In the above code the next keyword is used to call the next middleware in the
// in the stack , we can also use the middleware globally by using the use keyword

app.use(function name);

// The middleware runs in the order which we declare 

// to run the middleware for the particular actions we want to call the function in middle

app.post("/login",auth,async(res,req)=>{
    console.log("login");
    res.send("login successfull")
})

function auth(){}
```

## what is `passportjs` and its uses?

1. The first thing is `passport.js` framework consist of two library first one is `passport js` library for the session management and the second one is Strategy library for the authentication purpose like `passport-facebook` , `passport-google-oauth` etc.

## `passport js`

[Node JS with Passport Authentication simplified](https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5)