// Action types
import {
	FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from './CategoriesActionTypes';

const categoriesInitialState = {
	categories: [],
  isFetchingCategories: false,
	error: ''
};

export function categoriesReducer(state = categoriesInitialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      return {
        ...state,
        isFetchingCategories: true
      };
    }
    case FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.categories,
        error:'',
        isFetchingCategories: false
      };
    }
    case FETCH_CATEGORIES_FAILURE: {
      return {
      	...state,
				isFetchingCategories: false,
				error: action.error
      };
    }
		default: {
			return state;
		}
	}
}


/**
 *
 */
function _getUpdatedLead(leads, newItem) {
  // Only one lead
  if (!Array.isArray(leads)) {
    let lead = leads;
    if (parseInt(lead.id) === parseInt(newItem.lead.id)) {
      return {
        ...lead,
        ...newItem.lead
      };
    }
  }

	return leads.map((item, index) => {
		// Find lead with matching id
		if (parseInt(item.lead.id) === parseInt(newItem.lead.id)) {
			// Return a new object
			return {
				...item,
				...newItem
			}
		}

		// Leave every other item unchanged
		return item;
	});
}

/**
 *
 */
function _deleteLead(items, leadId) {
	return items.filter((item) =>
		item.lead.id !== leadId
	);
}
