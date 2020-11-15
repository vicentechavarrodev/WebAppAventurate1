import React, { Component, Fragment } from 'react'
import { Map, TileLayer, Marker, Popup, Polygon, FeatureGroup, Tooltip} from "react-leaflet";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../alert_message/actions';
import { ListGroup, ListGroupItem, Carousel, Row, Col, Container, Image, Form } from 'react-bootstrap';
import { icons } from '../helpers/mapIcons';
import { mapsActions } from './actions';
import L, { map } from 'leaflet';
import  'leaflet-control-geocoder';
import LaunchIcon from '@material-ui/icons/Launch';
import { loader } from '../helpers/loader';
import mapa_huila from '../../data/mapa_huila.json'
import MenuFiltro from '../menufiltro/index';
import {  menuFiltroActions } from '../menufiltro/actions';
import MarkerClusterGroup from "react-leaflet-markercluster";
import CloseIcon from '@material-ui/icons/Close';
import Header from '../header/index';
import Footer from '../footer/index';
import { HeaderActions } from '../header/actions';
import { Link } from "react-router-dom";

class MapView extends Component {

    geojson = React.createRef();
    mapRef = React.createRef();
   

    constructor(props) {
        super(props);
        this.verPerfilSede = this.verPerfilSede.bind(this);
        this.verPerfilMunicipio = this.verPerfilMunicipio.bind(this);
        this.zoomToFeature = this.zoomToFeature.bind(this);
        this.resetHighlight = this.resetHighlight.bind(this);
        this.highlightFeature = this.highlightFeature.bind(this);
        this.onMapLoad = this.onMapLoad.bind(this);
        
        this.state = {
            layerSeleccionado: null,
            layerActivo: false,
            estilo1: {
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7,
                dashArray: ' ',
                fillColor: '#97BF13',
            },
            estilo4: {
                weight: 3,
                opacity: 1,
                color: ' ',
                fillOpacity: 0,
                dashArray: ' ',
                fillColor: ' '
            }
       
        }

     
    }

    verPerfilSede(sede) {
        localStorage.setItem('IdSede', sede.IdSede);
        this.props.history.push('/sitio');
    }


    verPerfilMunicipio(municipio) {
        console.log(municipio);
        localStorage.setItem('IdMunicipio', municipio.IdMunicipio);
        this.props.history.push('/municipio');
    }

    componentDidMount() {
        this.props.seleccionar_id_item("inicio");
        localStorage.setItem('item_menu_header', "inicio");
        loader.show();
        window.scrollTo(0, 0);
        //this.obtenerUbicacion();
        
       
    }
 
   
    obtenerUbicacion() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.props.location_user({
                        latUser: position.coords.latitude,
                        lonUser: position.coords.longitude
                    });
                   
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        this.props.showMessage('No se logro obtener tu ubicacíon , tienes bloqueda esta opción en tu navegador,desbloqueanos y vuelve a intentarlo.', true, 'Información')
                    }
                }
                ,
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );

        } else {
            this.props.showMessage('Debes permitir tu ubicación en el navegador para un mejor uso de la platadorma.', true, 'Información');
        }

        loader.hide();
    }

    highlightFeature(e) {
        var layer = e.layer;
        

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        if (this.props.layerSeleccionado !== null) {

            layer.setStyle(this.state.estilo4);

            if (layer._leaflet_id !== this.props.layerSeleccionado._leaflet_id ) {

                this.props.layerSeleccionado.setStyle(this.state.estilo4);
            } else {
                this.props.layerSeleccionado.setStyle(this.state.estilo4);
            }
            this.props.layerSeleccionado.bringToFront();

        } else {
            layer.setStyle(this.state.estilo4);
        }
       
    }

    resetHighlight(e) {
        var layer = e.layer;
      
        if (this.props.layerSeleccionado === null || (this.props.layerSeleccionado._leaflet_id !== layer._leaflet_id && this.props.layerSeleccionado.options.IdMunicipio !== layer.options.IdMunicipio) ) {
            layer.setStyle(this.state.estilo1);
        }
       
    }

    zoomToFeature(e) {
            var layer = e.layer;
        if (layer.options.IdMunicipio !== this.props.idMunicipioSeleccionado) {
            layer._map.fitBounds(layer.getBounds());
            layer.setStyle(this.state.estilo4);

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }


            if (this.props.layerSeleccionado !== null) {

                if (this.props.layerSeleccionado._leaflet_id !== layer._leaflet_id) {
                    this.props.layerSeleccionado.setStyle(this.state.estilo1);
                }


            }


            this.props.ver_menu_busqueda(true);
            this.props.seleccionar_municipio(layer.options.IdMunicipio);
            loader.show();
            this.setState({
                layerSeleccionado: layer
            }, () => {

                this.props.guardar_layer_seleccionado(layer);
                this.props.obtener_sedes(this.props.itemsFiltroSeleccionado, this.props.idMunicipioSeleccionado, this);
                this.props.obtener_municipio(this.props.idMunicipioSeleccionado);
            });

        }

      
    }

    onMapLoad(e) {
       
       
        this.props.guardar_mapa(e.target);
        if (this.props.layerSeleccionado != null) {
            e.target.fitBounds(this.props.layerSeleccionado.getBounds());
            this.props.layerSeleccionado.setStyle(this.state.estilo4);
        }
       
    }

    render() {

       
        const ItemMarkerSede = (prop) => (
            <Marker position={new L.latLng(prop.Latitud, prop.Longitud)}
                icon={icons.PinLocationIcon(prop.CategoriaSubcategoria.SubCategoria.UrlImagen)}
            >
                <Popup
                    closeButton={false}
                    minWidth={200}
                    autoPanPadding={[20, 50]}
                    keepInView={true}
                >
                    <ListGroup className="list-group-flush">
                        <ListGroupItem style={{ padding: '0px' }}>
                            <Carousel >

                                {
                                    prop.ImagenesEmpresa !== null ?
                                        prop.ImagenesEmpresa.map((item, index) => {

                                            return (
                                                <Carousel.Item key={item.IdImagenEmpresa} className="item" >
                                                    <img
                                                        style={{ height: 'auto !important' }}
                                                        className="d-block w-100 rounded-top"
                                                        src={item.UrlImagen}
                                                        alt="First slide"
                                                    />

                                                </Carousel.Item>
                                            );
                                        })
                                        :
                                        ""

                                }
                            </Carousel>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h6>
                                <div className="font-weight-bold  h6 " style={{ cursor: "pointer"}} onClick={() => {
                                    this.verPerfilSede(prop);
                                }} >
                                    <u>  {prop.Nombre}</u>
                               
                                </div>
                                </h6>
                        </ListGroupItem>
                        <ListGroupItem>
                       
                            {prop.Anexo}
                       
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row >
                                <Col className="p-0 mr-1" >
                                    <button className="btn btn-default-config btn-3d-style  btn-block rounded"
                                        onClick={() => {
                                            this.verPerfilSede(prop);
                                        }}  ><LaunchIcon /> </button>
                                </Col>
                                <Col className="p-0" >
                                    <a  href="#close">
                                        <button className="btn btn-default-config btn-3d-style  btn-block rounded">
                                            <CloseIcon /> </button>
                                    </a>
                                 
                                </Col>

                            </Row>
                        </ListGroupItem>
                    </ListGroup>

                   
                      
                   
                </Popup>
               
            </Marker>
        )
        const MarkersList = ({ markers }) => {
            const items = markers.map(({ key, ...props }) => (
                <ItemMarkerSede key={key} {...props} />
            ))
            return <Fragment>{items}</Fragment>
        }

        const ItemMarkerMunicipio = ({ municipio }) => (
            <Marker position={new L.latLng(municipio.Latitud, municipio.Longitud)}
                icon={icons.PinLocationIcon(municipio.UrlImagen)}
            >
                <Popup
                    closeButton={false}
                    minWidth={200}
                    autoPanPadding={[20, 50]}
                   
                >
                    <ListGroup className="list-group-flush ">
                        <ListGroupItem style={{ padding: '0px' }}>
                            <Carousel >

                                {
                                    municipio.ImagenesMunicipio !== null ?
                                        municipio.ImagenesMunicipio.map((item, index) => {

                                            return (
                                                <Carousel.Item key={item.IdImagenMunicipio} className="item" >
                                                    <img
                                                        style={{ height: 'auto !important' }}
                                                        className="d-block w-100 rounded-top"
                                                        src={item.UrlImagen}
                                                        alt="First slide"
                                                    />

                                                </Carousel.Item>
                                            );
                                        })
                                        :
                                        ""

                                }
                            </Carousel>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h6>
                                <div className="font-weight-bold  h6 " style={{ cursor: "pointer" }} onClick={() => {
                                    this.verPerfilMunicipio(municipio);
                                }} >
                                    <u>  {municipio.Nombre}</u>

                                </div>
                            </h6>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row >
                                <Col className="p-0 mr-1" >
                                    <button className="btn btn-default btn-3d-style  btn-block"
                                        onClick={() => {
                                            this.verPerfilMunicipio(municipio);
                                        }}  ><LaunchIcon /> </button>
                                </Col>
                                <Col className="p-0" >
                                    <a href="#close">
                                        <button className="btn btn-default-config btn-3d-style  btn-block rounded">
                                            <CloseIcon /> </button>
                                    </a>

                                </Col>

                            </Row>
                        </ListGroupItem>
                        
                    </ListGroup>

                 
                </Popup>

               

            </Marker>
        )
        return (
            <div className="container-menu ">
                <div id="content" >
                    <div className="table-responsive">
                        <Header iconMenuVisible="1" align="text-right" />
                       
                        <div className="jumbotron">
                            <ListGroup className="list-group-flush  ">
                                <ListGroupItem className="list-group-flush mb-3 ">
                                   
                                    <p> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. Lorem Ipsum ha sido el texto de relleno estándar de la industria desde la década de 1500, cuando un impresor desconocido tomó una galera de tipos y la mezcló para hacer un libro de muestras tipográfico. Ha sobrevivido no solo a cinco siglos, sino también al salto a la composición tipográfica electrónica, permaneciendo esencialmente sin cambios. Se popularizó en la década de 1960 con el lanzamiento de hojas de Letraset que contienen pasajes de Lorem Ipsum y, más recientemente, con software de autoedición como Aldus PageMaker que incluye versiones de Lorem Ipsum. </p>


                                </ListGroupItem>
                            </ListGroup>
                            <div className="municipio-select2">
                                <p className="municipio-select">{this.props.municipio === null ? "Principal" : this.props.municipio.Nombre}</p>
                            </div>
                            <MenuFiltro />
                           
                             <Map
                            maxZoom={18}
                            className="markercluster-map"
                            onLoad={this.onMapLoad}
                            ref={this.mapRef}
                            whenReady={this.onMapLoad}
                            center={[this.props.centerInitial.lat, this.props.centerInitial.lon]}
                            zoom={this.props.zoomMap}>
                            <Marker position={[this.props.user_location.latUser, this.props.user_location.lonUser]} icon={icons.UserLocationIcon()}/>

                            {
                                this.props.sedes.length > 0 ?
                                    <MarkerClusterGroup
                                        showCoverageOnHover={false}
                                        spiderfyOnMaxZoom={true}
                                        spiderLegPolylineOptions={{
                                            weight: 0,
                                            opacity: 0,
                                        }}
                                        removeOutsideVisibleBounds={true}

                                    >
                                        <MarkersList markers={this.props.sedes} />
                              
                                    </MarkerClusterGroup>

                                    : " "
                            }
                            {
                                    this.props.municipio !== null ?
                                        <ItemMarkerMunicipio municipio={this.props.municipio} />
                                    : ""
                            }
           
                            <TileLayer
                        
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />

                            {
                                mapa_huila.geometries.map((feature, index) => {
                                var coordinates = [];
                                feature.coordinates[0].map((item) =>
                                    coordinates.push([item[1],item[0]])
                                )
                                    return (
                                        <FeatureGroup onClick={this.zoomToFeature} NombreMunicipio={feature.name} IdMunicipio={feature.key} onmouseover={this.highlightFeature} onmouseout={this.resetHighlight} key={feature.key}>
                                            <Polygon positions={coordinates}
                                                fillColor={feature.key === this.props.idMunicipioSeleccionado ? " " : "#97BF13"}
                                            weight={2}
                                            opacity={1} 
                                            color={feature.key === this.props.idMunicipioSeleccionado ? "  " : "white"}
                                            fillOpacity={feature.key === this.props.idMunicipioSeleccionado ? 0 : 0.7 }
                                            >
                                      
                                       
                                            </Polygon>
                                          
                                   </FeatureGroup>
                                    );
                                })

                            }
                 
                        </Map>

                           
                            <Row>
                                
                                <div className="m-3   embed-responsive embed-responsive-16by9 ">
                                    <iframe className="embed-responsive-item" src="https://player.vimeo.com/video/137857207" ></iframe>
                                 </div>
                             
                            </Row>
                            <div className="icon-bar-social">

                                <a href="https://www.facebook.com/instagram/" target="_blank" className="facebook"><img src={"/app-images/generales/map_icon.png"} alt="logo" /></a>
                                <a href="https://www.facebook.com/instagram/" target="_blank" className="instagram"><i className="fa fa-instagram"></i></a>
                                <a href="https://www.facebook.com/instagram/" target="_blank" className="twitter"><i className="fa fa-twitter"></i></a>
                                <a href="https://www.facebook.com/instagram/" target="_blank" className="youtube"><i className="fa fa-youtube"></i></a>
                                <a target="_blank" className="whatsapp" href={"https://api.whatsapp.com/send?phone=57" + "3153504393" + "&text= Hola!%20Quiero%20mas%20información!"}><i className="fa fa-whatsapp"></i></a>
                                <Link to="/contacto" className="mail" >

                                    <i className="fa fa-envelope" aria-hidden="true" />

                                </Link>
                            </div>
                   
                           
                
                                    </div>
                    </div>


                </div>
                <Footer />
            </div>
        )
    }

}


function mapStateToProps(state) {
    const { itemsFiltroSeleccionado, idMunicipioSeleccionado, zoomMap } = state.menuFiltroReducer;
    const { user_location, user_address, sedes,
        verInforEmpresa,
        verMenuBusqueda,
        map,
        layerSeleccionado,
        municipio,
        centerInitial,
        nombreMunicipioSeleccionado

    } = state.mapsReducer;

    return {
        user_location,
        user_address,
        verInforEmpresa,
        verMenuBusqueda,
        sedes,
        itemsFiltroSeleccionado,
        idMunicipioSeleccionado,
        zoomMap,
        map,
        layerSeleccionado,
        municipio,
        centerInitial,
        nombreMunicipioSeleccionado
    };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    location_user: mapsActions.location_user,
    address_user: mapsActions.address_user,
    obtener_sedes: mapsActions.obtener_sedes,
    seleccionar_empresa: mapsActions.seleccionar_empresa,
    ver_info_empresa: mapsActions.ver_info_empresa,
    ver_menu_busqueda: mapsActions.ver_menu_busqueda,
    seleccionar_municipio: menuFiltroActions.seleccionar_municipio,
    cambiar_zoom: menuFiltroActions.cambiar_zoom,
    guardar_mapa: mapsActions.guardar_mapa,
    guardar_layer_seleccionado: mapsActions.guardar_layer_seleccionado,
    obtener_municipio: mapsActions.obtener_municipio,
    seleccionar_id_item: HeaderActions.seleccionar_id_item,
    nombre_municipio_seleccionado: mapsActions.nombre_municipio_seleccionado,
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapView));

