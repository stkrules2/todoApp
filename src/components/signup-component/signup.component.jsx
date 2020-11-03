import React from 'react';
import { signUp } from '../../redux/auth/auth.actions';
import { connect } from 'react-redux';

import FormInput from "../input-field-component/input-field-component";
import CustomButton from "../custom-button/custom-button.component";

import './signup.styles.scss';

class SignUp extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        const user = { email, password };
        this.props.signUp(user);
    }
    render() {
        const { email, password, confirmPassword } = this.state;
        return (<div className='sign-up'>
            <h3>Enter your details to get a new account</h3>
            <form onSubmit={this.handleSubmit}>
                <FormInput type='email' name='email' value={email} onChange={this.handleChange} label='Email' required></FormInput>
                <FormInput type='password' name='password' value={password} onChange={this.handleChange} label='Password' required></FormInput>
                <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleChange} label='Confirm Password' required></FormInput>
                <div className="buttons">
                    <CustomButton type="submit">Sign Up</CustomButton>
                </div>
            </form>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);