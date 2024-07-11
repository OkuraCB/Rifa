## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Technologies

This API was made with the NestJS framework and the database connections are made with PrismaORM.
The login system is handled by assigning a JWT Token to each user that expires in 24 hours.

Some key features of this API are the use of microsservices to all of the requisitions, as well as the method to treat the errors that emerge from the requisitions.
