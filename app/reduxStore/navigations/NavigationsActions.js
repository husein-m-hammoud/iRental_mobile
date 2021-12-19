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

/**
 *
 */
export function setFromScreen(screen) {
    
  return  (dispatch) => {
    dispatch({
      type: SET_FROM_SCREEN,
      screen
    });
  }
}

/**
 *
 */
export function setPostLoginScreenAndParams(navigationParams = {}) {
    
  return  (dispatch) => {
    dispatch({
      type: SET_POST_LOGIN_SCREEN_AND_PARAMS,
      navigationParams
    });
  }
}

/**
 *
 */
export function setPrevAndActiveScreens(prevScreen, activeScreen, activeParentScreen) {
    
  return  (dispatch) => {
    dispatch({
      type: SET_PREV_AND_ACTIVE_SCREENS,
      prevScreen,
      activeScreen,
      activeParentScreen
    });
  }
}

/**
 *
 */
export function resetPostLoginScreen() {
    
  return  (dispatch) => {
    dispatch({ type: RESET_POST_LOGIN_SCREEN });
  }
}

/**
 *
 */
export function setActiveParentScreen(screen) {
    
  return  (dispatch) => {
    dispatch({
      type: SET_ACTIVE_PARENT_SCREEN,
      screen
    });
  }
}

/**
 *
 */
export function setActiveScreen(screen) {
    
  return  (dispatch) => {
    dispatch({
      type: SET_ACTIVE_SCREEN,
      screen
    });
  }
}

/**
 *
 */
export function setPrevScreen(screen) {
    
  return  (dispatch) => {
    dispatch({
      type: SET_PREV_SCREEN,
      screen
    });
  }
}
