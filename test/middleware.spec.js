import {middleware, ACTION_TYPE} from '../src/main';

describe('middleware tests', () => {
    let store, next;
    before(() => {
        store = sinon.stub();
        next = sinon.stub();
    });
    it('skips non-recognized action types', () => {
        middleware(store)(next)({
            type: 'Whatever'
        })
        expect(next.withArgs({
            type: 'Whatever'
        }).calledOnce).to.equal(true);
    });

    it('dispatch', () => {
        middleware(store)(next)({
            type: ACTION_TYPE,
            requestType: 'REQUEST'
        });
        expect(next.calledWithMatch({
            type: 'REQUEST'
        })).to.equal(true);
    });
});