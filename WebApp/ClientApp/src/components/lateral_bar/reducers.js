import initialState from './initialStates';
import { LateralMenuConstants } from './constants';

export function lateralMenuReducer(state = initialState.lateral_menu, action) {
    switch (action.type) {

        case LateralMenuConstants.LATERAL_MENU_ACTIVE: {
            return {
                ...state, menuLateralVisible: action.menuLateralVisible
            }

        }

        default: return state;
    }
}