import initialState from './initialStates';
import { HeaderConstants } from './constants';

export function HeaderReducer(state = initialState.header_menu, action) {
    switch (action.type) {

        case HeaderConstants.ITEM_MENU_ACTIVE: {
            return {
                ...state, id_item_menu: action.id_item_menu
            }

        }

        default: return state;
    }
}