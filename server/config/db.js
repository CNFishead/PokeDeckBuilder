const { MongoClient, db } = require("mongodb");

var database;
class DB {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
  }

  async connect() {
    console.log("connecting to database " + this.dbName);
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, client) => {
        if (err) {
          reject(err);
        } else {
          database = client.db(this.dbName);
          resolve(client.db(this.dbName));
        }
      });
    });
  }
}

module.exports = DB;
