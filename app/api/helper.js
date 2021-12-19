// Libraries
import { Platform } from 'react-native';
import * as Sentry from '@sentry/react-native'
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage';

// Objects
import * as apiConfig from './config.js';
import { isEmpty } from '@helpers/utilities';

// Stores
import { store } from '@stores/rootStore';

// Actions
import { handleLogOut } from '@stores/users/UsersActions';

let testApiName = '';

/**
 *
 */
export const apiCall = async (
  apiName,
  method,
  endpoint,
  fields = {},
  headers = {}
) => {

  const { authToken } = store.getState().usersReducer;
  let apikey = apiConfig.apikey;
  let hakVersion = DeviceInfo.getVersion();

  // Build query string
  let queryString = `deviceOS=${Platform.OS}&&`;
  queryString += !isEmpty(hakVersion)
  ? `hakVersion=${hakVersion}&&` : '';
  queryString += !isEmpty(authToken)
    ? `authtoken=${encodeURIComponent(authToken)}&&` : '';
	queryString += !isEmpty(apikey)
    ? `apikey=${encodeURIComponent(apikey)}&&` : '';

  let body = null;
  switch (method) {
    case 'GET':{
			for (let key in fields) {
				queryString += `${key}=${encodeURIComponent(fields[key])}&&`;
			}
			break;
    }
    case 'POST':{
      body = new FormData();
			for (let key in fields) {
				body.append(key, fields[key]);
			}
      break;
    }
		case 'PUT':
		case 'DELETE':{
      body = JSON.stringify(fields);
      break;
    }
  }

	if (!isEmpty(queryString)) {
    queryString = queryString.substring(0, queryString.length - 2);
  }

  if (__DEV__) {
  //console.log('queryString: ', queryString);
  //console.log('body: ', body);
  //console.log('url: ', `${apiConfig.HakawatiUrl}/${endpoint}?`);
  }
  return fetch(
    `${apiConfig.HakawatiUrl}/${endpoint}?`
    + queryString,
    {
      method,
      headers,
      body,
    }
  )
    .then(async (response) => {
      console.log(`${apiName} api response: `, response);
			if (apiName === testApiName) {
				return response.text();
			}
      let successful = await isSuccessfulApiResponse(apiName, response);
      if (successful) {
        return response.json();
      }
    })
    .then((responseJson) => {
      let result = handleApiResponse(`${apiName}`, responseJson);
      return result;
    })
    .catch((error) => { errorHandler(error, apiName)});
}

/**
 *
 */
export const errorHandler = (error, apiName) => {
  if (error.status && error.status !== 'success'){
    if (!isEmpty(error.results.errorMessage)) {
      throw error.results.errorMessage;
    }
    throw error.results;
  }
	console.log(`Api error handler ${apiName}: `, error.message);

	if (error.message = 'Network request failed') {
		console.log(error.message);
		return;
	}

    Sentry.captureMessage(`Api error : ${error.message}`, 'error');
}

/**
 *
 */
export const isSuccessfulApiResponse = async (apiName, response) => {
  switch (response.status) {
    case 403:
		case 404:
    case 405:
    case 422: {
      let jsonResponse = await response.json();
      console.log(`${apiName} failed json response: `, jsonResponse);
      throw jsonResponse;
      return false
    }
    default: {
      return true;
    }
  }
}

/**
 *
 */
export const handleApiResponse = (apiName, responseJson) => {

  try {
    let invalidToken = 'Invalid Auth Token';
    console.log(`${apiName} api json response: `, responseJson);

    // Invalid token
    if (
      ('string' === typeof responseJson.status)
      && responseJson.status.includes(invalidToken)
    ) {
      store.dispatch(handleLogOut());
			Sentry.captureMessage(`${apiName} Invalid auth token`, 'warning');
			return false;
    }

    // failed api call
    if ('success' !== responseJson.status) {

			let failedResponse = JSON.stringify(responseJson);
      Sentry.captureMessage(`${apiName} api response error: ${failedResponse}`, 'error');
      return false;
    }

  } catch(error) {

		// Error handler
    console.log('handleApiResponse error: ', error);
    Sentry.captureMessage(`${apiName} api response error: ${JSON.stringify(error)}`, 'error');
		return false;
  }

  return responseJson.results;
}
