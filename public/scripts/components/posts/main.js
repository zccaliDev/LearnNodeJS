var Vue = require("vueResource");

require("directives/time-format.js");

module.exports = Vue.extend({
    template: require("./main.html!text"),
    data: function () {
        return {
            posts: []
        }
    },
    ready: function () {

        // GET /posts/summery
        this.$http.get('posts/summery').then(function (res) {
            this.posts = res.data
        }, function (err) {

        });

    }
});