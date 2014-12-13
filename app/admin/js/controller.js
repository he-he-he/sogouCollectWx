/**
 * Created by chuanlong on 2014/12/12.
 */
myApp.controller('wxKeyCtrl', function ($scope, $state,getKey) {
    $scope.key = '';
    $scope.items = [{id: 1, name: '1'}, {id: 2, name: '2'}]
    $scope.search = function () {
        $scope.items = getKey.get({key:$scope.key});
    }
});