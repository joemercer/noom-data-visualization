var jquery = require('jquery');
var lodash = require('lodash');

$ = jquery;
_ = lodash;
var Backbone = require('backbone');

// for libraries that rely on $ and _ being in the global scope. 
jquery.noConflict(true);
lodash.noConflict();