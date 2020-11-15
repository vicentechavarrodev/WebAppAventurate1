import React, { Component } from 'react';
import MenuLateral from '../lateral_bar';
import Header from '../header';
import { connect } from 'react-redux';
import { alertActions } from '../alert_message/actions';
import { withRouter } from "react-router-dom";
import { loader } from '../helpers/loader';
import './style.css';


class VentanaPrincipal extends Component {

    componentDidMount() {
        loader.hide();

        let user = JSON.parse(localStorage.getItem('usuario'));
        if (!user) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="wrapper ">

                <Header iconMenuVisible="2"  />
                <MenuLateral />
                <div id="contentPrincipal"  >
                    <div className="jumbotron container-fluid table-responsive">
                        {this.props.children}
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
    showMessage: alertActions.showMessage,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VentanaPrincipal));