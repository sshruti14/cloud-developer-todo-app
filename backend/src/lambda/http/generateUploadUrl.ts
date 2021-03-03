import "source-map-support/register";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { createLogger } from "../../utils/logger";
import * as AWS from "aws-sdk";
import { recoverS3PreSignedUrl,recoverS3AttachmentURL } from '../../utils/s3';

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const logger = createLogger("Generate Upload URL");
  logger.info("Event data", event);

  const todoId = event.pathParameters.todoId;

  const todosTable = process.env.TODOS_TABLE;

  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const jwtToken = split[1];


  // DONE: Return a presigned URL to upload a file for a TODO item with the provided id
  const url = recoverS3PreSignedUrl(todoId)
   const imageUrl = recoverS3AttachmentURL(todoId)


  const updateUrlOnTodo = {
    TableName: todosTable,
    Key: { 
      todoId: todoId,
      userId: jwtToken, 
       },
    UpdateExpression: "set attachmentUrl = :a",
    ExpressionAttributeValues: {
      ":a": imageUrl,
    },
    ReturnValues: "UPDATED_NEW",
  };

  await docClient.update(updateUrlOnTodo).promise();

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      iamgeUrl: imageUrl,
      uploadUrl: url,
    }),
  };
};
