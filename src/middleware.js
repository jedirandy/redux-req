import request from './request';
export const ACTION_TYPE = 'REDUX_REQUEST';

export const middleware = store => next => action => {
    if (action.type === ACTION_TYPE) {
        let requestedAt = new Date();
        next({
            type: action.requestType,
            requestedAt: requestedAt
        });
        return request(action.url, action.method, {
            onSuccess: res => next({
                type: action.receiveType,
                error: false,
                payload: res
            }),
            onFailure: err => next({
                type: action.receiveType,
                error: true,
                payload: err,
                requestedAt: requestedAt
            })
        })
    } else {
        return next(action);
    }
};

export default middleware;