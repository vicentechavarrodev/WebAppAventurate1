import { empresaConstants } from './constant';
import { ServicesHelper } from './services';
import { alertActions } from '../alert_message/actions';
import { loader } from '../helpers/loader';

export const EmpresaActions = {
    obtener_empresas,
    cargar_crear_empresa,
    cargar_editar_empresa,
    ver_crear_empresa,
    ver_editar_empresa,
    empresa_seleccionada,
    crear_empresa,
    editar_empresa
};

function obtener_empresas() {
    return dispatch => {

        ServicesHelper.obtener_empresas()
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
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
            error => {
                loader.hide();
                console.log(error);
                dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
               
            }
            );
    };


    function success(empresas) { return { type: empresaConstants.CARGAR_EMPRESAS, empresas }; }
}

function cargar_crear_empresa() {
    return dispatch => {

        ServicesHelper.init_crear_empresa()
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
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };


    function success(init_crear_empresa) { return { type: empresaConstants.CARGAR_CREATE_EMPRESA, init_crear_empresa }; }
}

function cargar_editar_empresa(id, context) {
    return dispatch => {

        ServicesHelper.init_editar_empresa(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {

                          

                            dispatch(success(response.Result));
                            context.setState({ empresa: response.Result });

                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(init_editar_empresa) { return { type: empresaConstants.CARGAR_EDITAR_EMPRESA, init_editar_empresa}; }
}


function ver_crear_empresa(mostrar_crear_empresa) {

    return { type: empresaConstants.MOSTRAR_CREATE_EMPRESA, mostrar_crear_empresa };

}

function empresa_seleccionada(id_empresa_seleccionada) {

    return { type: empresaConstants.EMPRESA_SELECCIONADA, id_empresa_seleccionada };

}

function ver_editar_empresa(mostrar_editar_empresa) {

    return { type: empresaConstants.MOSTRAR_EDITAR_EMPRESA, mostrar_editar_empresa };

}


function crear_empresa(empresa,user, context) {
    return dispatch => {


        ServicesHelper.crear_empresa(empresa)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage( response.Message, true, 'Hecho'));
                            context.props.obtener_empresas(user.IdUsuario, user.IdRole);
                            context.props.ver_crear_empresa(false);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
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

    function success(empresa_creada) { return { type: empresaConstants.CREAR_EMPRESA, empresa_creada }; }


}


function editar_empresa(empresa,user, context) {
    return dispatch => {


        ServicesHelper.editar_empresa(empresa)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(empresaConstants.EDITAR_EMPRESA + ' : ' + response.Message, true, 'Hecho'));
                            context.props.obtener_empresas(user.IdUsuario, user.IdRole);
                            context.props.ver_editar_empresa(false);
                            console.log(context.props);
                            context.props.empresa_seleccionada(0);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
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

    function success(empresa_actualizada) { return { type: empresaConstants.EDITAR_EMPRESA, empresa_actualizada }; }


}

