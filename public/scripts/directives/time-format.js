var Vue = require("vue");
var Moment = require("moment");

Vue.directive('time-format', function (value) {
    console.log(value)
    this.el.textContent = Moment(value).fromNow();
});