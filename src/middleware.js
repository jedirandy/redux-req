import request from './request';
export const ACTION_TYPE = 'REDUX_REQUEST';

export const middleware = store => next => action => {
    if (action.type === ACTION_TYPE) {
        let {
            url,
            method = 'GET',
            payload,
            requestType,
            receiveType,
            resourceName
        } = action;
        let requestedAt = new Date();
        next({
            type: requestType,
            requestedAt,
            resourceName 
        });
        return request(url, method, {
            payload,
            onSuccess: res => next({
                type: receiveType,
                error: false,
                payload: res,
                requestedAt,
                resourceName
            }),
            onFailure: err => next({
                type: receiveType,
                error: true,
                payload: err,
                requestedAt,
                resourceName
            })
        });
    } else {
        return next(action);
    }
};

export default middleware;