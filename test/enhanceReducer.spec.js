import enhanceReducer from '../src/enhanceReducer';

describe('reducer enhancer', () => {
    const reducer = (state, action) => {
        if (action.type === 'RECEIVE')
            return { data: action.payload };
        return state;
    }
    it('sets initState', () => {
        const enhanced = enhanceReducer(reducer);
        const initState = enhanced(undefined, {
            type: 'AnyType'
        });
        expect(initState.isFetching).to.equal(true);
        expect(initState.error).to.equal(null);
    });
    it('handles request type', () => {
        const enhanced = enhanceReducer(reducer, {
            requestType: 'REQUEST',
            receiveType: 'RECEIVE',
        });
        const state = enhanced({ isFetching: false }, {
            type: 'REQUEST'
        });
        expect(state.isFetching).to.equal(true)
    });
    it('handles receive type with error', () => {
        const enhanced = enhanceReducer(reducer, {
            requestType: 'REQUEST',
            receiveType: 'RECEIVE',
        });
        const state = enhanced({ isFetching: false }, {
            type: 'RECEIVE',
            hasError: true,
            payload: 'some error'
        });
        expect(state.isFetching).to.equal(false);
        expect(state.error).to.equal('some error');
    });
    it('handles receive type with success', () => {
        const enhanced = enhanceReducer(reducer, {
            requestType: 'REQUEST',
            receiveType: 'RECEIVE',
        });
        const state = enhanced({ isFetching: false }, {
            type: 'RECEIVE',
            hasError: false,
            payload: 'some data'
        });
        expect(state.data).to.equal('some data');
    });
    it('abadon receive action if a later request action exists', () => {
        const enhanced = enhanceReducer(reducer, {
            requestType: 'REQUEST',
            receiveType: 'RECEIVE',
        });
        const state = enhanced({
            isFetching: false,
            requestedAt: new Date(1000, 1, 2),
            data: 'new data'
        }, {
            type: 'RECEIVE',
            hasError: false,
            payload: 'expired data',
            requestedAt: new Date(1000, 1, 1)
        });
        expect(state.data).to.equal('new data');
    });
});
