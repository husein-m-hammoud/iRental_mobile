let apiUrl = 'https://hakawati.fm/api/';
let url = 'https://hakawati.fm/';
if (__DEV__) {
 apiUrl = 'https:/jp.dev.hakawati.fm/api/';
 url = 'https://jp.dev.hakawati.fm/';
}
export const HakawatiUrl = apiUrl;
export const HakawatiWebUrl = url;

export const apikey = 12345;

export const invalidUser = 'Invalid email / password';

export const emailAlreadyExists = 'User with this email already exists';

export const invalidAuth = 'Invalid Auth Token (verify authtoken parameter)';

export const addEpisodeFail = 'Could not create new episode';

export const removeEpisodeFail = [
	'Could not delete epiosde',
	'Episode does not exist'
];

export const updateChannelFail = [
	'Could not update channel',
	'Channel does not exist'
];

export const facebookLoginFail = [
	'Could not login using facebook account',
	'Could not create new user',
	'Could not generate token',
	'Could not save mobile token for User'
];

export const googleLoginFail = [
	'Could not login using google account',
	'Could not create new user',
	'Could not generate token',
	'Could not save mobile token for User'
];

/**
 *
 */
export const removeChannelFail = [
	'Could not delete channel',
	'Channel does not exist'
];

/**
 *
 */
export const preferenceUpdateFailed = 'Could not update user preferences';

/**
 *
 */
export const errorHandler = (error) => {
	console.log('ErrorHandler: ', error.message);
	if (error.message = 'Network request failed') {
		console.log(error.message);
	}
}

