var Vue = require("vue");


module.exports = Vue.extend({
    template: require("./main.html!text"),
    props: ["id"],
    data: function () {
        return {
            like: 0
        }
    },
    ready: function () {
        console.log(this.id);
        // GET /post

        setTimeout(function () {
            this.$http.get('likes/' + this.id).then(function (res) {
                this.like = res.data
            }, function (err) {

            });
        }.bind(this), 1000)
    },
    methods: {
        create: function () {
            this.$http.post('likes/' + this.id).then(function (res) {
                this.like = res.data.body;
            }, function (err) {

            });
        }
    }
});