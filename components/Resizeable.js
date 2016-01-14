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
exports.resizeable = resizeable;
//# sourceMappingURL=Resizeable.js.map