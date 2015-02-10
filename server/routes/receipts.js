var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var receiptProvider = require('../lib/receiptprovider');

var should = require('should');
var url = 'localhost';
var dbname = 'receipts';
var err;

mongoose.connect('mongodb://'+url+'/'+dbname);

function getUser(req) {
    return req.user.email.toLowerCase();
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    receiptProvider.findAll(getUser(req), function(err, receipts) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({message: err});
        } else {
            res.json(receipts);
        }
    });
});

router.post('/', function(req, res, next) {

    receiptProvider.save(getUser(req), req.body, function (err, receipts) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({message: err});
        }
        else {
            res.json({message: 'success'});
        }

      });

});

module.exports = router;
