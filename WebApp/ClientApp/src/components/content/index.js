import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../alert_message/actions';
import { withRouter } from "react-router-dom";


class Content extends Component {


    componentDidMount() {

    }

    render() {

        return (

            <div className="wrapper ">

               

           
            <div className="container-menu ">
                <div id="content" >
                    <div className="  table-responsive">
                            {this.props.children}
                          
                        </div>
                      
                </div>
                  
            </div>
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
    showMessage: alertActions.showMessage,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));