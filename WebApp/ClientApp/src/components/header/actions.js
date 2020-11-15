import { HeaderConstants } from './constants';


export const HeaderActions = {
    seleccionar_id_item
};

function seleccionar_id_item(id_item_menu) {
    return {
        type: HeaderConstants.ITEM_MENU_ACTIVE,
        id_item_menu
    }
}












