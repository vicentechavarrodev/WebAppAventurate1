import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { subcategoriaActions  } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search } from '@syncfusion/ej2-react-grids';
import AddIcon from '@material-ui/icons/AddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import CrearSubCategoria from './forms/crear';
import EditarSubCategoria from './forms/editar';
import DeleteIcon from '@material-ui/icons/Delete';





class SubCategoria extends Component {

    grid = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: '',
            status: '',
            progress: 0
        }
        this.searchOptions = {
            fields: ['Nombre'],
            operator: 'contains'
        };

        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);

    }



    componentDidMount() {

        loader.show();
        this.props.obtener_subcat();
       

    }



    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por Nombre")
    } 

    

    MenuOptionClick(e) {    
        if (e.currentTarget.id === "btnNuevo") {

            this.props.ver_crear_subcategoria(true);

        } else if (e.currentTarget.id === "btnEditar") {
            if (localStorage.getItem('idSubCategoriaSeleccionada') > 0) {
               
                this.props.ver_editar_subcategoria(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizar") {
            loader.show();
            this.props.obtener_subcat();
        } else if (e.currentTarget.id === "btnEliminarSubCategoria") {

            if (localStorage.getItem('idSubCategoriaSeleccionada') > 0) {
                loader.show();
                this.props.eliminar_subcategoria(localStorage.getItem('idSubCategoriaSeleccionada'), this);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
           
        }

        
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }



    rowSelected(e) {
      
        if (this.grid) {
            localStorage.setItem('idSubCategoriaSeleccionada', e.data.IdSubCategoria);
            
        }
    }

    rowDeselected(e) {
        if (this.grid) {
            this.props.select_subcat(0);
        }
    }

    queryCellInfo(args) {
        if (args.column.field === "UrlImagen") {
            args.cell.querySelector('img').setAttribute('src', `/app-images/${args.data.UrlImagen}`);
        }

    }



    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }


    render() {
        const { sub_cate, mostrar_crear_subcategoria, mostrar_editar_subcategoria} = this.props;
        return (
            
       
            <div>
                <nav id="nav" className="nav-form navbar">
                    <div className="row col-12" >

                        <div className=" col-sm-12 col-md-6 col-lg-4 center center-vertical" >
                            <h3>SubCategorias</h3>
                        </div>

                        <div className=" col-sm-12 col-md-6 col-lg-8 " >
                            <ul >
                                <li>
                                    <button id="btnNuevo" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
                                        <div>
                                            <AddIcon />
                                        </div>
                                        <div>
                                            <p>Nuevo</p>
                                        </div>
                                    </button>
                                </li>
                                <li >
                                    <button id="btnEditar" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">

                                        <div>
                                            <EditIcon />
                                        </div>
                                        <div>
                                            <p>Editar</p>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button id="btnActualizar" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
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
                                <li >
                                    <button id="btnEliminarSubCategoria" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">

                                        <div>
                                            <DeleteIcon />
                                        </div>
                                        <div>
                                            <p>Eliminar</p>
                                        </div>
                                    </button>
                                </li>

                            </ul>
                        </div>


                    </div>

                </nav>

                <div className='wrap-form table-responsive container-fluid'>
                    <GridComponent dataSource={sub_cate} queryCellInfo={this.queryCellInfo} rowSelected={this.rowSelected} toolbar={this.toolbarOptions} searchSettings={this.searchOptions} height={280} ref={this.grid} created={this.created.bind(this)}>
                        <ColumnsDirective>

                            <ColumnDirective field="UrlImagen" headerText="Imagen" template="<img style='width:32px;heigth:32px' class='tempimg'>" width="120"   textAlign="Right"></ColumnDirective>
                            <ColumnDirective field='Nombre' headerText='Nombre'  width='150'></ColumnDirective>
                           
                        </ColumnsDirective>
                        <Inject services={[Search, Toolbar]} />
                    </GridComponent>
                </div>

                {mostrar_crear_subcategoria ?
                    <CrearSubCategoria
                        show={mostrar_crear_subcategoria}
                        onHide={() => this.props.ver_crear_subcategoria(false)}
                    /> : " "

                }

                {mostrar_editar_subcategoria ?
                    <EditarSubCategoria
                        show={mostrar_editar_subcategoria}
                        onHide={() => this.props.ver_editar_subcategoria(false)}
                    /> : " "

                }

                
                
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { sub_cate, mostrar_crear_subcategoria, mostrar_editar_subcategoria, id_subcat_sel, subcategoria_eliminada } = state.reducerSubCategoria;
    return { sub_cate, mostrar_crear_subcategoria, mostrar_editar_subcategoria, id_subcat_sel, subcategoria_eliminada };
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_subcat: subcategoriaActions.obtener_subcat,
    ver_crear_subcategoria: subcategoriaActions.ver_crear_subcategoria,
    ver_editar_subcategoria: subcategoriaActions.ver_editar_subcategoria,
    select_subcat: subcategoriaActions.select_subcat,
    eliminar_subcategoria: subcategoriaActions.eliminar_subcategoria
    

   
}
    

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubCategoria));