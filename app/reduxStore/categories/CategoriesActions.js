// Action types
import {
	FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from './CategoriesActionTypes';

// Api
import { categoriesApi } from '@api';

/**
 *
 */
export function fetchCategories() {
  return async (dispatch) => {
    // Initiate loading state
    dispatch({type: FETCH_CATEGORIES});

    try {
      // Call api
      const result = await categoriesApi.fetchCategories();

      // Update reducer
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        categories: result
      });
      return true;

    } catch(error) {
      console.log('loadCategories action error: ', error);

      // Update error in reducer on failure
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        error
      });
      return false;
    }
  }
}
