System.import("vue").then(function (Vue) {
    System.import("components/posts").then(function (PostComponent) {
        new Vue({
            el: '#app',
            components: {
                "posts": PostComponent
            }
        })
    });
})