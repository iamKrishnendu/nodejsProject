'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-west-2"});

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2"});

  let responseBody = "";
  let statusCode = 0;

  const { id, FirstName, LastName } = JSON.parse(event.body);

  const params = {
    TableName: "users",
    Item: {
      id: id,
      FirstName: FirstName,
      LastName: LastName
    }
  }

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put user data`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
          "Content-Type":"application/json",
     
    },
    body: responseBody
  }

  return responseBody;
}