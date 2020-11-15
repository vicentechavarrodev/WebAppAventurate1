import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {  categoriaActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search } from '@syncfusion/ej2-react-grids';
import AddIcon from '@material-ui/icons/AddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import CrearCategoria from './forms/crear';
import EditarCategoria from './forms/editar';
import DeleteIcon from '@material-ui/icons/Delete';



class Categoria extends Component {

    grid = React.createRef();

    constructor(props) {
        super(props);

        this.searchOptions = {
            fields: [ 'Nombre', 'IdCategoria'],
            operator: 'contains'
        };


        this.state = {
            selectedFile: '',
            status: '',
            progress: 0
        }


        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);

    }



    componentDidMount() {

        loader.show();
        this.props.obtener_cat();
      

    }



    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por Nombre")
    } 

    queryCellInfo(args) {
        if (args.column.field === "UrlImagen") {
            args.cell.querySelector('img').setAttribute('src', `/app-images/${args.data.UrlImagen}`);
        }
       
    }

    MenuOptionClick(e) {    
        if (e.currentTarget.id === "btnNuevaCategoria") {

            this.props.ver_crear_categoria(true);

        } else if (e.currentTarget.id === "btnEditarCategoria") {
          
            if (localStorage.getItem('idCategoriaSeleccionada') > 0 ) {
                    this.props.ver_editar_categoria(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizarCategoria") {
            loader.show();
            this.props.obtener_cat();
        }
        else if (e.currentTarget.id === "btnEliminarCategoria") {
            if (localStorage.getItem('idCategoriaSeleccionada') > 0) {

                this.props.eliminar_categoria(localStorage.getItem('idCategoriaSeleccionada'),this);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        }
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }


    rowDeselected(e) {
        if (this.grid) {
           // localStorage.setItem('idCategoriaSeleccionada', 0);
        }
    }



    rowSelected() {
        if (this.grid) {

            let usuario = this.grid.current.getSelectedRecords();

            var id = usuario[0].IdCategoria;
           
            localStorage.setItem('idCategoriaSeleccionada', id);

        }
    }
    


    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }


    render() {

        const { cate, mostrar_crear_categoria, mostrar_editar_categoria } = this.props;


       
        return (


            <div>
                <nav id="nav" className="nav-form navbar">
                    <div className="row col-12" >

                        <div className=" col-sm-12 col-md-6 col-lg-4 center center-vertical" >
                            <h3>Categorias</h3>
                        </div>

                        <div className=" col-sm-12 col-md-6 col-lg-8 " >
                            <ul >
                                <li>
                                    <button id="btnNuevaCategoria" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
                                        <div>
                                            <AddIcon />
                                        </div>
                                        <div>
                                            <p>Nuevo</p>
                                        </div>
                                    </button>
                                </li>
                                <li >
                                    <button id="btnEditarCategoria" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">

                                        <div>
                                            <EditIcon />
                                        </div>
                                        <div>
                                            <p>Editar</p>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button id="btnActualizarCategoria" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
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
                                    <button id="btnEliminarCategoria" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">

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
                    <GridComponent dataSource={cate} ref={this.grid} rowDeselected={this.rowDeselected} queryCellInfo={this.queryCellInfo} rowSelected={this.rowSelected} que toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                        <ColumnsDirective>
                            <ColumnDirective field="UrlImagen" headerText="Imagen" template="<img class='tempimg' style='width:32px;heigth:32px'>" width="120" textAlign="Right"></ColumnDirective>
                            <ColumnDirective field='Nombre' headerText='Nombre' width='150'></ColumnDirective>
                            <ColumnDirective field='Orden' headerText='Orden' width='50'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Search, Toolbar]} />
                    </GridComponent>
                </div>
                {mostrar_crear_categoria ?
                    <CrearCategoria
                        show={mostrar_crear_categoria}
                        onHide={() => this.props.ver_crear_categoria(false)}
                    /> : " "

                }

                {mostrar_editar_categoria ?
                    <EditarCategoria
                        show={mostrar_editar_categoria}
                        onHide={() => this.props.ver_editar_categoria(false)}
                    /> : " "

                }
            </div>
           
        );
    }
}


function mapStateToProps(state) {
    const { cate, mostrar_crear_categoria, mostrar_editar_categoria, seleccionar_categoria } = state.categoria;
    return { cate, mostrar_crear_categoria, mostrar_editar_categoria, seleccionar_categoria };
}


const mapDispatchToProps = {
    seleccionar_cat: categoriaActions.seleccionar_cat,
    showMessage: alertActions.showMessage,
    obtener_cat: categoriaActions.obtener_cat,
    ver_crear_categoria: categoriaActions.ver_crear_categoria,
    ver_editar_categoria: categoriaActions.ver_editar_categoria,
    eliminar_categoria: categoriaActions.eliminar_categoria,

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categoria));

