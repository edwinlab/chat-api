# Chat API
Simple chat api with basic authentification.

## Model & Database
I keep the database schema fairly simple with `mongoose`.

## Install
```
yarn install
yarn start
```

## API Endpoints
Each description of endpoint will formatted like the following:

```
[HTTP METHOD] [ENDPOINT] - [DESCRIPTION]
```

#### Register user
This endpoint is used to create a user.

```
POST /register - Register a user

# curl(1) test, copy & paste this on your terminal
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"username":"test", "password":"12345678"}' \
  https://oy-chat-api.herokuapp.com/register
```

#### Login
This endpoint is used to login.

```
POST /login - Login user

# curl(1) test, copy & paste this on your terminal
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"username":"test", "password":"12345678"}' \
  https://oy-chat-api.herokuapp.com/login
```

## Contributing
How to contributing for this project

```
yarn precommit
yarn commit
```
