const logger = store => next => action => {
    console.group(action.type);
    console.log('Action: ', action);
    console.log('Prev state: ', store.getState());
    const result = next(action);
    console.log('Next state: ', store.getState());
    console.groupEnd();
    return result;
};

export default logger;
