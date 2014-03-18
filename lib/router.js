var _ = require('underscore');


var Router;


Router = function(){
    this.initialize(arguments);
};


Router.prototype.initialize = function(){
    this.currentUrl = null;
    this.items = [];
    this.resolved = false;
};


Router.prototype.url = function(urlRule){
    var urlParts;

    urlParts = urlRule.split(' - ');
    this.currentUrl = {
        url: urlParts[0]
    };
    if (urlParts.length == 2) {
        this.currentUrl.name = urlParts[1];
    }

    return this;
};


Router.prototype.on = function(){
    var that = this,
        methods,
        middlewares;

    middlewares = Array.prototype.slice.call(arguments);
    methods = middlewares[0];
    middlewares.shift();

    _.chain(methods.split(' '))
        .filter(function(method){
            return _.contains(['all', 'get', 'post', 'put', 'delete'], method);
        })
        .each(function(method){
            that.items.push(_.extend({
                method: method,
                middlewares: middlewares
            }, that.currentUrl));
        });

    return this;
};


module.exports = Router;
