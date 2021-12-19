// Helpers
import { apiCall } from '@api/helper';

// Endpoints
const endpoints = {
	categories: 'api_categories_get',
};



/**
 *
 */
async function fetchCategories() {
  return apiCall('fetchCategories', 'GET', endpoints.categories);
}


export default {
  fetchCategories
}
