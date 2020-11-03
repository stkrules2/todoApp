import React from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from '../../components/signup-component/signup.component';
import Login from '../../components/login-component/login.component';
import CustomButton from "../../components/custom-button/custom-button.component";

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import './loginPage.styles.scss';

class loginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            btnText: 'Create a new account',
            viewForm: true
        }
    }

    formChange = () => {
        (this.state.viewForm) ?
            this.setState({ viewForm: false, btnText: 'Login maybe' }) :
            this.setState({
                btnText: 'Create a new account',
                viewForm: true
            })
    }

    render() {
        const { uid } = this.props;
        if (uid) return <Redirect to='/' />
        return (
            <div className='LoginPage'>
                <CustomButton onClick={this.formChange}>{this.state.btnText}</CustomButton>
                {(this.state.viewForm) ?
                    <Login /> : <SignUp />
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    return {
        uid: uid
    }
}

export default connect(mapStateToProps)(loginPage);