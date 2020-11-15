import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { LateralMenuActions } from '../lateral_bar/actions';
import { mapsActions } from '../mapsview/actions';
import { alertActions } from '../alert_message/actions';
import { Link } from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import { Row, Col } from 'react-bootstrap';
import SettingsIcon from '@material-ui/icons/Settings';
import { usuarioActions } from '../users/actions';

class LateralMenu extends Component {

    
    state = {
        idItemActive: '',
    }

    componentDidMount() {

        if (this.state.idItemActive === "") {
            document.getElementById("itemMenu1").classList.add("itemActive");
            this.setState({ idItemActive: "itemMenu1" });
            this.props.history.push('/usuarios');
        } else {
           
            document.getElementById(this.state.idItemActive).classList.add("itemActive");
            
        }
        
    }

    constructor(props) {
        super(props);

        this.ItemClick = this.ItemClick.bind(this);
        this.MostrarLogin = this.MostrarLogin.bind(this);
        this.Logout = this.Logout.bind(this);
        
    }

    MostrarLogin(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.history.push('/login');

    }

    Logout(e) {
        e.preventDefault();
        this.props.logout(this.props.history);

    }

    ItemClick = e => {
        e.stopPropagation();
        e.preventDefault();

        console.log(e.target);

        if (this.state.idItemActive !== '') {

            document.getElementById(this.state.idItemActive).classList.remove("itemActive");
        }

        this.setState({ idItemActive: e.target.id });
        document.getElementById(e.target.id).classList.add("itemActive");


        
    }

   


    render() {
        const { menuLateralVisible } = this.props;
       
        return (
           
            <nav  id="sidebar" className={menuLateralVisible} >
                <div className="menu-lateral">
                    <ul className="list-unstyled components">
                        <li onClick={this.ItemClick} id='itemMenu1' >
                            <Link to="/usuarios" id='itemMenu1' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu1' className="justify-content-md-center"><i  className='fa fa-user' id='itemMenu1' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu1'>Usuarios</Col>
                                </Row>
                             </Link>
                        </li>
                        <li onClick={this.ItemClick} id='itemMenu2' >
                            <Link to="/categorias" id='itemMenu2' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu2' className="justify-content-md-center"><i className='fa fa-cog' id='itemMenu2' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu2'>Categorias</Col>
                                </Row>
                            </Link>
                        </li>

                        <li onClick={this.ItemClick} id='itemMenu3' >
                            <Link to="/subcategorias" id='itemMenu3' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu3' className="justify-content-md-center"> <i className='fa fa-cog' id='itemMenu3' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu3'>SubCategorias</Col>
                                </Row>
                            </Link>
                        </li>
                        <li onClick={this.ItemClick} id='itemMenu4' >
                            <Link to="/catsubcategorias" id='itemMenu4' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu3' className="justify-content-md-center"> <i className='fa fa-cog' id='itemMenu4' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu4'>Catego / SubCate</Col>
                                </Row>
                            </Link>
                        </li>
                        <li onClick={this.ItemClick} id='itemMenu5' >
                            <Link to="/empresa" id='itemMenu5' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu5' className="justify-content-md-center"> <i className='fa fa-cog' id='itemMenu5' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu5'>Empresas</Col>
                                </Row>
                            </Link>
                        </li>

                        <li onClick={this.ItemClick} id='itemMenu6' >
                            <Link to="/municipios" id='itemMenu6' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu6' className="justify-content-md-center"> <i className='fa fa-cog' id='itemMenu6' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu6'>Municipios</Col>
                                </Row>
                            </Link>
                        </li>

                      
                        
                    </ul>
                </div>
                <ul className="btn-session">
                    <li>
                        <button onClick={this.Logout} className="btn btn-3d-style btn-default  btn-block"> Cerrar Sesión </button> 
                    </li>
                </ul>
            </nav>
           
        )
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {
    const { user_location, empresas } = state.mapsReducer;
    const { menuLateralVisible } = state.lateralMenuReducer;
    return {
        menuLateralVisible,
        user_location,
        empresas
    };

};

const mapDispatchToProps = {
    logout: usuarioActions.logout,
    showMessage: alertActions.showMessage,
    lateral_menu_visible: LateralMenuActions.lateral_menu_visible,
    obtener_sedes: mapsActions.obtener_sedes
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LateralMenu));
