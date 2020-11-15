import React, { Component } from 'react';
import './style.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { usuarioActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search } from '@syncfusion/ej2-react-grids';
import AddIcon from '@material-ui/icons/AddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import CrearUsuario from './forms/crear';
import EditarUsuario from './forms/editar';



class Usuario extends Component {

    grid = React.createRef();

    constructor(props) {
        super(props);

        this.searchOptions = {
            fields: ['Codigo', 'Nombres'],
            operator: 'contains'
        };

        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);


    }



    componentDidMount() {

        loader.show();
        this.props.obtener_usuarios();

    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por Nombre ")
    }

    MenuOptionClick(e) {
        if (e.currentTarget.id === "btnNuevoUsuario") {

            this.props.ver_crear_usuario(true);

        } else if (e.currentTarget.id === "btnEditarUsuario") {
            if (this.props.seleccionar_usuario !== 0) {
                this.props.ver_editar_usuario(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizarUsuarios") {
            loader.show();
            this.props.obtener_usuarios();
        }
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }


    rowDeselected(e) {
        if (this.grid) {
            this.props.seleccionar_user(0);
        }
    }
   

    rowSelected() {
        if (this.grid) {

            let usuario = this.grid.current.getSelectedRecords();

            var id = usuario[0].IdUsuario;
            this.props.ver_crear_usuario(false);
            this.props.seleccionar_user(id);

        }
    }

   

    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }


    render() {
    
        const { usuarios, mostrar_crear_usuario, mostrar_editar_usuario } = this.props;
       

        return (
            <div>
                <nav id="nav" className="nav-form navbar">
                    <div className="row col-12" >

                        <div className=" col-sm-12 col-md-6 col-lg-4 center center-vertical" >
                            <h3>Usuarios</h3>
                        </div>

                        <div className=" col-sm-12 col-md-6 col-lg-8 " >
                            <ul >
                                <li>
                                    <button id="btnNuevoUsuario" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
                                        <div>
                                            <AddIcon />
                                        </div>
                                        <div>
                                            <p>Nuevo</p>
                                        </div>
                                    </button>
                                </li>
                                <li >
                                    <button id="btnEditarUsuario" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">

                                        <div>
                                            <EditIcon />
                                        </div>
                                        <div>
                                            <p>Editar</p>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button id="btnActualizarUsuarios" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
                                        <div className="center-vertical">
                                            <div>
                                                <UpdateIcon />
                                            </div>
                                            <div>
                                                <p>Actualizar</p>
                                            </div>
                                        </div>
                                    </button>
                                </li>

                            </ul>
                        </div>


                    </div>

                </nav>

                <div className='wrap-form table-responsive container-fluid'>
                    <GridComponent dataSource={usuarios} ref={this.grid} rowDeselected={this.rowDeselected}  rowSelected={this.rowSelected} toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                        <ColumnsDirective>
                            <ColumnDirective field='Codigo' headerText='Código' width='100' textAlign="Right" />
                            <ColumnDirective field='Nombres' width='200' headerText='Nombre' />
                            <ColumnDirective field='Apellidos' width='200' headerText='Nombre' />
                            <ColumnDirective field='EsActivo' headerText='Activo' width='100' />
                        </ColumnsDirective>
                        <Inject services={[Search, Toolbar]} />
                    </GridComponent>    
                </div>
                {mostrar_crear_usuario ?
                    <CrearUsuario
                        show={mostrar_crear_usuario}
                        onHide={() => this.props.ver_crear_usuario(false)}
                    /> : " "

                }

                {mostrar_editar_usuario ?
                    <EditarUsuario
                        show={mostrar_editar_usuario}
                        onHide={() => this.props.ver_editar_usuario(false)}
                    /> : " "

                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { loggingIn, user, usuarios, mostrar_crear_usuario, mostrar_editar_usuario } = state.authentication;
    return { loggingIn, user, usuarios, mostrar_crear_usuario, mostrar_editar_usuario };
}


const mapDispatchToProps = {
    login: usuarioActions.login,
    showMessage: alertActions.showMessage,
    obtener_usuarios: usuarioActions.obtener_usuarios,
    ver_crear_usuario: usuarioActions.ver_crear_usuario,
    ver_editar_usuario: usuarioActions.ver_editar_usuario,
    seleccionar_user: usuarioActions.seleccionar_user
    
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Usuario));