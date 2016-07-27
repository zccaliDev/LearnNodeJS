
(function () {
    SystemJS.config({
        baseURL: '/public/scripts',
        map: {
            vue: "vue.js",
            moment: "moment.js",
            vueResource: "vueResourceConfig.js",
            text: "text.js"
        },
        packages: {
            "components/posts": {
                main: "main.js"
            },
            "components/post": {
                main: "main.js"
            },
            "components/comments": {
                main: "main.js"
            },
            "components/likes": {
                main: "main.js"
            }
        }
    });
})();
