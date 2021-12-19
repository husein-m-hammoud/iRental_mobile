// Action types
import {
  SET_LANGUAGE
} from './LanguagesActionTypes';

/**
 *
 */
export function setLanguage(language) {
    
  return  (dispatch) => {
    dispatch({
      type: SET_LANGUAGE,
      language
    });
  }
}
