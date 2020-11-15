import React, { Component } from 'react';
import { loader } from '../helpers/loader';
import { connect } from 'react-redux';
import { alertActions } from '../alert_message/actions';
import { withRouter } from "react-router-dom";
import { EmpresaActions  } from './actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search, DetailRow} from '@syncfusion/ej2-react-grids';
import AddIcon from '@material-ui/icons/AddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import CrearEmpresa from './ventanas_emergentes/crear';
import EditarEmpresa from './ventanas_emergentes/editar';
import CrearSede from '../sede/ventanas_emergentes/crear';
import EditarSede from '../sede/ventanas_emergentes/editar';
import { SedeActions } from '../sede/actions';


class Empresa extends Component {

    grid = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            sede: {
                IdSede: '',
                Nombre: '',
                Telefono: '',
                IdEmpresa: ''
            },
            IdEmpresaSeleccionada: 0,
            IdSedeSeleccionada:0
        };

        let context = this;

        

        this.searchOptions = {
            fields: ['Nombre'],
            operator: 'contains'
        };

        this.childGridOptions = {
          
            columns: [
                { field: 'IdSede', isPrimaryKey: true, headerText: 'IdSede', textAlign: 'Right', width: 120, visible: false},
                { field: 'Nombre', headerText: 'Nombre', textAlign: 'Right', width: 250 },
                { field: 'Telefono', headerText: 'Teléfono', width: 150, textAlign: 'Right' },
                { field: 'NombreTipoSede', headerText: 'NombreTipoSede', width: 150, textAlign: 'Right' }

                
               
            ],
            toolbar: [{ tooltipText: 'Crear Sede', id: 'crear', prefixIcon: 'e-create' }, { tooltipText: 'Editar Sede', id: 'editar', prefixIcon: 'e-edit' }],
            load() {
             
                this.dataSource = this.parentDetails.parentRowData.sedesEmpresa;
            },
            queryString: 'IdEmpresa',
            toolbarClick(args) {
                let sede = this.getSelectedRecords();

                if (args.item.id === 'crear') {
                    context.setState({ IdEmpresaSeleccionada: this.parentDetails.parentKeyFieldValue });
                    context.props.ver_crear_sede(true);
                } else if (args.item.id === 'editar') {
                    if (sede.length !== 0) {
                        context.props.sede_seleccionada(sede[0].IdSede);
                        context.props.ver_editar_sede(true);
                    } else {
                        context.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
                    }
                } else if (args.item.id === 'ver') {
                    if (sede.length !== 0) {
                           localStorage.setItem('codigoSede', sede[0].IdSede);
                           
                          
                       
                        } else {
                            context.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
                        

                    }
                }
               
            }
          
        };

        this.collapseAll = this.collapseAll.bind(this);
        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
      
    }

   
   

    componentDidMount() {
        loader.show();
        this.cargarItemsMenu();
    }

    cargarItemsMenu() {
        loader.show();
        this.props.obtener_empresas();
    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por  Nombre Empresa");
    }

    MenuOptionClick(e) {
        if (e.currentTarget.id === "btnNuevaEmpresa") {

            this.props.ver_crear_empresa(true);
        } else if (e.currentTarget.id === "btnEditarEmpresa") {

            
            if (localStorage.getItem('idEmpresaSeleccionada') > 0) {
                this.props.ver_editar_empresa(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizarEmpresa") {
            loader.show();
            this.props.obtener_empresas();
        }
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }

    rowSelected() {
        
        if (this.grid) {

            let empresa = this.grid.current.getSelectedRecords();

            localStorage.setItem('idEmpresaSeleccionada', empresa[0].IdEmpresa);
            

        }
    }

    

    rowDeselected() {
        if (this.grid) {
            localStorage.setItem('idEmpresaSeleccionada', 0);
        }
    }



   
    collapseAll(args) {
        let tgt = args.target;

        if (tgt.closest('.e-grid').getAttribute('id') !== this.grid.current.element.getAttribute('id')) {
           //
         
        } else if (tgt.classList.contains('e-dtdiagonalright') || tgt.classList.contains('e-detailrowcollapse')) {
          
            this.grid.current.detailRowModule.collapseAll();
        } else if (tgt.classList.contains('e-dtdiagonaldown') || tgt.classList.contains('e-detailrowexpand')) {
            this.grid.current.detailRowModule.collapseAll();
            let index = this.grid.current.getRowObjectFromUID(tgt.closest('.e-row').getAttribute('data-uid')).index;
            this.grid.current.detailRowModule.expand(index);
            this.grid.current.selectRow(index);
            
        }
    
    }

    NombreUsuarioFormatter(field, data, column) {
        return data['NombreUsuario'] + ' ' + data['ApellidoUsuario'];
    }

    render() {
      
        const { user, empresas, mostrar_crear_empresa, mostrar_editar_empresa, mostrar_crear_sede, mostrar_editar_sede } = this.props;


       
        return (
            <div>
                <nav id="nav" className="nav-form navbar  ">
                    <div className="row col-12" >

                        <div className=" col-sm-12 col-md-6 col-lg-4 center center-vertical" >
                            <h3>Empresas</h3>
                        </div>

                        <div className=" col-sm-12 col-md-6 col-lg-8 " >
                            <ul >
                                <li>
                                    <button id="btnNuevaEmpresa" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
                                        <div>
                                            <AddIcon />
                                        </div>
                                        <div>
                                            <p>Nuevo</p>
                                        </div>
                                    </button>
                                </li>
                                <li >
                                    <button id="btnEditarEmpresa" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">

                                        <div>
                                            <EditIcon />
                                        </div>
                                        <div>
                                            <p>Editar</p>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button id="btnActualizarEmpresa" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
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
                    <GridComponent dataSource={empresas} ref={this.grid} onClick={this.collapseAll} childGrid={this.childGridOptions} rowSelected={this.rowSelected} rowDeselected={this.rowDeselected} toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} height={315}>
                        <ColumnsDirective>
                            <ColumnDirective field='Nombre' headerText='Nombre' width='200' textAlign='Right' />
                            <ColumnDirective field='esActiva' headerText='Activa' width='50' />
                          
                        </ColumnsDirective>
                        <Inject services={[DetailRow, Search, Toolbar]} />
                    </GridComponent>
                </div>
                {mostrar_crear_empresa  ?
                    <CrearEmpresa
                        show={this.props.mostrar_crear_empresa}
                        onHide={() => this.props.ver_crear_empresa(false)}
                    />  : " "

                }

                {mostrar_editar_empresa ?
                    <EditarEmpresa
                        show={this.props.mostrar_editar_empresa}
                        onHide={() => this.props.ver_editar_empresa(false)}
                    /> : " "

                }

                {mostrar_crear_sede  ?
                    <CrearSede
                        show={this.props.mostrar_crear_sede}
                        onHide={() => this.props.ver_crear_sede(false)}
                        IdEmpresa={this.state.IdEmpresaSeleccionada}
                    /> : " "

                }

                {mostrar_editar_sede && this.props.id_sede_seleccionada !== 0 ?
                    <EditarSede
                        show={this.props.mostrar_editar_sede}
                        onHide={() => this.props.ver_editar_sede(false)}
                       
                    /> : " "

                }
              
                  
             
            </div>
        );
    }
}


//-------------------------------Redux------------------------

function mapStateToProps(state) {
    const { empresas, mostrar_crear_empresa, mostrar_editar_empresa, id_empresa_seleccionada, id_sede_seleccionada } = state.empresasReducer;
    const { mostrar_crear_sede, mostrar_editar_sede, init_crear_sede } = state.sedesReducer;
    const { loggingIn, user } = state.authentication;
    return { loggingIn, user, empresas, mostrar_crear_empresa, mostrar_editar_empresa, id_empresa_seleccionada, mostrar_crear_sede, mostrar_editar_sede, id_sede_seleccionada, init_crear_sede };

};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_empresas: EmpresaActions.obtener_empresas,
    ver_crear_empresa: EmpresaActions.ver_crear_empresa,
    ver_editar_empresa: EmpresaActions.ver_editar_empresa,
    empresa_seleccionada: EmpresaActions.empresa_seleccionada,
    ver_crear_sede: SedeActions.ver_crear_sede,
    ver_editar_sede: SedeActions.ver_editar_sede,
    sede_seleccionada: SedeActions.sede_seleccionada,
    cargar_crear_sede: SedeActions.cargar_crear_sede,
    

    
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Empresa));