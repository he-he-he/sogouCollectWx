/**
 * Created by chuanlong on 2014/12/18.
 */
myApp.directive('pager', function (wxClassApi) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: '<nav><ul class="pagination">' +
        '<li><a href="#" data-num="{{}}">&laquo;</a></li>' +
        '<li ng-repeat="item in items">' +
        '<a href="javascript:;" data-num="{{item}}">{{item}}</a></li>' +
        '<li><a href="#">&raquo;</a></li>' +
        '</ul></nav>',
        link: function (scope, el, attrs) {
            scope.items = [];
            scope.index = 1;
            scope.makeHtml = function (index, total) {
                scope.items.length = 0;
                for (var i = index; i <= total; i++) {
                    scope.items.push(index);
                }
            };
            wxClassApi.total(function (result) {
                scope.total = result.total;
                scope.pageNum = Math.round(scope.total / 10);
                scope.makeHtml(scope.index, scope.pageNum);
            });
            el.on('click', function (e) {
                var target = e.target;
                console.log(target);
                console.log(target.getAttribute('data-num'))
                console.log("%o", target);
                console.dir(target)
            });
        }
    }
});