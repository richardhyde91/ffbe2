module.exports = {
  mongoConnect: function (MongoClient, url, dbName){
		// Use connect method to connect to the Server
		MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		  assert.equal(null, err);
		  console.log("Connected correctly to server");
		
		  const db = client.db(dbName);
		
		  findDocuments(db, function() {
			client.close();
		  });
		});
	}
};

function findDocuments(db, callback) {
  // Get the documents collection
  const collection = db.collection('units');
  // Find some documents
  collection.find({'name':/Rain/}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(util.inspect(docs, {showHidden: false, depth: null}))
    callback(docs);
  });
}

// use the findDocuments() function
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const util = require('util');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ffbe';

//mongoConnect(MongoClient, url, dbName);