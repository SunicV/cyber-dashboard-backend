var should = require('should');
var mongoose = require('mongoose');
var db = require('../../mongodb/db.js');


describe('DataBase Tests', function() {
    mongoose.connect('mongodb://localhost:27017/sunicv', { useMongoClient: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
        console.log('we are conencted to test datebse!');
    });
});