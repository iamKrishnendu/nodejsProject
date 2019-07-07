'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, FirstName,LastName } = JSON.parse(event.body);

  const params = {
    TableName: "users",
    Key: {
      id: id
    },
    UpdateExpression: "set FirstName = :fn, set LastName = :ln",
    ExpressionAttributeValues: {
      ":fn": FirstName,
      ":ln":LastName
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to update product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};