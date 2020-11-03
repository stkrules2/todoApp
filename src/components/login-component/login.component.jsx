import React from 'react';

import FormInput from "../input-field-component/input-field-component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from '../../firebase/firebase.utils';

import { signIn } from '../../redux/auth/auth.actions';
import { connect } from 'react-redux';

import './login.styles.scss';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.signIn(this.state);
    }
    render() {
        return (
            <div className='login'>
                <h3>Enter your credientials to sign in</h3>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        required
                        handleChange={this.handleChange}
                        label="email"
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        required
                        handleChange={this.handleChange}
                        label="password"
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {""}Sign In Google{""}
                        </CustomButton>
                        <CustomButton isGoogleSignIn>
                            {""}Sign In Facebook{""}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(null, mapDispatchToProps)(Login);