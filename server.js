/* 
  WEB322 Assignment 1
  Name: Omar Khan
  Student Number: 132197203
  Email: okhan27@myseneca.ca
  Section NCC
  Date: 10/6/2021 
  All the work in the project is my own except for stock photos, icons, and bootstrap files included
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {
        layout: false
    });
});

app.get('/plans', (req, res) => {
    res.render('plans', {
        layout: false
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        layout: false
    });
});

app.get('/registration', (req, res) => {
    res.render('registration', {
        layout: false
    });
});

app.post('/validateInputs', (req, res) => {
    let formData;
    let pError = null;
    let uError = null;
    let telError = null;
    let emptyError = null;
    if (req.body) {
        formData = req.body;
    }
    let regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let regTel = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    console.log(formData);

    if (formData.pword.length === 0) {
        pError = 'Please enter a password!';
    } else if (!regPass.test(formData.pword)) {
        pError =
            'Your password should be at least 8 characters long and include at least one letter and one number';
    }

    if (!regTel.test(formData.phone)) {
        telError =
            'Please enter a phone number in one of the following formats:\n123-456-789\n(123) 456-7890\n123 456 7890\n123.456.7890\n+91 (123) 456-7890\n';
    }

    if (formData.uname.length === 0) {
        uError = 'Please enter a username!';
    }
    if (pError != null) {
        formData.pError = pError;
    }
    if (uError != null) {
        formData.uError = uError;
    }
    if (telError != null) {
        formData.telError = telError;
    }
    if (formData.pword.length > 0 && pError === null) {
        res.render('dashboard', {
            data: formData,
            layout: false
        });
    } else {
        res.render('registration', {
            data: formData,
            layout: false
        });
    }
});

app.use((req, res, next) => {
    res.render('404', {
        layout: false
    });
});

app.listen(port, () => {
    console.log('ahoy matey at port', port);
});
