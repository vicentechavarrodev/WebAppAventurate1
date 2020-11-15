import {   municipioConstants  } from './constants';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';



export const municipiosActions = {
    seleccionar_municipio,
    obtener_municipios,
    ver_crear_municipio,
    crear_municipio,
    cargar_editar_municipio,
    ver_editar_municipio,
    editar_municipio,
 
};

function seleccionar_municipio(seleccionar_municipio) {

    return { type: municipioConstants.SELECCIONAR_MUNICIPIO, seleccionar_municipio };

}

function obtener_municipios() {
    return dispatch => {

        ServicesHelper.obtener_municipios()
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }

                    } else {
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };


    function success(municipios) { return { type: municipioConstants.OBTENER_MUNICIPIOS, municipios }; }
}

function cargar_editar_municipio(id, context) {
    return dispatch => {

        ServicesHelper.init_editar_municipio(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {

                            dispatch(success(response.Result));
                            context.setState({ municipio: response.Result });
                            context.cargarMapa();

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


    function success(init_editar_municipio) { return { type: municipioConstants.CARGAR_EDITAR_MUNICIPIO, init_editar_municipio }; }
}

function ver_crear_municipio(mostrar_crear_municipio) {

    return { type: municipioConstants.MOSTRAR_CREATE_MUNICIPIO, mostrar_crear_municipio};

}

function ver_editar_municipio(mostrar_editar_municipio) {

    return { type: municipioConstants.MOSTRAR_EDITAR_MUNICIPIO, mostrar_editar_municipio };

}

function crear_municipio(municipio, context) {
    return dispatch => {


        ServicesHelper.crear_municipio(municipio)
            .then(
                response => {

                    if (response.IsSuccess) {
                    
                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                           
                            context.props.obtener_municipios();


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_municipios();
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };

    function success(municipio_creado) { return { type: municipioConstants.CREAR_MUNICIPIO, municipio_creado }; }


}

function editar_municipio(municipio, context) {
    return dispatch => {


        ServicesHelper.editar_municipio(municipio)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_municipios();
                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage( response.message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };

    function success(municipio_actualizado) { return { type: municipioConstants.EDITAR_MUNICIPIO, municipio_actualizado }; }


}

