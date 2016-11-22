export const enhanceReducer = (reducer, options = {}) => {
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
                ...reducer(state, action),
                ...{
                    isFetching: true,
                    error: null,
                }
            };
        if (action.type === receiveType) {
            // ignore older requests
            if (state.requestedAt > action.requestedAt)
                return state;
            return {
                ...reducer(state, action),
                ...{
                    isFetching: false,
                    error: action.hasError ? action.payload : null
                }
            };
        }
        return reducer(state, action);
    }
}

export default enhanceReducer;
