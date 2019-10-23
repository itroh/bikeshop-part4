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
var dataCardBike = [];

function deleteBike(pos) {
    dataCardBike.splice(pos, 1);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { dataBike });
});

/* GET Shop page. */
router.get('/shop', function(req, res, next) {
    res.render('shop', { dataCardBike });
});

/* POST Shop page. */
router.post('/shop', function(req, res, next) {
    dataCardBike.push({
        name: req.body.bikeNameFromFront,
        url: req.body.bikeImageFromFront,
        price: req.body.bikePriceFromFront,
        quantity: req.body.bikeQuantityFromFront
    })

    console.log("/shop", req.body);
    res.render('shop', { dataCardBike });
});

/* POST delete-Shop page. */
router.post('/delete-shop', function(req, res, next) {
    deleteBike(req.body.position);
    res.render('shop', { dataCardBike });
});

/* POST update-Shop page. */
router.post('/update-shop', function(req, res, next) {
    var position = req.body.position;
    var newQuantity = req.body.quantity;
    dataCardBike[position].quantity = newQuantity;
    res.render('shop', { dataCardBike });
});

module.exports = router;