import "source-map-support/register";
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import { createLogger } from "../../utils/logger";
import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { update } from "../../businessLogic/";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const logger = createLogger("UpdateTodo");
  logger.info("EVENT:", event);

  const todoId = event.pathParameters.todoId;
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);


  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const jwtToken = split[1];

  
  const updatedTodoItem = update(todoId,updatedTodo,jwtToken);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item:updatedTodoItem
    }),
  };
};

