/**
 * Created by chuanlong on 2014/12/18.
 */
//分页指令
myApp.directive('pager', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<nav><ul class="pagination">' +
        '<li><a href="javascript:;" data-num="{{firstIndex}}">&laquo;</a></li>' +
        '<li ng-repeat="item in pageitems">' +
        '<a href="javascript:;" data-num="{{item}}">{{item}}</a></li>' +
        '<li><a href="javascript:;" data-num="{{lastIndex}}">&raquo;</a></li>' +
        '</ul></nav>',
        link: function (scope, el, attrs) {
            scope.pageitems = [];
            scope.firstIndex = 1;
            scope.lastIndex = 1;
            scope.makeHtml = function (index, total) {
                console.log(index,total)
                scope.lastIndex=total;
                scope.pageitems.length = 0;
                for (var i = index; i <= total; i++) {
                    scope.pageitems.push(i);
                }
            };
            el.on('click', function (e) {
                var target = e.target;
                if(target.nodeName==='A'){
                    scope.index = target.getAttribute('data-num');
                    scope.getData(scope.index);
                }

            });
        }
    }
});