[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/) [![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/) [![logo](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)

# Query API design

## Introduction

This document outlines the design of the scooter rental API for interview process.

## API mission

#### 1. Get userData using user API and userDetail API those have same userID. Must have pagination design.

```
GET /api/users
```

#### Response

```
 [
      {
        name: 'Mr. Jermaine Volkman',
        jobType: 'Agent',
        id: '1',
        createdAt: '2023-07-30T09:33:03.230Z',
        city: 'Lake Shaina',
        zipCode: '49081',
        address: '852 Gerhold Overpass',
        gender: 'M2F',
      },
      {
        name: 'Jason Beier',
        jobType: 'Strategist',
        id: '2',
        createdAt: '2022-09-18T14:21:44.115Z',
        city: 'Fort Ruben',
        zipCode: '34702-3516',
        address: '5332 Antoinette Courts',
        gender: 'female',
      },
      {}...
    ];

```

#### 2. Query userData using Query URL include `jobType`, `createdTo`, `createFrom`, can use mutipal query or single query and must have pagination design.

```
GET /api/users?jobType=${params}&createdTo=${params}&createFrom=${params}

ex. http://127.0.0.1:3000/api/users?createdTo=2023-09-09&createFrom=2021-01-10&jobType=Strategist&page=1
```

### Response

```
[
    {
        "name": "Jason Beier",
        "jobType": "Strategist",
        "id": "2",
        "createdAt": "2022-09-18T14:21:44.115Z",
        "city": "Fort Ruben",
        "zipCode": "34702-3516",
        "address": "5332 Antoinette Courts",
        "gender": "Trigender"
    },
    {
        "name": "Sheryl Hermann",
        "jobType": "Strategist",
        "id": "43",
        "createdAt": "2023-03-14T22:13:53.432Z",
        "city": "Ogden",
        "zipCode": "20433-8297",
        "address": "0626 Cartwright Land",
        "gender": "Woman"
    }
]
```

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

## Running Tests

To run tests, run the following command

```
  npm run test
```

## Authors

- [@KellyGuo](https://www.github.com/siaochi)
