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
]

// Bikes array that we will use in shop.ejs to desplay our bikes list to buy
var dataCardBike = [
    { name: "BIKO45", url: "/images/bike-1.jpg", price: 679, quantity: 1 },
    { name: "ZOOK7", url: "/images/bike-2.jpg", price: 799, quantity: 2 },
]

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { dataBike });
});

/* GET Shop page. */
router.get('/shop', function(req, res, next) {
    res.render('shop', { dataCardBike });
    console.log(req.query);
});

module.exports = router;