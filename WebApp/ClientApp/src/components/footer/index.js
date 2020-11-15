import React, { Component } from 'react';
import './style.css';
import {  Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
      
        return (
            <div >
                <Row className="mr-0 ">
                    <Col sm={12} md={8} className="pr-0">
                        <ul className="footernav">

                            <li>   <Link to="/terminos_condiciones"  >Términos y Condiciones</Link></li>
                            <li> <Link to="/politicas_privacidad"  >Políticas de Privacidad</Link> </li>

                        </ul>

                    </Col>
                    <Col sm={12} md={4} className="justify-content-center footer">
                        <h6 >Aventurate |  Copyright &reg;  {(new Date().getFullYear())}</h6>

                    </Col>
               

                </Row>
            </div>

        );
    }
}

export default Footer;