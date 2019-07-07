var request = require('request');
const uuiv4 = require("uuid/v4")
const dynamoId = uuiv4();

var id=1234
var options={
    method:'POST',
    url:`https://h9lb3hkhg3.execute-api.us-west-2.amazonaws.com/prod/users/${dynamoId}`,
    header:{
        'Content-Type':'application/json'
    },
   body:`{
       "id":"${dynamoId}",
       "FirstName":"Rogger",
       "LastName":"Sibaston"
   }`

};

request(options,function(err,res,body){

    console.log(options)

    if(err) throw err;

    console.log(body);
})