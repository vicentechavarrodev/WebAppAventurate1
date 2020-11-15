import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import { LateralMenuActions } from '../lateral_bar/actions';
import { HeaderActions } from '../header/actions';
import {  Row, Col} from 'react-bootstrap';
import { usuarioActions } from '../users/actions';
import { Link } from "react-router-dom";

class Header extends Component {

   

    constructor() {
        super();
        this.MostrarMenu = this.MostrarMenu.bind(this);
        this.MostrarLogin = this.MostrarLogin.bind(this);
        this.Logout = this.Logout.bind(this);
        this.ItemClick = this.ItemClick.bind(this);
        
    }

    ItemClick = e => {
        e.stopPropagation();
        e.preventDefault();

        console.log(e.target.id);

        if (this.props.id_item_menu !== '') {

            document.getElementById(this.props.id_item_menu).classList.remove("active");
        }
        this.props.seleccionar_id_item(e.target.id);
        localStorage.setItem('item_menu_header', e.target.id);
        document.getElementById(e.target.id).classList.add("active");

       
        
    }

    
    MostrarMenu(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.menuLateralVisible === 'noActive') {
            this.props.lateral_menu_visible('active');

        } else {
            this.props.lateral_menu_visible('noActive');
        }

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

    abrirMenu(e) {
        e.preventDefault();
    var x = document.getElementById("menuTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

    render() {
        return (
            <nav className="navbar-header navbar-expand-sm navbar-dark fixed-top ">
                <Row className="content-logo pt-2 pb-2 justify-content-center">
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.facebook.com/instagram/"> <i className="fa fa-facebook" aria-hidden="true" /></a></Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.facebook.com/instagram/"> <i className="fa fa-instagram" aria-hidden="true" /></a></Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.facebook.com/instagram/">  <img  src={"/app-images/generales/map_icon.png"} alt="logo" /></a></Col>
                    <Col sm={1} md={1} className="text-center" >
                        <Link to="/"  >

                            <img className="logo" src={"/app-images/generales/logo_main.png"} alt="logo" />
                            
                        </Link>
                   </Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href="https://www.facebook.com/instagram/"> <i className="fa fa-youtube-play" aria-hidden="true" />  </a></Col>
                    <Col sm={1} md={1} className="text-center" ><a target="_blank" href={"https://api.whatsapp.com/send?phone=57" + "3153504393" + "&text= Hola!%20Quiero%20mas%20información!"}><i className="fa fa-whatsapp"></i></a></Col>
                    <Col sm={1} md={1} className="text-center" >
                        <Link to="/contacto"  >

                            <i className="fa fa-envelope" aria-hidden="true" />

                        </Link>

                   </Col>
                </Row>
               
               

                    <Row>
                    <Col xs={3} lg={12} md={3}>
                        <div className={`justify-content-center ${this.props.align}`}  >
                                {this.props.iconMenuVisible === "2" ?

                                <button type="button" id="sidebarCollapse" onClick={this.MostrarMenu} value="collapse" className="btn  " style={{ "color": "#97BF13" }}>
                                        <MenuIcon id="btncollapse" visibility={this.props.iconMenuVisible} />
                                    </button> :
                                    ""
                                }
                            </div>

                            {this.props.iconMenuVisible === "1" ?
                                <div className="topnav" id="menuTopnav">
                                    <a href="#" className="icon" onClick={this.abrirMenu}>
                                        <i className="fa fa-bars"></i>
                                    </a>
                                    <div onClick={this.ItemClick} id='blog'  >
                                        <Link to="/blog" id='blog' className={this.props.id_item_menu === "blog" ? "active" : ""} >
                                            <Row>
                                                <Col xs={12} md={12} className="text-center" id='blog'>Blog</Col>
                                            </Row>
                                        </Link>
                                    </div>


                                    <div onClick={this.ItemClick} id='fotos' >
                                        <Link to="/galeria" id='fotos' className={this.props.id_item_menu === "fotos" ? "active" : ""}  >
                                            <Row>
                                                <Col xs={12} md={12} className="text-center" id='fotos'>Fotos</Col>
                                            </Row>
                                        </Link>
                                    </div>



                                    <div onClick={this.ItemClick} id='inicio'  >
                                        <Link to="/" id='inicio' className={this.props.id_item_menu === "inicio" ? "active" : ""} >
                                            <Row>
                                                <Col xs={12} md={12} className="text-center" id='inicio'>Inicio</Col>
                                            </Row>
                                        </Link>
                                    </div>



                                    <div onClick={this.ItemClick} id='quienes'  >
                                        <Link to="/quienes_somos" id='quienes' className={this.props.id_item_menu === "quienes" ? "active" : ""} >
                                            <Row>
                                                <Col xs={12} md={12} className="text-center" id='quienes'>Quienes Somos</Col>
                                            </Row>
                                        </Link>
                                    </div>

                                    <div onClick={this.ItemClick} id='contacto'  >
                                        <Link to="/contacto" id='contacto' className={this.props.id_item_menu === "contacto" ? "active" : ""}  >
                                            <Row>
                                                <Col xs={12} md={12} className="text-center" id='contacto'>Contacto</Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </div>
                                :

                                ""
                            }
                    </Col>
                    <Col xs={6} md={6} lg={0}  >
                            <Link to="/"  >
                                 <img className="logo content-logo-sm  pt-1 pb-1" src={"/app-images/generales/logo_main.png"} alt="logo" />
                            </Link>
                            </Col>
               
                    <Col xs={3} md={3} lg={0}  >
                   
                    </Col>
                  </Row>
              
            </nav>

        )
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {

    const { id_item_menu } = state.HeaderReducer;
    const { user_address, layerSeleccionado } = state.mapsReducer;
    const { menuLateralVisible } = state.lateralMenuReducer;
    return {
        menuLateralVisible,
        user_address,
        layerSeleccionado,
        id_item_menu
    };

};

const mapDispatchToProps = {
    lateral_menu_visible: LateralMenuActions.lateral_menu_visible,
    logout: usuarioActions.logout,
    seleccionar_id_item: HeaderActions.seleccionar_id_item,

};




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
