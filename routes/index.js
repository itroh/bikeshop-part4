var express = require('express');
var router = express.Router();

// Bikes array that we will use in index to desplay our bikes card with names, prices and urls
var dataBike = [
    { name: "BIKO45", url: "/images/bike-1.jpg", price: 679 },
    { name: "ZOOK7", url: "/images/bike-2.jpg", price: 799 },
    { name: "LIKO89", url: "/images/bike-3.jpg", price: 839 },
    { name: "GEWO8", url: "/images/bike-4.jpg", price: 1249 },
    { name: "KIWIT", url: "/images/bike-5.jpg", price: 899 },
    { name: "NASAY", url: "/images/bike-6.jpg", price: 1399 }
];

// Bikes array that we will use in shop.ejs to desplay our bikes list to buy
//var dataCardBike = [];


function addBike(session, newBike) {
    console.log("je suis dans  addbike");

    console.log(session);
    if (dejaPanier(session, newBike.name)) {
        for (var i = 0; i < session.dataCardBike.length; i++) {
            if (session.dataCardBike[i].name == newBike.name) {
                console.log("deja dans le panier, j'ai retrouvé mon velo " + newBike.quantity);
                session.dataCardBike[i].quantity++;
                console.log("quantité +1  " + session.dataCardBike[i].quantity);
            }
        }

    } else {
        console.log("pas encore dans le panier");
        session.dataCardBike.push(newBike);
    }
}


function dejaPanier(session, model) {
    console.log("je susi ds deja panier");

    console.log(session);
    for (var i = 0; i < session.dataCardBike.length; i++) {
        if (session.dataCardBike[i].name == model) {
            return true;
        }
    }
    return false;
}



/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.dataCardBike == undefined) {
        req.session.dataCardBike = [];
    }
    console.log(req.session);
    res.render('index', { dataBike, dataCardBike: req.session.dataCardBike });
});

/* GET shop page. */
router.get('/shop', function(req, res, next) {
    if (req.session.dataCardBike == undefined) {
        req.session.dataCardBike = [];
    }
    res.render('shop', { dataBike, dataCardBike: req.session.dataCardBike });
});

/* POST Shop page. */
router.post('/shop', function(req, res, next) {
    var newBike = {
        name: req.body.bikeNameFromFront,
        url: req.body.bikeImageFromFront,
        price: req.body.bikePriceFromFront,
        quantity: req.body.bikeQuantityFromFront
    };
    console.log(req.session);
    addBike(req.session, newBike);
    res.render('shop', { dataCardBike: req.session.dataCardBike });
});

/* POST delete-Shop page. */
router.post('/delete-shop', function(req, res, next) {
    req.session.dataCardBike.splice(req.body.position, 1);
    res.render('shop', { dataCardBike: req.session.dataCardBike });
});

/* POST update-Shop page. */
router.post('/update-shop', function(req, res, next) {
    var position = req.body.position;
    var newQuantity = req.body.quantity;
    req.session.dataCardBike[position].quantity = newQuantity;
    res.render('shop', { dataCardBike: req.session.dataCardBike });
});

module.exports = router;