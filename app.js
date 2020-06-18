var express = require('express');
var logger = require('morgan');

var groupRouter = require('./routes/group');
var joinRouter = require('./routes/join');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/group', groupRouter);
app.use('/join', joinRouter);

module.exports = app;
