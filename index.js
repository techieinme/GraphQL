const express     = require('express');
const app         = express();
const schema      = require('./schema/schema');
const graphqlHTTP = require('express-graphql')


// import the schema 

const Book        = require('./models/Book');
const Author      = require('./models/Author');

const mongoDB     = require('mongoose');

mongoDB.connect('mongodb://127.0.0.1:27017/graphQL');

var db = mongoDB.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log(">> mongo db connected !!!!");
});

app.use('/graphql', graphqlHTTP({
    schema  : schema,
    graphiql: true
}));

// es6 u can give direclty schema alone instead a : a = a 
app.listen(4000,()=>{
    console.log("gphAPP running at 4000");
});