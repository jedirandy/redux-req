# redux-request
:beginner: A redux middleware for handling HTTP requests

It's based on plain old XHR, though not as fancy as fetch, it simply does the job and there's no need for extra dependencies.

[![Build Status](https://travis-ci.org/jedirandy/redux-request.svg?branch=master)](https://travis-ci.org/jedirandy/redux-request)
[![dependencies](https://david-dm.org/jedirandy/redux-request.svg)](https://david-dm.org/jedirandy/redux-request)
[![npm module](https://badge.fury.io/js/redux-request.svg)](https://www.npmjs.org/package/redux-request)
[![codecov.io](https://codecov.io/github/jedirandy/redux-request/coverage.svg?branch=master)](https://codecov.io/github/jedirandy/redux-request?branch=master)

## Install
```bash
npm install redux-req
```

## A quick example

```javascript
import {ACTION_TYPE} from 'redux-request';

// dispatch an API request
dispatch({
  type: ACTION_TYPE,
  resourceName: 'users'
  url: '/api/users',
  method: 'GET',
  requestType: 'REQUEST_API',
  receiveType: 'RECEIVE_API'
});

```
once a request is dispatched, the middleware will dispatch an action of the specified request type, you can make a reducer to handle this action, for instance, update the loading state for the resource.

when the request is completed, the middleware will dispatch an event of the specified receive type, similarly, a reducer can be used to handle the response, with a result of either failure or success.

## Usage
To dispatch a request middleware aware action, the action should have the following properties:

| prop | type | description |
| -----| ---- | ----------- |
| type | string | **required** should be the type imported (**ACTION_TYPE**) from the middleware |
| resourceName | string | the name of the resource for which you want to send a request, this is necessary for reducers to identify the request|
| url | string | the url of the resource |
| method | string | the method of the request |
| payload | any | the request payload |

## License
MIT