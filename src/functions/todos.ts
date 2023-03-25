import { APIGatewayProxyHandler } from "aws-lambda";
import { randomUUID } from "crypto";
import { DynamoClient } from "../shared/DynamoClient";

interface ITodoRequest {
  title: string,
  deadline: string
}

export const post: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters
  const { title, deadline } = JSON.parse(event.body) as ITodoRequest

  const deadlineInMilliseconds = new Date(deadline).getTime()
  const id = randomUUID()
  console.log(deadlineInMilliseconds)

  const dynamodb = new DynamoClient()
  await dynamodb.createDocument({
    TableName: "todosTable",
    Item: {
      id,
      userId,
      title,
      done: false,
      deadline: deadlineInMilliseconds
    }
  })

  const todo = await dynamodb.getDocument({ TableName: "todosTable", id })

  return {
    statusCode: 200,
    body: JSON.stringify(todo.Item)
  }
}

export const get: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters

  const dynamodb = new DynamoClient()

  const allTodos = await dynamodb.getAllUserTodos({ 
    TableName: "todosTable",
    FilterExpression: 'userId = :userId',
    ExpressionAttributeValues: { ':userId': userId }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(allTodos.Items)
  }
}
