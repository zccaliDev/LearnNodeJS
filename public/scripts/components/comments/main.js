var Vue = require("vue");

require("directives/time-format.js");

module.exports = Vue.extend({
    template: require("./main.html!text"),
    props: ["id"],
    data: function () {
        return {
            comments: [],
            newComment: ""
        }
    },
    ready: function () {

        // GET /post
        setTimeout(function () {
            this.$http.get('comments/' + this.id).then(function (res) {
                if (res.data.__proto__.constructor.toString().indexOf("Array") > -1) {
                    this.comments = res.data
                } this.comments = []
            }, function (err) {

            });
        }.bind(this), 1000)
    },
    methods: {
        create: function () {
            if(this.newComment != "") {
                this.$http.post('comments/' + this.id, {body: this.newComment}).then(function (res) {
                    var comment = res.data.body;
                    comment.user = {
                        name: User.name
                    };
                    this.comments.push(comment)
                    this.newComment = "";
                }, function (err) {
                });
            }
        }
    }
});