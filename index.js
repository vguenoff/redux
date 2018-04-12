// library code
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
// end of library code

/*
note: Characteristics of a Pure Function:
1) They always return the same results if the same arguments are passed in.
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/

// App code
// actions
const addTodo = 'ADD_TODO';
const removeTodo = 'REMOVE_TODO';
const toggleTodo = 'TOGGLE_TODO';
const addGoal = 'ADD_GOAL';
const removeGoal = 'REMOVE_GOAL';

// action creators
const addTodoAction = todo => ({ type: addTodo, todo });
const removeTodoAction = id => ({ type: removeTodo, id });
const toggleTodoAction = id => ({ type: toggleTodo, id });
const addGoalAction = goal => ({ type: addGoal, goal });
const removeGoalAction = id => ({ type: removeGoal, id });

// todos reducer function
function todos(state = [], action) {
    switch (action.type) {
        case addTodo:
            return state.concat(action.todo);
        case removeTodo:
            return state.filter(todo => todo.id !== action.id);
        case toggleTodo:
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
        case addGoal:
            return state.concat(action.goal);
        case removeGoal:
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

const store = createStore(app);
const unsubscribe = store.subscribe(() => {
    console.log('----------------------');
    console.log('The new state will be:', store.getState());
});

store.dispatch(
    addTodoAction({
        id: 1,
        name: 'Learn React',
        complete: false,
    })
);

store.dispatch(
    addTodoAction({
        id: 2,
        name: 'Learn Redux',
        complete: false,
    })
);

store.dispatch(removeTodoAction(2));

store.dispatch(toggleTodoAction(1));

store.dispatch(
    addGoalAction({
        id: 1,
        name: 'Learn To Swim',
        complete: false,
    })
);

store.dispatch(
    addGoalAction({
        id: 2,
        name: 'Lose 5 kilos',
        complete: false,
    })
);

store.dispatch(removeGoalAction(2));

unsubscribe();
