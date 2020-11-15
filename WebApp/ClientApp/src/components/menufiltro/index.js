import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { alertActions } from '../alert_message/actions';
import { menuFiltroActions  } from '../menufiltro/actions';
import { loader } from '../helpers/loader'; 
import SubCategoriasFiltro from './form/filtroSubCategorias';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { mapsActions } from '../mapsview/actions';
import L, { map } from 'leaflet';

class MenuFiltro extends Component {

    rangeElement = React.createRef();

    state = {
        idItemActive: '',
        idCategoria: 0,
        nombreCategoria: '',
        estiloInitial: {
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
            dashArray: ' ',
            fillColor: '#3FBF77',
        }
    }

    constructor(props) {
        super(props);
        this.AbrirFiltroFlotante = this.AbrirFiltroFlotante.bind(this);
        this.FiltroGeneral = this.FiltroGeneral.bind(this);
        this.LimpiarFiltros = this.LimpiarFiltros.bind(this);
        
    }

    componentDidMount() {
        loader.show();
        this.props.obtener_categorias();
       
    }

    AbrirFiltroFlotante(e) {
        e.stopPropagation();
        e.preventDefault();
      
        loader.show();
        var id = e.target.id;
        var nombreCategoria = e.target.title;

        if (this.state.idItemActive !== '') {

            document.getElementById(this.state.idItemActive).classList.remove("itemFilterActive");
        }
        var idCategoria = id.substring((id.lastIndexOf("-")+1), id.length);

        this.setState({
            idItemActive: id,
             idCategoria,
            nombreCategoria
           
        });

    
       
        document.getElementById(id).classList.add("itemFilterActive");
        this.props.ver_filtro_flotante(true);
        this.props.seleccionar_categoria(idCategoria);
    }

    FiltroGeneral(e) {
        loader.show();
        this.props.seleccionar_municipio(0);

        var latlng = L.latLng(this.props.centerInitial.lat, this.props.centerInitial.lon);
        
        this.props.map.flyTo(latlng, 8);

      
        this.props.obtener_sedes(this.props.itemsFiltroSeleccionado, 0, this);

        if (this.props.layerSeleccionado != null) {
            this.props.layerSeleccionado.setStyle(this.state.estiloInitial);
        }
       
        this.props.guardar_layer_seleccionado(null);
        this.props.obtener_municipio(0);
    }

    async LimpiarFiltros(e) {
        loader.show();
        var arreglo = [];
        this.props.agregar_items_filtro(arreglo);
        await this.props.obtener_sedes(arreglo, 0, this);
    }


    render() {
     
        const { categorias, itemActiveClass, verFiltroFlotante } = this.props;
        return (

           

                <div className="floating-menu ">
                <ul className="icon-bar list-inline mx-auto justify-content-center">
                    {
                        categorias.map(({ IdCategoria, Nombre, UrlImagen }, i) => (
                            <li id={`item-f-${IdCategoria}`} title={Nombre} key={i} onClick={this.AbrirFiltroFlotante} className={this.props.itemsFiltroSeleccionado.some(e => e.IdCategoria === IdCategoria) ? 'itemFilterActiveSub' : ''} >
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip>
                                            {Nombre} 
                                         </Tooltip>
                                    }
                                >
                                    <a href="#" id={`item-f-${IdCategoria}`} title={Nombre} >
                                        <img id={`item-f-${IdCategoria}`} title={Nombre} alt={Nombre} src={`/app-images/${UrlImagen}`} />
                                    </a>
                                </OverlayTrigger>
                            </li>
                        ))
                    }
                    <li onClick={this.FiltroGeneral} className="line-div">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip>
                                Restablecer
                            </Tooltip>
                        }
                    >

                            <a href="#"  >
                                <img alt="restar filter" src={`/app-images/categorias/restart_filter.png`} />
                            </a>
                           
                        </OverlayTrigger>

                    </li>
                    <li onClick={this.LimpiarFiltros}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>
                                    Eliminar filtros
                            </Tooltip>
                            }
                        >

                            <a href="#"  >
                                <img alt="restar filter" src={`/app-images/categorias/filter_clear.png`} />
                            </a>

                        </OverlayTrigger>

                    </li>
                    <li className="municipio-select1 view-municipio"  >
                        <p>

                            { this.props.municipio === null ? "Principal" : this.props.municipio.Nombre }
                        </p>
                       

                    </li>
                   
                </ul>


                {this.props.verFiltroFlotante ?
                    <SubCategoriasFiltro
                        show={this.props.verFiltroFlotante}
                        onHide={() => this.props.ver_filtro_flotante(false)}
                        idCategoria={this.state.idCategoria}
                        nombreCategoria={this.state.nombreCategoria}
                    /> : ""
                }
                </div>
           

        )
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {
    const { layerSeleccionado, centerInitial, map, user_location, municipio} = state.mapsReducer;
  
    const { categorias, itemActiveClass, verFiltroFlotante, itemsFiltroSeleccionado } = state.menuFiltroReducer;

  
    return {
        categorias,
        itemActiveClass,
        verFiltroFlotante,
        itemsFiltroSeleccionado,
        map,
        layerSeleccionado,
        centerInitial,
        user_location,
        municipio
    };

};

const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_categorias: menuFiltroActions.obtener_categorias,
    asignar_menu_filtro_active: menuFiltroActions.asignar_menu_filtro_active,
    ver_filtro_flotante: menuFiltroActions.ver_filtro_flotante,
    cambiar_zoom: menuFiltroActions.cambiar_zoom,
    obtener_sedes: mapsActions.obtener_sedes,
    seleccionar_municipio: menuFiltroActions.seleccionar_municipio,
    guardar_layer_seleccionado: mapsActions.guardar_layer_seleccionado,
    seleccionar_categoria: menuFiltroActions.seleccionar_categoria,
    agregar_items_filtro: menuFiltroActions.agregar_items_filtro,
    obtener_municipio: mapsActions.obtener_municipio,
    
  
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuFiltro));
