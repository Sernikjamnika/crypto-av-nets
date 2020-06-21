var express = require('express');
var logger = require('morgan');

var groupRouter = require('./routes/group');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/group', groupRouter);

module.exports = app;
