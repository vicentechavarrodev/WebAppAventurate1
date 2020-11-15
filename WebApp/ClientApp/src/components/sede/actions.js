import { sedeConstants } from './constant';
import { ServicesHelper } from './services';
import { alertActions } from '../alert_message/actions';
import { loader } from '../helpers/loader';

export const SedeActions = {
    cargar_editar_sede,
    ver_crear_sede,
    ver_editar_sede,
    sede_seleccionada,
    crear_sede,
    editar_sede,
    cargar_crear_sede,
    cargar_subcategorias

};

function cargar_crear_sede() {
    return dispatch => {

        ServicesHelper.init_crear_sede()
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


    function success(init_crear_sede) { return { type: sedeConstants.CARGAR_CREAR_SEDE, init_crear_sede }; }
}


function cargar_editar_sede(id, context) {
    return dispatch => {

        ServicesHelper.init_editar_sede(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {

                          

                            dispatch(success(response.Result));
                            
                            context.setState({ sede: response.Result, CategoriasSubcategorias: response.Result.CategoriasSubcategorias, IdCategoriaSubcategoria: response.Result.IdCategoriaSubcategoria });
                            
                           
                            

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


    function success(init_editar_sede) { return { type: sedeConstants.CARGAR_EDITAR_SEDE, init_editar_sede}; }
}


function ver_crear_sede(mostrar_crear_sede) {

    return { type: sedeConstants.MOSTRAR_CREATE_SEDE, mostrar_crear_sede };

}

function sede_seleccionada(id_sede_seleccionada) {

    return { type: sedeConstants.SEDE_SELECCIONADA, id_sede_seleccionada };

}

function ver_editar_sede(mostrar_editar_sede) {

    return { type: sedeConstants.MOSTRAR_EDITAR_SEDE, mostrar_editar_sede };

}


function crear_sede(sede,user, context) {
    return dispatch => {


        ServicesHelper.crear_sede(sede)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage( response.Message, true, 'Hecho'));
                            context.props.obtener_empresas(user.IdUsuario, user.IdRole);
                            context.props.ver_crear_sede(false);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
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

    function success(sede_creada) { return { type: sedeConstants.CREAR_SEDE, sede_creada }; }


}


function editar_sede(sede,user, context) {
    return dispatch => {


        ServicesHelper.editar_sede(sede)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage( response.Message, true, 'Hecho'));
                            context.props.obtener_empresas(user.IdUsuario, user.IdRole);
                            context.props.ver_editar_sede(false);
                            context.props.sede_seleccionada(0);


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

    function success(sede_actualizada) { return { type: sedeConstants.EDITAR_SEDE, sede_actualizada }; }


}


function cargar_subcategorias(id, context) {
    return dispatch => {

        ServicesHelper.obtener_cate_subcategoria(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {
                            context.setState({
                                CategoriasSubcategorias: response.Result
                            });

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



}

