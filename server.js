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

app.post('/validateLoginInputs', (req, res) => {
    let pError = null;
    let uError = null;
    let formData;
    if (req.body) {
        formData = req.body;
    }
    console.log(formData);
    const regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (formData.password.length === 0) {
        pError = 'Please enter a password!';
    } else if (!regPass.test(formData.password)) {
        pError =
            'Your password should be at least 8 characters long and include at least one letter and one number';
    }
    if (formData.uname.length === 0) {
        uError = 'Please enter a username!';
    }
    if (uError !== null) {
        formData.uError = uError;
    }

    if (pError !== null) {
        formData.pError = pError;
    }
    if (formData.password.length > 0 && pError === null) {
        res.render('dashboard', {
            data: formData,
            layout: false
        });
    } else {
        res.render('login', {
            data: formData,
            layout: false
        });
    }
});

app.post('/validateRegInputs', (req, res) => {
    let formData;
    let pError = null;
    let uError = null;
    let telError = null;
    let addError = null;
    let cityError = null;
    let provError = null;
    let postalError = null;
    let countryError = null;
    let taxError = null;
    let emailError = null;
    if (req.body) {
        formData = req.body;
    }
    const regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regTel = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    formData.addressone.length === 0
        ? (addError = 'Address cannot be empty')
        : (addError = null);
    formData.city.length === 0
        ? (cityError = 'City cannot be empty')
        : (cityError = null);
    formData.country.length === 0
        ? (countryError = 'Country cannot be empty')
        : (countryError = null);
    formData.postal.length === 0
        ? (postalError = 'Postal Code cannot be empty')
        : (postalError = null);
    formData.taxid.length === 0
        ? (taxError = 'Tax ID cannot be empty')
        : (taxError = null);
    formData.province.length === 0
        ? (provError = 'Province cannot be empty')
        : (provError = null);

    if (formData.pword.length === 0) {
        pError = 'Please enter a password!';
    } else if (!regPass.test(formData.pword)) {
        pError =
            'Your password should be at least 8 characters long and include at least one letter and one number';
    }

    if (formData.emailadd.length === 0) {
        emailError = 'Please enter an email address';
    } else if (!regEmail.test(formData.email)) {
        emailError = 'Please enter a valid email address';
    }

    if (!regTel.test(formData.phone)) {
        telError =
            'Please enter a phone number in one of the following formats:\n123-456-789\n(123) 456-7890\n123 456 7890\n123.456.7890\n+91 (123) 456-7890\n';
    }

    if (formData.uname.length === 0) {
        uError = 'Please enter a username!';
    }

    if (emailError !== null) {
        formData.emailError = emailError;
    }
    if (pError !== null) {
        formData.pError = pError;
    }
    if (uError !== null) {
        formData.uError = uError;
    }
    if (telError !== null) {
        formData.telError = telError;
    }
    if (addError !== null) {
        formData.addError = addError;
    }
    if (cityError !== null) {
        formData.cityError = cityError;
    }
    if (countryError !== null) {
        formData.countryError = countryError;
    }
    if (provError !== null) {
        formData.provError = provError;
    }
    if (taxError !== null) {
        formData.taxError = taxError;
    }
    if (postalError !== null) {
        formData.postalError = postalError;
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
    console.log('Server is live at port:', port);
});
