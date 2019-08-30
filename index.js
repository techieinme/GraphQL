const express = require('express');
const app = express();
const schema = require('./schema/schema');

const graphqlHTTP = require('express-graphql')

app.use('/graphql', graphqlHTTP({
    schema : schema ,
    graphiql : true 
}));

// es6 u can give direclty schema alone instead a : a = a 
app.listen(4000,()=>{
    console.log("gphAPP running at 4000");
});