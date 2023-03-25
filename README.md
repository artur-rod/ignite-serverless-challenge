# Serverless Challenge | Ignite

Challenge from the Ignite NodeJS (Rocketseat Bootcamp).

## Challenge
### Create 2 serverless functions:
1. POST ``/todos/{userId}``
2. GET ``/todos/{userId}``

### About the functions
* POST ``/todos/{userId}`` - This route receive an user id from the path and two properties in the request body: ``title`` and  ``deadline``. <br>The ToDo must be saved in the DynamoDB following this pattern:

````
{ 
	id: 'uuid', // id gerado para garantir um único todo com o mesmo id
	user_id: 'uuid' // id do usuário recebido no pathParameters
	title: 'Nome da tarefa',
	done: false, // inicie sempre como false
	deadline: new Date(deadline)
}
````

* GET ``/todos/{userId}`` - This route receive an user id from the path and must return all the ToDos created by the user having the user id.

## Running the project
If you want to test this project, is very simple, Just follow the next steps:

1. Clone the repository into your machine
2. If you not have ``serverless`` installed in your machine, install it with ``npm install -g serverless```
3. Run the command ``yarn`` to install all dependencies
4. If you have Java runtime, start the DynamoDB locally, or you can run with the ``docker-compose`` file in this project
5. Run ``sls dynamodb start`` and pay attention to the message ``DynamoDB - created table todosTable`` in the terminal
6. Run ``sls offline`` to start serverless locally

After that, you're ready to run the endpoints, I'll copy the cURL of them here:

* POST ``/todos/{userId}``
````
curl --request POST \
  --url http://localhost:3000/todos/377c5d24-fb4e-487c-b62e-ec18d2ede1e2 \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "To Do",
	"deadline": "2023-03-25T00:00:00.000Z"
}'
````

* GET ``/todos/{userId}``
````
curl --request GET \
  --url http://localhost:3000/todos/377c5d24-fb4e-487c-b62e-ec18d2ede1e2
````
