// Action types
import {
  SET_LANGUAGE
} from './LanguagesActionTypes';

// Import Languages
import * as Languages from './utils';

const languageInitialState = {
  language: Languages.English
};

export function languagesReducer(state = languageInitialState, action) {
  switch (action.type) {
    case SET_LANGUAGE: {
      return {
        language: Languages.action.language
      };
    }
		default: {
      return {
        language: Languages.English
      };
		}
	}
}
