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
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const page = { home: true };
    res.render('index', {
        page: page
    });
});

app.get('/plans', (req, res) => {
    const data = [
        {
            personal: true,
            title: 'Personal',
            description: 'Affordable plan, great for personal projects',
            price: 'C$3.89/mo',
            items: [
                'STARTER Performance',
                'Single Website',
                'Unlimited Space and Traffic',
                'Powered by renewable energy',
                'All-inclusive STARTER email',
                'Standard hosting features',
                'Free site migration'
            ]
        },
        {
            pro: true,
            title: 'Pro',
            description:
                'Pro performance, premium features, free domain, and more!',
            price: 'C$3.92/mo',
            items: [
                'PRO Performance',
                'Unlimited Websites',
                'Unlimited Space and Traffic',
                'Powered by renewable energy',
                'All-inclusive PRO email',
                'Standard hosting features',
                'Free site migration',
                'Free domain',
                'Optimized for WordPress',
                'Premium Features',
                'Email Marketing',
                'SSL certificate'
            ]
        },
        {
            enterprise: true,
            title: 'Enterprise',
            description:
                'Best performance for demanding websites, with SSL & dedicated IP',
            price: 'C$11.89/mo',
            items: [
                'ENTERPRISE Performance',
                'Unlimited Websites',
                'Unlimited Space and Traffic',
                'Powered by renewable energy',
                'All-inclusive ENTERPRISE email',
                'Standard hosting features',
                'Free site migration',
                'Free domain',
                'Optimized for WordPress',
                'Premium Features',
                'Email Marketing',
                'SSL certificate',
                'Dedicated IP'
            ]
        }
    ];
    const page = { plan: true };
    res.render('plans', {
        data: data,
        page: page
    });
});

app.get('/login', (req, res) => {
    const page = { login: true };
    res.render('login', {
        page: page,
        layout: 'form'
    });
});

app.get('/registration', (req, res) => {
    const page = { registration: true };
    res.render('registration', {
        page: page,
        layout: 'form'
    });
});

app.post('/validateLoginInputs', (req, res) => {
    let pError = false;
    let uError = false;
    let formData;
    if (req.body) {
        formData = req.body;
    }
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

    formData.uError = uError;
    formData.pError = pError;
    formData.registration = false;
    formData.login = true;
    if (formData.password.length > 0 && pError === false) {
        res.render('dashboard', {
            data: formData,
            page: { dashboard: true },
            layout: 'form'
        });
    } else {
        res.render('login', {
            data: formData,
            page: { login: true },
            layout: 'form'
        });
    }
});

app.post('/validateRegInputs', (req, res) => {
    let formData;
    let pError = false;
    let uError = false;
    let telError = false;
    let addError = false;
    let cityError = false;
    let provError = false;
    let postalError = false;
    let countryError = false;
    let taxError = false;
    let emailError = false;
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
    } else if (!regEmail.test(formData.emailadd)) {
        emailError = 'Please enter a valid email address';
    }

    if (!regTel.test(formData.phone)) {
        telError =
            'Please enter a valid phone number (eg: 416.555.5555 or 416-555-5555 or 4165555555)';
    }

    if (formData.uname.length === 0) {
        uError = 'Please enter a username!';
    }

    formData.emailError = emailError;
    formData.pError = pError;
    formData.uError = uError;
    formData.telError = telError;
    formData.addError = addError;
    formData.uError = uError;
    formData.cityError = cityError;
    formData.countryError = countryError;
    formData.provError = provError;
    formData.taxError = taxError;
    formData.postalError = postalError;
    formData.registration = true;
    formData.login = false;

    if (formData.pword.length > 0 && pError === false) {
        res.render('dashboard', {
            data: formData,
            layout: 'form'
        });
    } else {
        res.render('registration', {
            data: formData,
            layout: 'form'
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
