const express = require("express");
const { adminAPI } = require("./api");
const cors = require('cors')
module.exports = async (app) => {
  app.use(express.json());
  app.use(cors(
    {
      origin: 'http://localhost:5173',  // Replace with your frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify the allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    }
  ))
  app.use(express.urlencoded({ extended: true }));
  // app.use(express.static(__dirname + "/public"));

  // APIs
  adminAPI(app);
};
