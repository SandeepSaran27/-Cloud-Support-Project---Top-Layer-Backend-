const express = require("express");
const mongoose = require("mongoose");
const Router = new express.Router();
const {
    handleLogIN,
    updateActiveStatus,
    isActive,
    updateURL,
    getUrl,
    sayHii,
} = require("../controler/UR");

//Routes
Router.get('/', sayHii)

Router.post('/login', handleLogIN);

Router.post('/active-status', updateActiveStatus);

Router.get('/is-active', isActive);

Router.post('/update-url', updateURL);

Router.get('/get-url', getUrl);

module.exports = Router;