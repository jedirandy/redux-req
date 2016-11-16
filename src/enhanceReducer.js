const enhanceReducer = (reducer, options = {}) => {
    const initState = {
        ...reducer(undefined, {}),
        ...{
            isFetching: true,
            error: null,
            requestedAt: new Date()
        }
    };

    const { requestType, receiveType } = options;
    return (state = initState, action) => {
        if (action.type === requestType)
            return {
                ...state,
                ...{
                    isFetching: true,
                    error: null,
                }
            };
        if (action.type === receiveType && action.hasError)
            return {
                ...state,
                ...{
                    isFetching: false,
                    error: action.payload
                }
            };
        if (action.type === receiveType)
            return {
                ...reducer(state, action),
                ...{
                    isFetching: false,
                    error: null
                }
            };
        const nextState = reducer(state, action);
        return nextState;
    }
}

export default enhanceReducer;
