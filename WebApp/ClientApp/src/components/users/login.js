import React, { Component } from 'react';
import './style.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {  usuarioActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';
import { Row, Col} from 'react-bootstrap';
import Header from '../header/index';

class Login extends Component {

    cmbTipoInicioRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            codigo: '',
            contrasena: '',
            codigoSede: '',
            itemSelecionado: ''
        };

      
        this.InputChange = this.InputChange.bind(this);
        this.LoginSubmit = this.LoginSubmit.bind(this);
        this.Atras = this.Atras.bind(this);
    }

    InputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('usuario'));
        if (user) {
            this.props.history.push("/ventana");
        }

        loader.hide();
    }

    Atras() {
        this.props.history.push("/");
    }

    async LoginSubmit(e) {
        e.preventDefault();

        const { codigo, contrasena } = this.state;

       

        if (!codigo) {

            this.props.showMessage('Debe ingresar el nombre de usuario.', true, 'Información');
            return;


        } else if (!contrasena) {
            this.props.showMessage('Debe ingresar una contraseña.', true, 'Información');
            return;

        }


        loader.show();
        this.props.login(codigo, contrasena, this.props.history);



    }




    render() {
        const { codigo, contrasena } = this.state;
        return (
            <div className="container-menu ">
                <div id="content" >
                    <div className="table-responsive">
                        <Header iconMenuVisible="3" align="text-right" />
               
                        <div className="login-form"  >
                        <form onSubmit={this.LoginSubmit}  >
                        <div className="form-group" id="codigo">
                            <div className="input-group">
                                <span className="input-group-text"><i className="fa fa-user" /></span>
                                <input type="text" ref='codigo' className="form-control" name="codigo" placeholder="Codigo" value={codigo} onChange={this.InputChange} />
                            </div>
                        </div>

                        <div className="form-group" id="password">
                            <div className="input-group">
                                <span className="input-group-text"><i className="fa fa-lock" /></span>
                                <input type="password" className="form-control" name="contrasena" placeholder="Contraseña" value={contrasena} onChange={this.InputChange} />
                            </div>
                        </div>

                                <Row className="m-0 p-0 " >
                                    <Col className="m-0 p-0 mr-2" onClick={this.LoginSubmit}> <button className="btn btn-default btn-3d-style  btn-block">Entrar </button></Col>
                                    <Col className="m-0 p-0 " onClick={this.Atras}> <button className="btn btn-default btn-3d-style  btn-block">Atras </button></Col>
                                </Row>
                         </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


function mapStateToProps(state) {
    const {  user } = state.authentication;
    return {  user };
};


const mapDispatchToProps = {
    login: usuarioActions.login,
    showMessage: alertActions.showMessage
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
