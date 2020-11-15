import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { SedeActions } from '../actions';
import { EmpresaActions } from '../../empresas/actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import L, { map } from 'leaflet';
import { icons } from '../../helpers/mapIcons';
import { categoriaActions } from '../../categorias/actions';
import { subcategoriaActions } from '../../subcategorias/actions';



class CrearSede extends Component {
    mapRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            sede: {
                Nombre: '',
                Telefono:'',
                Direccion: '',
                Horarios: '',
                Celular: '',
                Activa: false,
                Latitud: '',
                Longitud: '',
                IdMunicipio: 0,
                IdCategoriaSubcategoria: 0,
                IdTipoSede: 0,
                Descripcion: '',
                URLImagen1: '',
                URLImagen2: '',
                URLImagen3: '',
                URLImagen4: '',
                URLImagen5: '',
                IdEmpresa: this.props.IdEmpresa,
                Anexo: '',
                Precio: '',
                InstagramUrl: '',
                NombreInstagram: '',
                FacebookUrl: '',
                NombreFacebook: '',
                Correo: '',
                Tips: '',
                NombreTwitter: '',
                TwitterUrl: '',
                Pagina: ''

            },
            file: null
        };

        this.fieldsTipoSede = { text: 'Nombre', value: 'IdTipoSede' };
        this.fieldsMunicipio = { text: 'Nombre', value: 'IdMunicipio' };
        this.fieldsCatSub = { text: 'SubCategoria.Nombre', value: 'IdCategoriaSubcategoria' };
        this.fieldsCategoria = { text: 'Nombre', value: 'IdCategoria' };

        this.InputChange = this.InputChange.bind(this);
        this.CreateSedeSubmit = this.CreateSedeSubmit.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);
        this.AsignarUbicacion = this.AsignarUbicacion.bind(this);
    }

    AsignarUbicacion(e) {
        const { sede } = this.state;

  
        var lat = e.latlng.lat;
        var lon = e.latlng.lng;
        
        this.setState({
            sede: {
                ...sede,
                Latitud: lat,
                Longitud: lon
            }
        });

    }



    componentDidMount() {
        this.props.cargar_crear_sede();
        this.props.obtener_cat();
        this.cargarMapa();
       
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

        marker.on('drag', (e) => { this.AsignarUbicacion(e) } );

     



    }

    InputChange(e) {
       
        const { name, value } = e.target;
        const { sede } = this.state;
        this.setState({
            sede: {
                ...sede,
                [name]: value
            }
        });
    }

    CreateSedeSubmit(e) {
        e.preventDefault();
        const { sede, file } = this.state;

          if (file == null || file.get("Imagen") == null) {
            this.props.showMessage('Debe seleccionar una imagén', true, 'Información');
            return;
        } else if (!sede.Nombre) {
            this.props.showMessage('Debe ingresar un nombre.', true, 'Información');
            return;
        } else if (!sede.Telefono) {
            this.props.showMessage('Debe ingresar un telefono.', true, 'Información');
            return;
          } else if (!sede.Celular) {
              this.props.showMessage('Debe selecionar  un numero de celular.', true, 'Información');
              return;
          }
        else if (!sede.Descripcion) {
           this.props.showMessage('Debe ingresar una descripción.', true, 'Información');
              return;
          } else if (!sede.Anexo) {
              this.props.showMessage('Debe ingresar un anexo.', true, 'Información');
              return;
          } else if (!sede.Horarios) {
            this.props.showMessage('Debe ingresar un horario.', true, 'Información');
            return;
        } else if (!sede.Direccion) {
            this.props.showMessage('Debe ingresar una dirección.', true, 'Información');
            return;
        
        } else if (sede.Latitud === 0) {
            this.props.showMessage('Debe selecionar  una mpresa.', true, 'Información');
            return;
        } else if (sede.Longitud === 0) {
            this.props.showMessage('Debe selecionar  una mpresa.', true, 'Información');
            return;
        } else if (!sede.URLImagen1) {
            this.props.showMessage('Debe ingresar al menos una url de imagen.', true, 'Información');
            return;
        } else if (sede.IdMunicipio === 0) {
            this.props.showMessage('Debe selecionar  un municipio.', true, 'Información');
            return;
          } else if (sede.IdTipoSede === 0) {
              this.props.showMessage('Debe selecionar  una sede.', true, 'Información');
              return;
          } else if (sede.IdCategoriaSubcategoria === 0) {
              this.props.showMessage('Debe selecionar  una subcategoria.', true, 'Información');
              return;
          }

        file.append('Nombre', sede.Nombre);
        file.append('Telefono', sede.Telefono);
        file.append('Celular', sede.Celular);
        file.append('Horarios', sede.Horarios);
        file.append('Direccion', sede.Direccion);
        file.append('Latitud', sede.Latitud);
        file.append('Longitud', sede.Longitud);
        file.append('URLImagen1', sede.URLImagen1);
        file.append('URLImagen2', sede.URLImagen2);
        file.append('URLImagen3', sede.URLImagen3);
        file.append('IdMunicipio', sede.IdMunicipio);
        file.append('IdTipoSede', sede.IdTipoSede);
        file.append('IdEmpresa', sede.IdEmpresa);
        file.append('Descripcion', sede.Descripcion);
        file.append('Anexo', sede.Anexo);
        file.append('URLImagen4', sede.URLImagen4);
        file.append('URLImagen5', sede.URLImagen5);
        file.append('Precio', sede.Precio);
        file.append('InstagramUrl', sede.InstagramUrl);
        file.append('NombreInstagram', sede.NombreInstagram);
        file.append('FacebookUrl', sede.FacebookUrl);
        file.append('NombreFacebook', sede.NombreFacebook);
        file.append('Correo', sede.Correo);
        file.append('Tips', sede.Tips);
        file.append('NombreTwitter', sede.NombreTwitter);
        file.append('TwitterUrl', sede.TwitterUrl);
        file.append('Pagina', sede.Pagina);
        file.append('IdCategoriaSubcategoria', sede.IdCategoriaSubcategoria);

        loader.show();
        this.props.crear_sede(file, this.props.user, this);
        this.props.ver_crear_sede(false);

    }
    cargarSubcategorias(e) {
        const { name, value } = e.target;

        this.props.obtener_cate_subcategoria(value);

        
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




    render() {
        const { sede } = this.state;

      

        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
             
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Sede
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 
                    <Form onSubmit={this.CreateSedeSubmit} >

                        <Form.Row>
                            <div id="map" />
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <label>Selecciona archivo para subir </label>
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />

                            </Form.Group>
                        </Form.Row>
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={100} name="Nombre" value={sede.Nombre} onChange={this.InputChange} className="pz-input" placeholder="Nombre" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="number" name="Telefono" value={sede.Telefono} onChange={this.InputChange} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10); }}
                                onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Telefono" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="number" name="Celular" value={sede.Celular} onChange={this.InputChange} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12); }}
                                onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Celular" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={100} name="Horarios" value={sede.Horarios} onChange={this.InputChange} className="pz-input" placeholder="Horarios" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="Descripcion" value={sede.Descripcion} onChange={this.InputChange} className="pz-input" placeholder="Descripcion" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={144} name="Anexo" value={sede.Anexo} onChange={this.InputChange} className="pz-input" placeholder="Anexo" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="Precio" value={sede.Precio} onChange={this.InputChange} className="pz-input" placeholder="Rango de Precios" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={100} name="Direccion" value={sede.Direccion} onChange={this.InputChange} className="pz-input" placeholder="Dirección" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={100} name="Latitud" value={sede.Latitud} onChange={this.InputChange} className="pz-input" placeholder="Latitud" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={100} name="Longitud" value={sede.Longitud} onChange={this.InputChange} className="pz-input" placeholder="Longitud" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen1" value={sede.URLImagen1} onChange={this.InputChange} className="pz-input" placeholder="URLImagen1" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen2" value={sede.URLImagen2} onChange={this.InputChange} className="pz-input" placeholder="URLImagen2" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen3" value={sede.URLImagen3} onChange={this.InputChange} className="pz-input" placeholder="URLImagen3" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen4" value={sede.URLImagen4} onChange={this.InputChange} className="pz-input" placeholder="URLImagen4" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="URLImagen5" value={sede.URLImagen5} onChange={this.InputChange} className="pz-input" placeholder="URLImagen5" />
                        </Form.Group>
                    
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="NombreTwitter" value={sede.NombreTwitter} onChange={this.InputChange} className="pz-input" placeholder="NombreTwitter" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="TwitterUrl" value={sede.TwitterUrl} onChange={this.InputChange} className="pz-input" placeholder="TwitterUrl" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="NombreFacebook" value={sede.NombreFacebook} onChange={this.InputChange} className="pz-input" placeholder="NombreFacebook" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="FacebookUrl" value={sede.FacebookUrl} onChange={this.InputChange} className="pz-input" placeholder="FacebookUrl" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="NombreInstagram" value={sede.NombreInstagram} onChange={this.InputChange} className="pz-input" placeholder="NombreInstagram" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="InstagramUrl" value={sede.InstagramUrl} onChange={this.InputChange} className="pz-input" placeholder="InstagramUrl" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="Correo" value={sede.Correo} onChange={this.InputChange} className="pz-input" placeholder="Correo" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="Pagina" value={sede.Pagina} onChange={this.InputChange} className="pz-input" placeholder="Pagina" />
                        </Form.Group>
                        <Form.Group md="6" >
                            <Form.Control type="text"  name="Tips" value={sede.Tips} onChange={this.InputChange} className="pz-input" placeholder="Tips" />
                        </Form.Group>

                        <Form.Group md="6" >
                            <div className="input-group" >
                                <ComboBoxComponent name="IdMunicipio" value={sede.IdMunicipio} showClearButton={false} allowCustom={false} fields={this.fieldsMunicipio } change={(val) => { this.InputChange({ target: { name: 'IdMunicipio', value: val.value } }); }} allowFiltering={true} placeholder="Municipio" className="pz-input" dataSource={this.props.init_crear_sede.municipios} />
                            </div>
                        </Form.Group>


                        <Form.Group md="6" >
                            <div className="input-group" >
                                <ComboBoxComponent name="IdTipoSede" value={sede.IdTipoSede} showClearButton={false} allowCustom={false} fields={this.fieldsTipoSede} change={(val) => { this.InputChange({ target: { name: 'IdTipoSede', value: val.value } }); }} allowFiltering={true} placeholder="Tipo sede" className="pz-input" dataSource={this.props.init_crear_sede.tiposSede} />
                            </div>
                        </Form.Group>


                        <Form.Group md="6" >
                            <div className="input-group" >
                                <ComboBoxComponent name="IdCategoria" value={sede.IdCategoria} showClearButton={false} allowCustom={false} fields={this.fieldsCategoria} change={(val) => { this.cargarSubcategorias({ target: { name: 'IdCategoria', value: val.value } }); }} allowFiltering={true} placeholder="Categoria" className="pz-input" dataSource={this.props.cate} />
                            </div>
                        </Form.Group>

                        <Form.Group md="6" >
                            <div className="input-group" >
                                <ComboBoxComponent name="IdCategoriaSubcategoria" value={sede.IdCategoriaSubcategoria} showClearButton={false} allowCustom={false} fields={this.fieldsCatSub} change={(val) => { this.InputChange({ target: { name: 'IdCategoriaSubcategoria', value: val.value } }); }} allowFiltering={true} placeholder="Categoria Subcategoria" className="pz-input" dataSource={this.props.cat_sub} />
                            </div>
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


//-------------------------------Redux------------------------

function mapStateToProps(state) {
    const { mostrar_crear_sede, init_crear_sede } = state.sedesReducer;
    const {  cat_sub} = state.reducerSubCategoria;
    const { centerInitial, zoomMap } = state.mapsReducer;
    const { cate } = state.categoria;
    const {  user } = state.authentication;
    return { mostrar_crear_sede, user, init_crear_sede, centerInitial, zoomMap, cate, cat_sub};
}


const mapDispatchToProps = {
  
    showMessage: alertActions.showMessage,
    ver_crear_sede: SedeActions.ver_crear_sede,
    crear_sede: SedeActions.crear_sede,
    obtener_empresas: EmpresaActions.obtener_empresas,
    cargar_crear_sede: SedeActions.cargar_crear_sede,
    obtener_cat: categoriaActions.obtener_cat,
    obtener_cate_subcategoria: subcategoriaActions.obtener_cate_subcategoria
    

};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearSede));