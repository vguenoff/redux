import API from 'goals-todos-api';

// actions
export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

// action creators
const addGoal = goal => ({ type: ADD_GOAL, goal });
const removeGoal = id => ({ type: REMOVE_GOAL, id });

// Abstract data fetching code into action creators
// Action creator to interact with the API and then dispatching the action
// This action creator returns a function instead an object
// Clean separation of the UI logic from the data fetching logic FTW
export const handleAddGoal = (name, callback) => dispatch => {
    return API.saveGoal(name)
        .then(goal => {
            dispatch(addGoal(goal));
            callback();
        })
        .catch(() => {
            alert('There was an error. Try again.');
        });
};

export const handleDeleteGoal = goal => dispatch => {
    dispatch(removeGoal(goal.id));

    return API.deleteGoal(goal.id).catch(() => {
        dispatch(addGoal(goal));
        alert('An error occurred. Try again.');
    });
};
