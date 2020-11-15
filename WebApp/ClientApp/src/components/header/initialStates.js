const header_menu_initial_state = {

    header_menu: {
        id_item_menu: localStorage.getItem('item_menu_header') !== null ? localStorage.getItem('item_menu_header'): 'inicio'
    }
}

export default header_menu_initial_state;