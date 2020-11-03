import React from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Button, Table } from 'react-bootstrap';

import { deleteTodo } from '../../redux/todo/todo-action';

import './todo.styles.scss';

const Todos = ({ tasks, removeTask }) => {
    const handleRemove = (task) => {
        removeTask(task)
    }
    return (
        <div className='todo-container'>
            <Table striped>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Created At</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tasks ? tasks.map(todo => {
                            return (
                                <tr className='todo-list' key={todo.id}>
                                    <td>{todo.task.toUpperCase()}</td>
                                    <td>{moment(todo.date.toDate()).calendar()}</td>
                                    <td><Button onClick={() => { handleRemove(todo) }} variant='danger'>Delete</Button></td>
                                </tr>
                            )
                        }) : <tr>No data bummer</tr>
                    }
                </tbody>
            </Table>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeTask: task => dispatch(deleteTodo(task))
    }
}

const mapStateToProps = state => {
    const tasks = state.firestore.ordered.tasks;
    return {
        tasks: tasks,
        uid: state.firebase.auth.uid
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(ownProps => [{
        collection: 'tasks',
        where: ['userId', '==', ownProps.uid],
        orderBy: ['date', 'desc']
    }
    ])
)(Todos);