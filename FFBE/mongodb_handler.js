const assert = require('assert');
const util = require('util');
var global = require('./conf/global.js');
const MongoClient = require('mongodb').MongoClient;

module.exports = function (callback, value, name, rarity) {
    MongoClient.connect(global.mongo_url, {useNewUrlParser: true}, function (err, client) {
        if (err) throw err;
        // console.log('Successfully connected');
        const db = client.db(global.mongo_db);
        var collection = db.collection('units');
        var value_regex = new RegExp(value,"gi");
        var query = {};
        query[name] = value_regex;
        if(rarity == "6" || rarity == "7"){
        	console.log(rarity);
        	rarity = parseInt(rarity);
        	query['rarity_max'] = rarity;
        	//query['rarity_min'] >= rarity;
        }
        console.log(query);
        collection.find(query).toArray(function(err, docs) {
			assert.equal(err, null);
			console.log("Found the following records");
			//console.log(util.inspect(docs, {showHidden: false, depth: null}))
			callback(err, docs);
		});
    });
}