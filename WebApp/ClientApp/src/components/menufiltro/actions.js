import { menuFiltroConstants  } from './constants';
import { alertActions } from '../alert_message/actions';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';

export const menuFiltroActions = {
    obtener_categorias,
    asignar_menu_filtro_active,
    ver_filtro_flotante,
    obtener_subcategorias,
    agregar_items_filtro,
    seleccionar_municipio,
    cambiar_zoom,
    seleccionar_categoria,
    nombre_municipio_seleccionado
};




function seleccionar_categoria(idCategoriaSeleccionada) {
    return {
        type: menuFiltroConstants.SELECIONAR_CATEGORIA,
        idCategoriaSeleccionada
    }

}

function nombre_municipio_seleccionado(nombreMunicipioSeleccionado) {
    return {
        type: menuFiltroConstants.NOMBRE_MUNICIPIO_SELECCIONADO,
        nombreMunicipioSeleccionado
    }

}


function cambiar_zoom(zoomMap) {
    return {
        type: menuFiltroConstants.CAMBIAR_ZOOM_MAP,
        zoomMap
    }

}

function seleccionar_municipio(idMunicipioSeleccionado) {
    return {
        type: menuFiltroConstants.SELECIONAR_MUNICIPIO,
        idMunicipioSeleccionado
    }

}

function ver_filtro_flotante(verFiltroFlotante) {
    return {
        type: menuFiltroConstants.VER_FILTRO_FLOTANTE,
        verFiltroFlotante
    }

}

function agregar_items_filtro(itemsFiltroSeleccionado) {

    return {
        type: menuFiltroConstants.AGREGAR_SUBCATEGORIAS_FILTRO,
        itemsFiltroSeleccionado
    }

}

function obtener_categorias() {
    return dispatch => {

        ServicesHelper.obtener_categorias()
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.result !== null) {
                            dispatch(success(response.Result));
                        } else {
                            dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {
                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(categorias) { return { type: menuFiltroConstants.OBTENER_CATEGORIAS, categorias }; }
}

function asignar_menu_filtro_active(itemActiveClass) {
    return {
        type: menuFiltroConstants.ASIGNAR_ITEM_ACTIVE,
        itemActiveClass
    }

}

function obtener_subcategorias(IdCategoria,context) {
    return dispatch => {

        ServicesHelper.obtener_subcategorias(IdCategoria)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.result !== null) {
                            dispatch(success(response.Result));
                        } else {
                            dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        }

                        context.SelectAll();
                    } else {
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {
                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(categoriasSubcategorias) { return { type: menuFiltroConstants.OBTENER_SUBCATEGORIAS, categoriasSubcategorias }; }
}