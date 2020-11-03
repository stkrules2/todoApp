export const todoAdd = (task) => {
	//console.log(data);
	return (dispatch, getState, { getFirebase }) => {
		const firestore = getFirebase().firestore();
		const userId = getState().firebase.auth.uid;
		firestore
			.collection('tasks')
			.add({ task, date: new Date(), userId: userId })
			.then(() => {
				dispatch({
					type: 'ADD_TODO',
					task,
				});
			})
			.catch((err) => {
				dispatch({
					type: 'ADD_TODO_ERR',
					err,
				});
			});
		// type: actionTypes.ADD_TODO,
		// payload: data,
	};
};
export const deleteTodo = (task) => {
	return (dispatch, getState, { getFirebase }) => {
		const firestore = getFirebase().firestore();
		firestore
			.collection('tasks')
			.doc(task.id)
			.delete()
			.then(() => {
				dispatch({
					type: 'DELETE_TODO',
				});
			})
			.catch((err) => {
				dispatch({
					type: 'DELETE_TODO_ERR',
					err,
				});
			});
	};
};
