import { mapsConstants } from './constants';
import { alertActions } from '../alert_message/actions';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';

export const mapsActions = {
    location_user,
    address_user,
    obtener_sedes,
    seleccionar_empresa,
    ver_info_empresa,
    ver_menu_busqueda,
    guardar_mapa,
    guardar_layer_seleccionado,
    guardar_posicion_central,
    obtener_municipio,
    obtener_sede
};

 function obtener_municipio(IdMunicipio) {
    return dispatch => {

        ServicesHelper.obtener_municipio(IdMunicipio)
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


    function success(municipio) { return { type: mapsConstants.OBTENER_MUNICIPIO, municipio }; }
}


function obtener_sede(IdSede,context) {
    return dispatch => {

        ServicesHelper.obtener_sede(IdSede)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ sede: response.Result });
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


    function success(sede) { return { type: mapsConstants.OBTENER_SEDE, sede }; }
}

function guardar_posicion_central(centerInitial) {
    return {
        type: mapsConstants.GUARDAR_POSICION_CENTRAL,
        centerInitial
    }

}


function guardar_layer_seleccionado(layerSeleccionado) {
    return {
        type: mapsConstants.GUARDAR_LAYER_SELECCIONADO,
        layerSeleccionado
    }

}


function guardar_mapa(map) {
    return {
        type: mapsConstants.GUARDAR_MAPA,
        map
    }

}

function location_user(user_location) {
    return {
        type: mapsConstants.USER_LOCATION,
        user_location
    }

}

function address_user(user_address) {
    return {
        type: mapsConstants.USER_ADDRESS,
        user_address
    }

}

function ver_info_empresa(verInforEmpresa) {
    return {
        type: mapsConstants.VER_INFO_EMPRESA,
        verInforEmpresa
    }

}

function ver_menu_busqueda(verMenuBusqueda) {
    return {
        type: mapsConstants.VER_MENU_BUSQUEDA,
        verMenuBusqueda
    }

}




function obtener_sedes(CategoriasSubcategorias, IdMunicipio ,context) {
    return dispatch => {

        ServicesHelper.obtener_sedes(CategoriasSubcategorias, IdMunicipio)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
                            context.forceUpdate();
                            dispatch(success(response.Result));
                            
                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };


    function success(sedes) { return { type: mapsConstants.OBTENER_SEDES, sedes }; }
}

function seleccionar_empresa(idEmpresaseleccionada) {
    return {
        type: mapsConstants.EMPRESA_SELECCIONADA,
        idEmpresaseleccionada
    }

}

