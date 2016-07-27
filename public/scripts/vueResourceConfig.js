var Vue = require("vue");
var VueResource = require("vue-resource.js");

Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:9000/api';
Vue.http.headers.common = {
    token: User.token
};

module.exports = Vue;