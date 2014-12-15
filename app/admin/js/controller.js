/**
 * Created by chuanlong on 2014/12/12.
 */
myApp.controller('wxKeyCtrl', function ($scope, $state, getKey) {
    $scope.key = '';
    $scope.items = [];
    $scope.search = function () {
        $scope.items = getKey.get({key: $scope.key});
    }
});
myApp.controller('classCtrl', function ($scope, $state, wxClassApi) {
    $scope.id = null;
    $scope.className = null;
    $scope.isEdit = false;
    $scope.editClass = function (id) {

    };
    $scope.delClass = function (id) {
        wxClassApi.delete({name: id}, function () {
            $scope.items = wxClassApi.get();
        });
    };
    $scope.addClass = function () {
        if ($scope.className !== null) {
            wxClassApi.post({name: $scope.className}, function (result) {
                $scope.items.push({id: result.id, classname: $scope.className});
            });
        }
    };
    $scope.EditShow = function () {
        $scope.isEdit = true;
    };
    $scope.items = wxClassApi.get();
});