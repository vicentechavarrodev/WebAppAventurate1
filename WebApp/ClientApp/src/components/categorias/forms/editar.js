import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { categoriaActions } from '../actions';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col, Image } from 'react-bootstrap';
import { loader } from '../../helpers/loader';



class EditarCategoria extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            categoria: {
                IdCategoria: 0,
                Nombre: '',
                UrlImagen: '',

            },
            file: null
        };


        this.InputChange = this.InputChange.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);
        this.EditCategoriaSubmit = this.EditCategoriaSubmit.bind(this);


    }

    InputChange(e) {
        const { name, value } = e.target;
        const { categoria } = this.state;
        this.setState({
            categoria: {
                ...categoria,
                [name]: value
            }
        });
    }

    async EditCategoriaSubmit(e) {
        e.preventDefault();
        const {
            categoria,
            file
        } = this.state;

        var form = file;

        if (!categoria.Nombre) {
            this.props.showMessage('Debe ingresar un nombre.', true, 'Información');
            return;

        } else if (!categoria.Orden === 0) {
            this.props.showMessage('Debe ingresar un un numero de ordén.', true, 'Información');
            return;

        }

        if (form == null ) {
            form = new FormData();
        }
       

        form.append('Nombre', categoria.Nombre);
        form.append('UrlImagen', categoria.UrlImagen);
        form.append('Orden', categoria.Orden);
        form.append('IdCategoria', localStorage.getItem('idCategoriaSeleccionada'));
        await this.props.editar_categoria(form, this);
        this.props.ver_editar_categoria(false);
       

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


    async componentDidMount() {
        loader.show();
        await this.props.cargar_editar_categoria(localStorage.getItem('idCategoriaSeleccionada'),this);
    }


    render() {
        const { categoria } = this.state;
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Categoría
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditCategoriaSubmit} >

                        <Form.Row sm={10} className=" d-flex justify-content-center" style={{ background: "#ccc" }}>
                            {categoria.UrlImagen !== '' ?

                                <Image src={`/app-images/${categoria.UrlImagen}`} rounded /> :
                                ""
                            }
                        </Form.Row>
                       
                        <Form.Row sm={10}>
                          
                            <Form.Group as={Col} >
                                <label>Selecciona archivo para subir </label>
                                <Form.Control type="file" name="Imagen"  className="pz-input" onChange={this.FileSelectChange} placeholder="Imagen" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={categoria.Nombre}  className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group md="6" >
                            <Form.Control type="number" name="Orden" value={categoria.Orden} onChange={this.InputChange} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10); }}
                                onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Orden" />
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
    const { mostrar_crear_categoria, seleccionar_categoria } = state.categoria;
    return { mostrar_crear_categoria, seleccionar_categoria };
};


const mapDispatchToProps = {

    showMessage: alertActions.showMessage,
    ver_editar_categoria: categoriaActions.ver_editar_categoria,
    obtener_cat: categoriaActions.obtener_cat,
    editar_categoria: categoriaActions.editar_categoria,
    cargar_editar_categoria: categoriaActions.cargar_editar_categoria,
    select_cat: categoriaActions.select_cat

    
    
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarCategoria));