import request from '../src/request';

describe('request tests', () => {
    let server;
    before(() => {
        server = sinon.fakeServer.create();
    });
    after(() => {
        server.restore();
    });

    it('get json', done => {
        server.respondWith('GET', '/test', [200, { 'Content-Type': 'application/json' },
            JSON.stringify({ name: 'vin' })
        ]);
        request('/test', 'GET', {
            onSuccess: (res) => {
                expect(JSON.parse(res).name).to.equal('vin');
                done();
            }
        })
        server.respond();
    });

    it('error', done => {
        server.respondWith('GET', '/test', [400, {'Content-Type': 'application/text'}, 'error']);
        request('/test', 'GET', {
            onError: (err) => {
                expect(err).to.equal('error');
                done();
            }
        })
        server.respond();
    })
});
