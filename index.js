let MongoClient=require('mongodb').MongoClient;

console.log("Started");

// let createDB = async function(client) {
//   client.
// };
//
(async function() {
  // Connection URL
  // const url = 'mongodb://localhost:27017/myproject';
  const url = 'mongodb://mon-qa.g.int:30231/test-project';

  // Database Name
  const dbName = 'test-project';
  let client;

  try {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(url);

    const db = client.db(dbName);
    db.createCollection("collection-1");

    console.log("Connected");

    for (i = 0; i < 1; i++) {
      let batch = [];
      for (j = 0; j < 100; j++) {
        batch.push({
          item: "test-item",
          qty: 25 + j % 4,
          tags: ["blank", "red"],
          size: {h: 14 + j % 2, w: 21 + j % 3, uom: "cm"}
        })
      }
      db.collection("collection-1")
      .insertMany(batch)
      .then(r => console.log(r.result));
    }

  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
  }
})();


console.log("Done");
