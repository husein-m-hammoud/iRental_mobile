/**
 *
 */
export const urlPrefix = 'https://hakawati.fm';

/**
 *
 */
export const isEmpty = (variable) => {

	if (variable === true) {
		return false;
	}

	if (variable === false) {
		return true;
	}

	if (Array.isArray(variable)) {
		return variable.length === 0;
	}

	if (variable === undefined || variable === null) {
		return true;
	}

	if (typeof variable === 'string' && variable === '') {
		return true;
	}

	if (typeof variable === 'object') {
		return (Object.entries(variable).length === 0 &&
			!(variable instanceof Date));
	}

	return false;
}

