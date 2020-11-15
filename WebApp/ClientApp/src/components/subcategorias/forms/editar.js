import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { subcategoriaActions } from '../actions';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col, Image } from 'react-bootstrap';
import { loader } from '../../helpers/loader';



class EditarCategoria extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            subcategoria: {
                IdSubCategoria: 0,
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
        const { subcategoria } = this.state;
        this.setState({
            subcategoria: {
                ...subcategoria,
                [name]: value
            }
        });
    }

    async EditCategoriaSubmit(e) {
        e.preventDefault();
        const {
            subcategoria,
            file
        } = this.state;

        var form = file;

        if (!subcategoria.Nombre) {
            this.props.showMessage('Debe ingresar una nombre.', true, 'Información');
            return;

        } 

        if (form == null ) {
            form = new FormData();
        }
       

        form.append('Nombre', subcategoria.Nombre);
        form.append('UrlImagen', subcategoria.UrlImagen);
        form.append('IdSubCategoria', localStorage.getItem('idSubCategoriaSeleccionada'));
        await this.props.editar_subcategoria(form, this);
        this.props.ver_editar_subcategoria(false);
       

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
        await this.props.cargar_editar_subcategoria(localStorage.getItem('idSubCategoriaSeleccionada'),this);
    }


    render() {
        const { subcategoria } = this.state;
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar SubCategoría
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditCategoriaSubmit} >

                        <Form.Row sm={10} className=" d-flex justify-content-center" style={{ background: "#ccc" }}>
                            {subcategoria.UrlImagen !== '' ?

                                <Image src={`/app-images/${subcategoria.UrlImagen}`} rounded /> :
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
                                <Form.Control type="text" name="Nombre" value={subcategoria.Nombre} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>

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
    const { mostrar_editar_subcategoria, id_subcat_sel } = state.reducerSubCategoria;
    return { mostrar_editar_subcategoria, id_subcat_sel };
};


const mapDispatchToProps = {

    showMessage: alertActions.showMessage,
    ver_editar_subcategoria: subcategoriaActions.ver_editar_subcategoria,
    obtener_subcat: subcategoriaActions.obtener_subcat,
    editar_subcategoria: subcategoriaActions.editar_subcategoria,
    cargar_editar_subcategoria: subcategoriaActions.cargar_editar_subcategoria,
    select_subcat: subcategoriaActions.select_subcat

    
    
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarCategoria));