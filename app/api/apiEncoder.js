// Libraries
import { Platform } from 'react-native';
import humps from 'humps';

// Stores
import userStore from 'app/stores/User';
import { isEmpty } from 'app/helpers/utilities';

/**
 *
 */
export function getApiFields(fields) {
  return humps.decamelizeKeys(fields); 
}

/**
 *
 */
export async function augmentRegistrationIds(apiFields) {
  // Get push token
	let pushToken = await userStore.getPushToken();

	// Add android push registation id
	if (!isEmpty(pushToken) && pushToken['os'] === 'android') {
		apiFields = {...apiFields, fcm_registration_id: pushToken.token};
	}

	// Add ios push registation id
	if (!isEmpty(pushToken) && pushToken['os'] === 'ios') {
		apiFields = {...apiFields, ios_registration_id: pushToken.token};
	}

  return apiFields;
}

/**
 *
 */
export const updateEpisodeElapsedTimeAPIFormatter = (fields) => {

	let formData = new FormData();
	formData.append('episode_id', fields.episodeId);
	formData.append('elapsed_time', fields.elapsedTime);

	return formData;
}

/**
 *
 */
export const facebookLoginAPIFormatter = (fields) => {
	console.log('Fields: ', fields);
}

/**
 *
 */
export const getGoogleLoginApiFields = async (fields) => {
	let pushToken = await userStore.getPushToken();
	let apiFields = {
		email: fields.email,
		firstname: fields.firstname,
		lastname: fields.lastname,
		google_accesstoken: fields.google_accesstoken,
		google_userid: fields.google_userid,
	};

	// Add push registation id accordingly
	if (!isEmpty(pushToken) && pushToken['os'] === 'android') {
		apiFields = {...apiFields, fcm_registration_id: pushToken.token};
	}
	if (!isEmpty(pushToken) && pushToken['os'] === 'ios') {
		apiFields = {...apiFields, ios_registration_id: pushToken.token};
	}

	return apiFields;
}

/**
 *
 */
export const googleLoginAPIFormatter = async (fields) => {

	let pushToken = await userStore.getPushToken();
	let formData = new FormData();

	formData.append('email', fields['email']);
	formData.append('name', fields['name']);
	formData.append('google_accesstoken', fields['google_accesstoken']);
	formData.append('google_userid', fields['google_userid']);

	// Add push registation id accordingly
	if (!isEmpty(pushToken) && pushToken['os'] === 'android') {
		formData.append('fcm_registration_id', pushToken['token']);
	}
	if (!isEmpty(pushToken) && pushToken['os'] === 'ios') {
		formData.append('ios_registration_id', pushToken['token']);
	}

	return formData;
}

/**
 *
 */
export const hakawatiLoginAPIFormatter = async (fields) => {

	let pushToken = await userStore.getPushToken();
	let formData = new FormData();

	formData.append('email', fields['email']);
	formData.append('password', fields['password']);

	// Add push registation id accordingly
	if (!isEmpty(pushToken) && pushToken['os'] === 'android') {
		formData.append('fcm_registration_id', pushToken['token']);
	}
	if (!isEmpty(pushToken) && pushToken['os'] === 'ios') {
		formData.append('ios_registration_id', pushToken['token']);
	}

	return formData;
}

/**
 *
 */
export const getRegisterUserApiFields = (fields) => {
	let apiFields = {
		email: fields.email,
		password: fields.password,
		firstname: fields.firstName,
		lastname: fields.lastName,
		language: fields.language 
	};

	return apiFields;
}

/**
 *
 */
export const getAddToPlaylogApiFields = (fields) => {
	let apiFields = {
		channel_id: fields.channelId,
		episode_id: fields.episodeId,
		source: 'mobile',
		ip_address: fields.ipAddress
	};

	return apiFields;
}

/**
 *
 */
export const getEpisodeLikeApiFields = (fields) => {
	let apiFields = {
		channel_id: fields.channelId,
		episode_id: fields.episodeId,
	};

	return apiFields;
}

/**
 *
 */
export const getEpisodeUnlikeApiFields = (fields) => {
	let apiFields = {
		channel_id: fields.channelId,
		episode_id: fields.episodeId,
	};

	return apiFields;
}

/**
 *
 */
export const getSendChannelCommentApiFields = (fields) => {
	const { channelId, commentText, commentReplyTo } = fields;
	let apiFields = {
		channel_id: channelId,
		comment: commentText,
	};

	if (!isEmpty(commentReplyTo)) {
		apiFields = { ...apiFields, reply_to: commentReplyTo };
	}

	return apiFields;
}

/**
 *
 */
export const getSendEpisodeCommentApiFields = (fields) => {
	const { episodeId, channelId, commentText, commentReplyTo } = fields;
	let apiFields = {
		episode_id: episodeId,
		channel_id: channelId,
		comment: commentText,
	};

	if (!isEmpty(commentReplyTo)) {
		apiFields = { ...apiFields, reply_to: commentReplyTo };
	}

	return apiFields;
}

