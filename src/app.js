const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//Conecting yo DB
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('DB connected'))
    .catch(err => console.log('err'));

//Importing routes
const indexRoutes = require('./routes/index')

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', indexRoutes);

//Starting server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
});