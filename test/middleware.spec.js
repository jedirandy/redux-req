import {middleware, ACTION_TYPE} from '../src';
import * as request from '../src/request';
describe('middleware tests', () => {
    let store, next;
    let reqLib;
    before(() => {
        reqLib = sinon.stub(request, 'default');
    });

    after(() => {
        reqLib.restore();
    });

    beforeEach(() => {
        store = sinon.stub();
        next = sinon.stub();
    });

    afterEach(() => {
        reqLib.reset();
    });

    it('skips non-recognized action types', () => {
        middleware(store)(next)({
            type: 'Whatever'
        })
        expect(next.withArgs({
            type: 'Whatever'
        }).calledOnce).to.equal(true);
    });

    it('dispatch a request event', () => {
        middleware(store)(next)({
            type: ACTION_TYPE,
            requestType: 'REQUEST',
            receiveType: 'RECEIVE',
            resourceName: 'api'
        });
        expect(next.calledWithMatch({
            type: 'REQUEST',
            resourceName: 'api'
        })).to.equal(true);
    });

    it('handles successful request', () => {
        middleware(store)(next)({
            type: ACTION_TYPE,
            url: '/testSuccess',
            method: 'GET',
            requestType: 'REQUEST',
            receiveType: 'RECEIVE',
            resourceName: 'api'
        });
        reqLib.returns(1);
        reqLib.firstCall.args[2].onSuccess('result');
        expect(reqLib.calledOnce).to.equal(true);
        expect(next.calledTwice).to.equal(true);
        expect(next.lastCall.args[0]).to.have.property('type', 'RECEIVE');
        expect(next.lastCall.args[0]).to.have.property('error', false);
        expect(next.lastCall.args[0]).to.have.property('payload', 'result');
        expect(next.lastCall.args[0]).to.have.property('resourceName', 'api');
        expect(next.lastCall.args[0]).to.have.property('requestedAt');
    });

    it('handles failed request', () => {
        middleware(store)(next)({
            type: ACTION_TYPE,
            url: '/testFailure',
            method: 'GET',
            requestType: 'REQUEST',
            receiveType: 'RECEIVE',
            resourceName: 'api'
        });
        reqLib.returns(1);
        reqLib.firstCall.args[2].onFailure('error reason');
        expect(reqLib.calledOnce).to.equal(true);
        expect(next.calledTwice).to.equal(true);
        expect(next.lastCall.args[0]).to.have.property('type', 'RECEIVE');
        expect(next.lastCall.args[0]).to.have.property('error', true);
        expect(next.lastCall.args[0]).to.have.property('payload', 'error reason');
        expect(next.lastCall.args[0]).to.have.property('resourceName', 'api');
        expect(next.lastCall.args[0]).to.have.property('requestedAt');
    });
});