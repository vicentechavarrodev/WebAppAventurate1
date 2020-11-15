import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {  subcategoriaActions } from '../actions';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';



class CrearSubCategoria extends Component {

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
        this.CreateSubCategoriaSubmit = this.CreateSubCategoriaSubmit.bind(this);
        
       
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

    async CreateSubCategoriaSubmit(e) {
        e.preventDefault();
        const {
            subcategoria,
            file
        } = this.state;
     

       if (!subcategoria.Nombre) {
            this.props.showMessage('Debe ingresar una nombre.', true, 'Información');
            return;
         
        } else if (file == null || file.get("Imagen") == null) {
            this.props.showMessage('Debe seleccionar una imagén', true, 'Información');
            return;
        }

       file.append('Nombre', subcategoria.Nombre);
       await this.props.crear_subcategoria(file, this);

       this.props.ver_crear_subcategoria(false);
       this.props.obtener_subcat(); 
      
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
                        Crear SubCategoría
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubCategoriaSubmit} >

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <label>Selecciona archivo para subir </label>
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />
    
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
    const { mostrar_crear_subcategoria } = state.reducerSubCategoria;
    return {  mostrar_crear_subcategoria };
};


const mapDispatchToProps = {
    
    showMessage: alertActions.showMessage,
    ver_crear_subcategoria: subcategoriaActions.ver_crear_subcategoria,
    obtener_subcat: subcategoriaActions.obtener_subcat,
    crear_subcategoria: subcategoriaActions.crear_subcategoria
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearSubCategoria));