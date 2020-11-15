import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {  municipiosActions } from '../actions';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import L, { map } from 'leaflet';
import { icons } from '../../helpers/mapIcons';
import { loader } from '../../helpers/loader';

class CrearMunicipio extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            municipio: {
                IdMunicipio: 0,
                Nombre: '',
                UrlImagen: '',
                Clima: '',
                Descripcion: '',
                Festividades: '',
                Latitud: '',
                Longitud: '',
                URLImagen1: '',
                URLImagen2: '',
                URLImagen3: '',
                URLImagen4: '',
                URLImagen5: '',
                Tips: '',
                QueHacer: ''
            },
            file: null
        };


        this.InputChange = this.InputChange.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);
        this.CreateMunicipio = this.CreateMunicipio.bind(this);
        this.AsignarUbicacion = this.AsignarUbicacion.bind(this);
        
       
    }

    componentDidMount() {
       
        this.cargarMapa();

    }

    AsignarUbicacion(e) {
        const { municipio } = this.state;

        console.log(e.latlng);
        var lat = e.latlng.lat;
        var lon = e.latlng.lng;

        this.setState({
            municipio: {
                ...municipio,
                Latitud: lat,
                Longitud: lon
            }
        });

    }

    InputChange(e) {
        const { name, value } = e.target;
        const { municipio } = this.state;
        this.setState({
            municipio: {
                ...municipio,
                [name]: value
            }
        });
    }

     CreateMunicipio(e) {
       e.preventDefault();
        const {
            municipio,
            file
        } = this.state;
     

         if (file == null || file.get("Imagen") == null) {
             this.props.showMessage('Debe seleccionar una imagén', true, 'Información');
             return;
         } else if (!municipio.IdMunicipio === 0) {
             this.props.showMessage('Debe ingresar un que debe ser igual a su geolocalización.', true, 'Información');
             return;
         } else if (!municipio.Nombre) {
             this.props.showMessage('Debe ingresar un nombre.', true, 'Información');
             return;
         } else if (!municipio.Descripcion) {
             this.props.showMessage('Debe ingresar un descripción.', true, 'Información');
             return;
         }
         else if (!municipio.Clima) {
             this.props.showMessage('Debe ingresar el clima.', true, 'Información');
             return;
         } else if (!municipio.Festividades) {
             this.props.showMessage('Debe ingresar una festividades.', true, 'Información');
             return;
         } else if (municipio.Latitud === 0) {
             this.props.showMessage('Debe selecionar  latitud.', true, 'Información');
             return;
         } else if (municipio.Longitud === 0) {
             this.props.showMessage('Debe selecionar  una longitud.', true, 'Información');
             return;
         } else if (!municipio.URLImagen1) {
             this.props.showMessage('Debe ingresar al menos una url de imagen.', true, 'Información');
             return;
         }

         file.append('IdMunicipio', municipio.IdMunicipio);
         file.append('Nombre', municipio.Nombre);
         file.append('Clima', municipio.Clima);
         file.append('Descripcion', municipio.Descripcion);
         file.append('Festividades', municipio.Festividades);
         file.append('Latitud', municipio.Latitud);
         file.append('Longitud', municipio.Longitud);
         file.append('URLImagen1', municipio.URLImagen1);
         file.append('URLImagen2', municipio.URLImagen2);
         file.append('URLImagen3', municipio.URLImagen3);
         file.append('URLImagen4', municipio.URLImagen4);
         file.append('URLImagen5', municipio.URLImagen5);
         file.append('QueHacer', municipio.QueHacer);
         file.append('Tips', municipio.Tips);

         loader.show();
         this.props.crear_municipio(file, this);
         this.props.ver_crear_municipio(false);
      
    }

    FileSelectChange(e) {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('Imagen', element);
        }
        this.setState({ file: form });
    }

    cargarMapa() {
        const map = L.map('map').setView([this.props.centerInitial.lat, this.props.centerInitial.lon], 12);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

        var marker = L.marker([this.props.centerInitial.lat, this.props.centerInitial.lon], {
            draggable: true,
            icon: icons.UserLocationIcon()
        }).bindPopup("<h2>Tarraco</h2>")
            .addTo(map);

        marker.on('drag', (e) => { this.AsignarUbicacion(e) });





    }

   

    render() {
        const { municipio } = this.state;
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Municipio
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateMunicipio} >
                        <Form.Row>
                            <div id="map" />
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <label>Selecciona archivo para subir </label>
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />
    
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="IdMunicipio" value={municipio.IdMunicipio} maxLength={30} className="pz-input" onChange={this.InputChange} placeholder="IdMunicipio" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={municipio.Nombre} maxLength={30} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Clima" value={municipio.Clima} maxLength={30} className="pz-input" onChange={this.InputChange} placeholder="Clima" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Descripcion" value={municipio.Descripcion}  className="pz-input" onChange={this.InputChange} placeholder="Descripción" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Festividades" value={municipio.Festividades}  className="pz-input" onChange={this.InputChange} placeholder="Festividades" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Tips" value={municipio.Tips}  className="pz-input" onChange={this.InputChange} placeholder="Tips" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="QueHacer" value={municipio.QueHacer}  className="pz-input" onChange={this.InputChange} placeholder="QueHacer" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Latitud" value={municipio.Latitud}  className="pz-input" onChange={this.InputChange} placeholder="Latitud" />
                            </Form.Group>
                        </Form.Row>
                    

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Longitud" value={municipio.Longitud}  className="pz-input" onChange={this.InputChange} placeholder="Longitud" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen1" value={municipio.URLImagen1} onChange={this.InputChange} className="pz-input" placeholder="URLImagen1" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text" name="URLImagen2" value={municipio.URLImagen2} onChange={this.InputChange} className="pz-input" placeholder="URLImagen2" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen3" value={municipio.URLImagen3} onChange={this.InputChange} className="pz-input" placeholder="URLImagen3" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen4" value={municipio.URLImagen4} onChange={this.InputChange} className="pz-input" placeholder="URLImagen4" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text" name="URLImagen5" value={municipio.URLImagen5} onChange={this.InputChange} className="pz-input" placeholder="URLImagen5" />
                        </Form.Group>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <button type="submit" className="btn btn-default btn-3d-style  btn-block">Grabar </button>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <button type="button" onClick={this.props.onHide} className="btn btn-default btn-3d-style  btn-block">Cancelar </button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>

            </Modal>

        );
    }
}




function mapStateToProps(state) {
    const { centerInitial, zoomMap } = state.mapsReducer;
    const { mostrar_crear_municipio, init_editar_municipio } = state.municipio;
    return { mostrar_crear_municipio, centerInitial, zoomMap, init_editar_municipio };
};


const mapDispatchToProps = {
    
    showMessage: alertActions.showMessage,
    ver_crear_municipio: municipiosActions.ver_crear_municipio,
    obtener_municipios: municipiosActions.obtener_municipios,
    crear_municipio: municipiosActions.crear_municipio
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearMunicipio));