import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {  categoriaActions } from '../actions';
import { alertActions } from '../../alert_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';



class CrearCategoria extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            categoria: {
                IdCategoria: 0,
                Nombre: '',
                UrlImagen: '',
                Orden:0
                
            },
            file: null
        };


        this.InputChange = this.InputChange.bind(this);

        this.FileSelectChange = this.FileSelectChange.bind(this);
        this.CreateSubCategoria = this.CreateSubCategoria.bind(this);
        
       
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

     CreateSubCategoria(e) {
       e.preventDefault();
        const {
            categoria,
            file
        } = this.state;
     

        if (!categoria.Nombre) {
            this.props.showMessage('Debe ingresar una nombre.', true, 'Información');
            return;
         
        } else if (file == null || file.get("Imagen") == null) {
            this.props.showMessage('Debe seleccionar una imagén', true, 'Información');
            return;
        } else if (!categoria.Orden ===0)  {
             this.props.showMessage('Debe ingresar un un numero de ordén.', true, 'Información');
             return;

         }

         file.append('Nombre', categoria.Nombre);
         file.append('Orden', categoria.Orden);
         this.props.crear_categoria(file, this);
         this.props.ver_crear_categoria(false);
      
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
                        Crear Categoría
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubCategoria} >

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <label>Selecciona archivo para subir </label>
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />
    
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
    const { mostrar_crear_categoria } = state.categoria;
    return {  mostrar_crear_categoria };
};


const mapDispatchToProps = {
    
    showMessage: alertActions.showMessage,
    ver_crear_categoria: categoriaActions.ver_crear_categoria,
    obtener_cat: categoriaActions.obtener_cat,
    crear_categoria: categoriaActions.crear_categoria
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearCategoria));