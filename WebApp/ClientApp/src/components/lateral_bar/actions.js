import { LateralMenuConstants } from './constants';


export const LateralMenuActions = {
    lateral_menu_visible
};

function lateral_menu_visible(menuLateralVisible) {
    return {
        type: LateralMenuConstants.LATERAL_MENU_ACTIVE,
        menuLateralVisible
    }
}












