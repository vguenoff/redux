// Todo actions
// {
//     type: 'ADD_TODO',
//     todo: {
//         id: 0,
//         name: 'Learn Redux',
//         complete: false,
//     }
// }
// {
//     type: 'REMOVE_TODO',
//     id: 0,
// }
// {
//     type: 'TOGGLE_TODO',
//     id: 0,
// }
// Goals actions
// {
//     type: 'ADD_GOAL',
//     goal: {
//         id: 0,
//         name: 'Run a Marathon',
//     }
// }
// {
//     type: 'REMOVE_GOAL',
//     id: 0,
// }

/*
Characteristics of a Pure Function:
1) They always return the same results if the same arguments are passed in.
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/

// Reducer function
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

// const store = createStore(todos);
// const unsubscribe = store.subscribe(() => {
//     console.log('The new state will be', store.getState());
// });
// unsubscribe();

// store.dispatch({
//     type: 'ADD_TODO',
//     todo: {
//         id: 2,
//         name: 'Learn React',
//         complete: false,
//     },
// });

// store.dispatch({
//     type: 'REMOVE_TODO',
//     id: 2,
// });

// store.dispatch({
//     type: 'TOGGLE_TODO',
//     id: 1,
// });
