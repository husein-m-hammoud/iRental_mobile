// Helpers
import { apiCall } from '@api/helper';
import { 
  getFetchChannelCommentsApiFields, 
  getSendChannelCommentApiFields,
  getCommentLikeApiFields
} from '@api/apiEncoder';

// Stores
import { store } from '@stores/rootStore';

// AuthToken
const { authToken } = store.getState().usersReducer;

// Endpoints
const endpoints = {
	channels: 'api_channels_get_v2',
	channelComments: 'api_get_channel_comments_v2',
  channelSubscribe: 'api_channel_subscribe',
  channelUnsubscribe: 'api_channel_unsubscribe',
  addChannelComments: 'api_add_channel_comment_v2',
  userChannel: 'api_get_user_channels', 
  addChannel: 'api_add_channel',
  removeChannel: 'api_remove_channel',
  updateChannel: 'api_update_channel',
};



/**
 *
 */
async function updateChannel(fields) {
  let apiFields = { 
    ...fields, 
    authToken 
  }; 
  let headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      };
  return apiCall('UpdateChannel', 'POST', endpoints.updateChannel, apiFields, headers);
}

/**
 *
 */
async function removeChannel(channelId) {
  let apiFields = { 
    id: channelId, 
    authToken 
  }; 
  let headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      };
  return apiCall('removeChannel', 'POST', endpoints.removeChannel, apiFields, headers);
}

/**
 *
 */
async function addChannel(fields) {
  let apiFields = { 
    ...fields, 
    authToken 
  }; 
  let headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      };
  return apiCall('addChannel', 'POST', endpoints.addChannel, apiFields, headers);
}

/**
 *
 */
async function getUserChannels() {
  let apiFields = { authToken }; 
  let headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      };
  return apiCall('getUserChannel', 'POST', endpoints.userChannel, apiFields, headers);
}

/**
 *
 */
async function sendChannelComment(fields) {
  let apiFields = getSendChannelCommentApiFields(fields);
  return apiCall('sendChannelComment', 'POST', endpoints.addChannelComments, apiFields);
}

/**
 *
 */
async function channelUnsubscribe(channelId) {
  let apiFields = { channel_id: channelId };
  return apiCall('channelUnsubscribe', 'POST', endpoints.channelUnsubscribe, apiFields);
}

/**
 *
 */
async function channelSubscribe(channelId) {
  let apiFields = { channel_id: channelId };
  return apiCall('channelSubscribe', 'POST', endpoints.channelSubscribe, apiFields);
}

/**
 *
 */
async function  fetchChannels(fields) {
  let apiFields = { 
    category_id: fields.categoryId, 
    offset: fields.offset 
  };
  return apiCall('fetchChannels', 'GET', endpoints.channels, apiFields);
}

/**
 *
 */
async function fetchChannelComments(fields) {
  let apiFields = getFetchChannelCommentsApiFields(fields);
  return apiCall('fetchChannelComments', 'GET', endpoints.channelComments, apiFields);
}


export default {
  fetchChannels,
  fetchChannelComments,
  channelSubscribe,
  channelUnsubscribe,
  sendChannelComment,
  addChannel,
  removeChannel,
  updateChannel,
  getUserChannels,
}
