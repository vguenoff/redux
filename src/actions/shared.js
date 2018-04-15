import API from 'goals-todos-api';

// actions
export const RECEIVE_DATA = 'RECEIVE_DATA';

// action creators
const receiveData = (todos, goals) => ({ type: RECEIVE_DATA, todos, goals });

export const handleInitialData = () => dispatch => {
    return Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
        dispatch(receiveData(todos, goals));
    });
};
