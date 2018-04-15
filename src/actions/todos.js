import API from 'goals-todos-api';

// actions
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

// action creators
const addTodo = todo => ({ type: ADD_TODO, todo });
const removeTodo = id => ({ type: REMOVE_TODO, id });
const toggleTodo = id => ({ type: TOGGLE_TODO, id });

export const handleAddTodo = (name, callback) => dispatch => {
    return API.saveTodo(name)
        .then(todo => {
            dispatch(addTodo(todo));
            callback();
        })
        .catch(() => {
            alert('There was an error. Try again.');
        });
};

export const handleDeleteTodo = todo => dispatch => {
    dispatch(removeTodo(todo.id));

    return API.deleteTodo(todo.id).catch(() => {
        dispatch(addTodo(todo));
        alert('An error occurred. Try again.');
    });
};

export const handleToggleTodo = id => dispatch => {
    dispatch(toggleTodo(id));

    return API.saveTodoToggle(id).catch(() => {
        dispatch(toggleTodo(id));
        alert('An error occurred. Try again.');
    });
};
