export function resizeable():ng.IDirective {
    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope:any, elem:any, attrs:any) {
            elem.resizable();
            elem.on('resizestop', function (evt:any, ui:any) {
                if (scope.callback) {
                    scope.callback();
                }
            });
        }
    }
}