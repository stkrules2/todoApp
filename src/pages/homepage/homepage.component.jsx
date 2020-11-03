import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import FormInput from '../../components/input-field-component/input-field-component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Todos from '../../components/todo/todo.component';
import { todoAdd } from "../../redux/todo/todo-action";
import './homepage.styles.scss';



class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
        };
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addDataTodo(this.state.input);
        this.setState({ input: '' });
    }
    render() {
        const { currentUser } = this.props;
        if (!currentUser) return <Redirect to='/login' />
        return (
            <Container>
                <form className='todo-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='todo' value={this.state.input} label='To Do' onChange={this.handleChange}></FormInput>
                    <CustomButton type='submit'>Submit</CustomButton>
                </form>
                <Todos />
            </Container>
        )
    }
};

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    return {
        currentUser: uid
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addDataTodo: data => dispatch(todoAdd(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);