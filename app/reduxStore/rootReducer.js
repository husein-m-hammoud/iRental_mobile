// Libraries
import { combineReducers } from 'redux';

// Reducers
import { languagesReducer } from './languages/LanguagesReducers';
import { categoriesReducer } from './categories/CategoriesReducers';

const rootReducers = combineReducers({
  languagesReducer,
  categoriesReducer,
});

export default rootReducers;

