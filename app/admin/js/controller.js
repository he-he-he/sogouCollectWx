/**
 * Created by chuanlong on 2014/12/12.
 */
myApp.controller('wxKeyCtrl', function ($scope, $state) {
    $scope.key = '';
    $scope.items=[];
    $scope.search=function(){
        $scope.items=[{name:'a'},{name:'b'},{name:'c'}]
    }
});