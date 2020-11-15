import React, { Component } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { alertActions } from './components/alert_message/actions';
import Footer from '../src/components/footer';

class App extends Component {
   


 
    render() {

      

        const { show, message, title } = this.props;
        return (
         
            <div className="wrapper">

                {this.props.children}
              
                <SweetAlert
                    show={show}
                    title={title}
                    onConfirm={() => { this.props.showMessage('', false, '') }}
                    onCancel={this.onCancel}
                    customButtons={
                        <React.Fragment>
                            <button className="btn btn-default " onClick={() => { this.props.showMessage('', false, '') }}>Entendido</button>
                        </React.Fragment>}>
                    {message}
                </SweetAlert>
             
            </div>

        );
    }



}



//-------------------------------Redux------------------------

function mapStateToProps(state) {
    const { show, message, type, title } = state.alerts;
    return { show, message, type, title };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage

};


export default connect(mapStateToProps, mapDispatchToProps)(App);

