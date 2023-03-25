import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export class DynamoClient {
  dynamodb: DocumentClient
  
  constructor () {
    const options = {
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "x",
      secretAccessKey: "x"
    }

    const isOffline = process.env.IS_OFFLINE

    this.dynamodb = isOffline
      ? new DynamoDB.DocumentClient(options)
      : new DynamoDB.DocumentClient()
  }

  async createDocument({ TableName, Item }) {
    return this.dynamodb.put({
      TableName,
      Item
    }).promise()
  }

  async getDocument({ TableName, id }) {
    return this.dynamodb.get({
      TableName,
      Key: { id }
    }).promise()
  }

  async getAllUserTodos({ TableName, FilterExpression, ExpressionAttributeValues }) {
    return this.dynamodb.scan({
      TableName,
      FilterExpression,
      ExpressionAttributeValues
    }).promise()
  }
}