import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { municipiosActions  } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search } from '@syncfusion/ej2-react-grids';
import AddIcon from '@material-ui/icons/AddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import CrearCategoria from './forms/crear';
import EditarCategoria from './forms/editar';




class Municipio extends Component {

    grid = React.createRef();

    constructor(props) {
        super(props);

        this.searchOptions = {
            fields: [ 'Nombre', 'IdMunicipio'],
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
        this.props.obtener_municipios();
      

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
        if (e.currentTarget.id === "btnNueva") {

            this.props.ver_crear_municipio(true);

        } else if (e.currentTarget.id === "btnEditar") {
          
            if (localStorage.getItem('idMunicipioSeleccionado') > 0 ) {
                    this.props.ver_editar_municipio(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizar") {
            loader.show();
            this.props.obtener_municipios();
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

            var id = usuario[0].IdMunicipio;
           
            localStorage.setItem('idMunicipioSeleccionado', id);

        }
    }
    


    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }


    render() {

        const { mostrar_crear_municipio, mostrar_editar_municipio } = this.props;


       
        return (


            <div>
                <nav id="nav" className="nav-form navbar">
                    <div className="row col-12" >

                        <div className=" col-sm-12 col-md-6 col-lg-4 center center-vertical" >
                            <h3>Municipios</h3>
                        </div>

                        <div className=" col-sm-12 col-md-6 col-lg-8 " >
                            <ul >
                                <li>
                                    <button id="btnNueva" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">
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

                            </ul>
                        </div>


                    </div>

                </nav>

                <div className='wrap-form table-responsive container-fluid'>
                    <GridComponent dataSource={this.props.municipios} ref={this.grid} rowDeselected={this.rowDeselected} queryCellInfo={this.queryCellInfo} rowSelected={this.rowSelected} que toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                        <ColumnsDirective>
                            <ColumnDirective field="UrlImagen" headerText="Imagen" template="<img class='tempimg' style='width:32px;heigth:32px'>" width="120" textAlign="Right"></ColumnDirective>
                            <ColumnDirective field='Nombre' headerText='Nombre' width='150'></ColumnDirective>
                            <ColumnDirective field='Clima' headerText='Clima' width='150'></ColumnDirective>
                         </ColumnsDirective>
                        <Inject services={[Search, Toolbar]} />
                    </GridComponent>
                </div>

                {mostrar_crear_municipio ?
                    <CrearCategoria
                        show={mostrar_crear_municipio}
                        onHide={() => this.props.ver_crear_municipio(false)}
                    /> : " "

                }

                {mostrar_editar_municipio ?
                    <EditarCategoria
                        show={mostrar_editar_municipio}
                        onHide={() => this.props.ver_editar_municipio(false)}
                    /> : " "

                }
               
            </div>
           
        );
    }
}


function mapStateToProps(state) {
    const { municipios, mostrar_crear_municipio, mostrar_editar_municipio, seleccionar_municipio } = state.municipio;
    return { municipios, mostrar_crear_municipio, mostrar_editar_municipio, seleccionar_municipio };
}


const mapDispatchToProps = {
    seleccionar_municipio: municipiosActions.seleccionar_municipio,
    showMessage: alertActions.showMessage,
    obtener_municipios: municipiosActions.obtener_municipios,
    ver_crear_municipio: municipiosActions.ver_crear_municipio,
    ver_editar_municipio: municipiosActions.ver_editar_municipio,
    

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Municipio));

