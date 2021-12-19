// Action types
import {
  SET_FROM_SCREEN,
  SET_ACTIVE_SCREEN,
  SET_PREV_SCREEN,
  SET_POST_LOGIN_SCREEN_AND_PARAMS,
  SET_PREV_AND_ACTIVE_SCREENS,
  RESET_POST_LOGIN_SCREEN,
  SET_ACTIVE_PARENT_SCREEN,
} from './NavigationsActionTypes';


const navigationInitialState = {
  fromScreen: '',
  activeScreen: 'Home',
  prevScreen: '',
  activeParentScreen: 'Home',
  postLoginScreen: null,
  postLoginNavParams: {}
};

export function navigationsReducer(state = navigationInitialState, action) {
  switch (action.type) {
    case SET_FROM_SCREEN: {
      return {
        ...state,
        fromScreen: action.screen
      };
    }
    case SET_ACTIVE_SCREEN: {
      return {
        ...state,
        activeScreen: action.screen
      };
    }
    case SET_PREV_SCREEN: {
      return {
        ...state,
        prevScreen: action.screen
      };
    }
    case SET_POST_LOGIN_SCREEN_AND_PARAMS: {
      return {
        ...state,
        postLoginScreen: state.activeScreen,
        postLoginNavParams: action.navigationParams
      };
    }
    case RESET_POST_LOGIN_SCREEN: {
      return {
        ...state,
        postLoginScreen: '',
        postLoginNavParams: {}
      };
    }
    case SET_PREV_AND_ACTIVE_SCREENS: {
      return {
        ...state,
        prevScreen: action.prevScreen,
        activeScreen: action.activeScreen,
        activeParentScreen: action.activeParentScreen
      };
    }
    case SET_ACTIVE_PARENT_SCREEN: {
      return {
        ...state,
        activeParentScreen: action.screen
      };
    }
		default: {
			return state;
		}
	}
}


