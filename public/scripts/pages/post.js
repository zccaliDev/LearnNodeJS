System.import("vue").then(function (Vue) {
    System.import("components/post").then(function (PostComponent) {
        new Vue({
            el: '#app',
            components: {
                "post": PostComponent
            }
        })
    });
})