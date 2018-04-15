import { ADD_TODO } from '../actions/todos';
import { ADD_GOAL } from '../actions/goals';

// Custom middleware
// Middleware - third party extension point between dispatching an action and the moment it reaches the reducer
// Middleware allows you to hook into the moment after an action is dispatched and before the reducer runs
// To create custom middleware we have to use curring
const checker = store => next => action => {
    if (action.type === ADD_TODO && action.todo.name.toLowerCase().indexOf('bitcoin') !== -1) {
        return alert('Nope. Thats a bad idea.');
    }

    if (action.type === ADD_GOAL && action.goal.name.toLowerCase().indexOf('bitcoin') !== -1) {
        return alert("Nope. That's a bad idea.");
    }

    return next(action);
};

export default checker;
