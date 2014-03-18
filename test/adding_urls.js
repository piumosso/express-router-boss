var expect = require('expect.js'),
    Router = require('../lib/router');


describe('Methods .url() and .on()', function(){
    it('should allow you to add a routing rule for one url and one http-method', function(){
        var router;

        router = new Router()
            .url('/a/ - a')
            .on('all', 'middleware 1');

        expect(router.items).to.be.eql([
            {
                url: '/a/',
                name: 'a',
                method: 'all',
                middlewares: ['middleware 1']
            }
        ]);
    });

    it('should allow you to add a routing rule for one url and several http-methods', function(){
        var router;

        router = new Router()
            .url('/a/ - a')
            .on('get', 'middleware 1')
            .on('post', 'middleware 2');

        expect(router.items).to.be.eql([
            {
                url: '/a/',
                name: 'a',
                method: 'get',
                middlewares: ['middleware 1']
            },
            {
                url: '/a/',
                name: 'a',
                method: 'post',
                middlewares: ['middleware 2']
            }
        ]);
    });

    it('should allow you to add a routing rule for several urls', function(){
        var router;

        router = new Router()
            .url('/a/ - a')
            .on('get', 'middleware 1')
            .url('/b/ - b')
            .on('get', 'middleware 2')
            .on('post', 'middleware 3');

        expect(router.items).to.be.eql([
            {
                url: '/a/',
                name: 'a',
                method: 'get',
                middlewares: ['middleware 1']
            },
            {
                url: '/b/',
                name: 'b',
                method: 'get',
                middlewares: ['middleware 2']
            },
            {
                url: '/b/',
                name: 'b',
                method: 'post',
                middlewares: ['middleware 3']
            }
        ]);
    });
});
