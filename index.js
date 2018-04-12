/*
Characteristics of a Pure Function:
1) They always return the same results if the same arguments are passed in.
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/

// todos reducer function
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat(action.todo);
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'TOGGLE_TODO':
            return state.map(
                todo =>
                    todo.id !== action.id
                        ? todo
                        : {
                              ...todo,
                              complete: !todo.complete,
                          }
            );
        default:
            return state;
    }
}

// goals reducer function
function goals(state = [], action) {
    switch (action.type) {
        case 'ADD_GOAL':
            return state.concat(action.goal);
        case 'REMOVE_GOAL':
            return state.filter(goal => goal.id !== action.id);
        default:
            return state;
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    };
}

function createStore(reducer) {
    // The store should have four parts:
    // 1. The state
    // 2. Get the state.
    // 3. Listen to changes on the state.
    // 4. Update the state.

    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = listener => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    const dispatch = action => {
        // call todos
        state = reducer(state, action);
        // loop over listeners and invoke them
        listeners.forEach(listener => listener());
    };

    return {
        getState,
        subscribe,
        dispatch,
    };
}

const store = createStore(app);
const unsubscribe = store.subscribe(() => {
    console.log('The new state will be', store.getState());
});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Learn React',
        complete: false,
    },
});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 2,
        name: 'Learn Redux',
        complete: false,
    },
});

store.dispatch({
    type: 'REMOVE_TODO',
    id: 2,
});

store.dispatch({
    type: 'TOGGLE_TODO',
    id: 1,
});

store.dispatch({
    type: 'ADD_GOAL',
    goal: {
        id: 1,
        name: 'Learn To Swim',
        complete: false,
    },
});

store.dispatch({
    type: 'ADD_GOAL',
    goal: {
        id: 2,
        name: 'Lose 5 kilos',
        complete: false,
    },
});

store.dispatch({
    type: 'REMOVE_GOAL',
    id: 2,
});

unsubscribe();
