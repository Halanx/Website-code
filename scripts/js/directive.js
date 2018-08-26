angular.module('halanxApp')
    .directive("fileToUpload", function ($parse) {
        return {
            restrict: "A",
            link: function (scope, elm, attrs) {
                var model = $parse(attrs.fileToUpload);
                var modelSetter = model.assign;

                elm.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, elm[0].files[0]);
                    });
                });
            }
        };
    });