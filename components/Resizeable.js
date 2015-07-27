///<reference path='../references.ts'/>
var app;
(function (app) {
    function resizeable() {
        return {
            restrict: 'A',
            scope: {
                callback: '&onResize'
            },
            link: function postLink(scope, elem, attrs) {
                elem.resizable();
                elem.on('resizestop', function (evt, ui) {
                    if (scope.callback) {
                        scope.callback();
                    }
                });
            }
        };
    }
    app.resizeable = resizeable;
})(app || (app = {}));
//# sourceMappingURL=Resizeable.js.map