/**
 *
 */
export const getUpdateAccountInfoApiFields = (fields) => {
	let apiFields = {};
	for (let field of fields) {
		let key = field.key;
		let value = field.value;
		apiFields = { ...apiFields, key: value };
	}

	return apiFields;
}

/**
 *
 */
export const getDeleteCommentApiFields = (fields) => {
	let apiFields = {
    comment_id: fields.commentId
	};

  return apiFields;
}

/**
 *
 */
export const getCommentLikeApiFields = (fields) => {
	let apiFields = {
		comment_id: fields.commentId,
		channel_id: fields.channelId,
	};

	if (!isEmpty(fields.episodeId)) {
		apiFields = {...apiFields, episode_id: fields.episodeId};
	}

	return apiFields;
}

/**
 *
 */
export const getCommentUnlikeApiFields = (fields) => {
	let apiFields = {
		comment_id: fields.commentId,
		channel_id: fields.channelId,
	};

	if (!isEmpty(fields.episodeId)) {
		apiFields = {...apiFields, episode_id: fields.episodeId};
	}

	return apiFields;
}

/**
 *
 */
export const getSendChannelAudioCommentApiFields = (fields) => {
	let apiFields = getSendChannelCommentApiFields(fields);
	let fileItem = getFileItem(fields);

	apiFields = {
		...apiFields,
		file: {...fileItem},
		user_id: fields.userId,
		file_path: fields.filePath,
		size: fields.fileSize+'',
		name: fields.file,
		duration: fields.duration+'',
		title: fields.title,
		source: fields.source,
		//device_details: fields.device_details,
		recorded_date: fields.recordedDate
	};
	return apiFields;
}

export const getFileItem = (fields) => {
	let fileItem = {
		uri: fields.filePath,
		type: 'audio/x-aac',
		name: fields.file
	};

	// Prefix uri with file:// if android
	if (Platform.OS === 'android') {
		fileItem = {
			...fileItem,
			uri: 'file://' + fields.filePath,
		};
	}

	return fileItem;
}

/**
 *
 */
export const getSendEpisodeAudioCommentApiFields = (fields) => {
	let apiFields = getSendEpisodeCommentApiFields(fields);
	let fileItem = getFileItem(fields);

	apiFields = {
		...apiFields,
		file: {...fileItem},
		user_id: fields.userId,
		file_path: fields.filePath,
		size: fields.fileSize+'',
		name: fields.file,
		duration: fields.duration+'',
		title: fields.title,
		source: fields.source,
		//device_details: fields.device_details,
		recorded_date: fields.recordedDate
	};
	return apiFields;
}

/**
 *
 */
export const getReportCommentApiFields = (fields) => {
	let apiFields = {
		comment_id: fields.commentId,
		report_type_id: fields.reportTypeId,
	};

	return apiFields;
}

/**
 *
 */
export const getFetchEpisodeCommentsApiFields = (fields) => {
	let apiFields = {
		channel_id: fields.channelId,
		episode_id: fields.episodeId,
		offset: fields.offset,
    limit: fields.limit
	};

	if (!isEmpty(fields.comment_id)) {
		apiFields = {
			...apiFields,
			comment_id: fields.commentId,
		};
	}

	return apiFields;
}

/**
 *
 */
export const getFetchChannelCommentsApiFields = (fields) => {
	let apiFields = {
		channel_id: fields.channelId,
    offset: fields.offset,
    limit: fields.limit
	};

	if (!isEmpty(fields.comment_id)) {
		apiFields = {
			...apiFields,
			comment_id: fields.commentId,
		};
	}

	return apiFields;
}

/**
 *
 */
export const getFetchCommentTreeListApiFields = (fields) => {
	let apiFields = {
		channel_id: fields.channelId,
		comment_id: fields.commentId,
	};
	return apiFields;
}

/**
 *
 */
export const getFetchEpisodesApiFields = (fields) => {
  let apiFields = {
    channel_id: fields.channelId,
    order: fields.order,
    offset: fields.offset,
  };

  if (!isEmpty(fields.nextEpisodePubDate)) {
    apiFields = { 
      ...apiFields,
      next_episode_pub_date: fields.nextEpisodePubDate
    };
  }

  return apiFields;
}

/**
 *
 */
export const getLogInUserApiFields = async (fields) => {
	let apiFields = {
		email: fields.email,
		password: fields.password,
	};

	// Add push registation id accordingly
	let pushToken = await userStore.getPushToken();
	if (!isEmpty(pushToken) && pushToken['os'] === 'android') {
		apiFields = { ...apiFields, fcm_registration_id: pushToken['token']};
	}
	if (!isEmpty(pushToken) && pushToken['os'] === 'ios') {
		apiFields = { ...apiFields, ios_registration_id: pushToken['token']};
	}

	return apiFields;
}
