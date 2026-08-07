## MerchantOS Mock Service

A lightweight mock API service for MerchantOS, powered by WireMock and Docker.

This service allows frontend and backend developers to mock API responses locally without depending on real backend services.

Tech Stack

- WireMock — API mocking
- Docker — Containerized runtime
- Bun — Project/package runner
- JSON — Mock API definitions

Project Structure

```sh
merchant-os-mock-service/
├── mappings/
│ └── user.json
├── Dockerfile
├── docker-compose.yml
├── package.json
├── bun.lock
├── .gitignore
└── README.md
```

mappings/

Contains WireMock API mappings.

Example:

```bash
{
  "request": {
    "method": "GET",
    "url": "/users"
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "jsonBody": {
      "id": 1,
      "name": "May",
      "email": "may@example.com"
    }
  }
}
```

This creates:

GET /users

and returns:
```bash
{
"id": 1,
"name": "May",
"email": "may@example.com"
}
```
Getting Started

Prerequisites

Make sure you have:

- Docker
- Bun

Check your installation:
```bash
docker --version
bun --version
```
Install

Clone the project and install dependencies:
```bash
bun install
```
Start Mock Service

Start WireMock with Docker:
```bash
bun run start
```
This runs:
```bash
docker compose up --build
```
Once the container is running, WireMock should be available at:
```sh
http://localhost:8080
```
Test the API

You can test the example /users endpoint with:
```sh
curl http://localhost:8080/users
```
Expected response:
```bash
{
"id": 1,
"name": "May",
"email": "may@example.com"
}
```
WireMock Admin API

WireMock provides an Admin API that can be useful for debugging and managing mocks.

Check the WireMock status:
```sh
curl http://localhost:8080/\_\_admin
```
View all mappings:
```sh
curl http://localhost:8080/\_\_admin/mappings
```
Adding a New Mock API

Create a new JSON file inside:

mappings/

For example:

mappings/products.json

Example:

```bash
{
  "request": {
    "method": "GET",
    "url": "/products"
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "jsonBody": {
      "items": [
        {
          "id": 1,
          "name": "Coffee"
        },
        {
          "id": 2,
          "name": "Cake"
        }
      ]
    }
  }
}
```

Restart the service if required:
```bash
bun run start
```
Then test:
```bash
curl http://localhost:8080/products
```
Stop the Service

Press:
```sh
Ctrl + C
```

Development Workflow

The typical workflow is:

```sh
Create / update mapping
↓
mappings/\*.json
↓
Docker / WireMock
↓
localhost:8080
↓
MerchantOS application
```
