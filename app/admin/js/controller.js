/**
 * Created by chuanlong on 2014/12/12.
 */
myApp.controller('wxKeyCtrl', function ($scope, $rootScope, wxKeyApi, wxClassApi) {
    $scope.classItem = '';
    $scope.key = '';
    $scope.id = '';
    $scope.isEdit = false;
    $scope.classId = '';
    $scope.classItems = wxClassApi.getAll({page: 0});
    $scope.index = 1;
    $scope.addKey = function () {
        if ($scope.classId != '' && $scope.key != '') {
            wxKeyApi.post({classid: $scope.classId, wxkey: $scope.key}, function (result) {
                $scope.keyItems.unshift({id: result.id, classname: $scope.classItem.classname, wxkey: $scope.key});
                $scope.key = '';
            });
        }
    };
    $scope.stopKey = function (id) {
        wxKeyApi.put({flag: 0, id: id}, function () {
            $scope.getData($scope.index);
        });
    };
    $scope.startKey = function (id) {
        wxKeyApi.put({flag: 1, id: id}, function () {
            $scope.getData($scope.index);
        });
    };
    $scope.editKey = function () {
        wxKeyApi.put({id: $scope.id, wxkey: $scope.key, classid: $scope.classId}, function () {
            $scope.isEdit = false;
            $scope.getData($scope.index);
            $scope.key = '';
        });
    };
    $scope.cancelKey = function () {
        $scope.key = '';
        $scope.id = '';
        $scope.isEdit = false;
        $scope.classId = '';
    };
    $scope.editShow = function (index) {
        $scope.isEdit = true;
        $scope.id = $scope.keyItems[index].id;
        $scope.key = $scope.keyItems[index].wxkey;
    };
    $scope.selectAction = function () {
        if ($scope.classItem) {
            $scope.classId = $scope.classItem.id;
        } else {
            $scope.classId = '';
        }
    };
    $scope.getData = function (index) {
        $scope.keyItems = wxKeyApi.get({page: index});
    };
    $scope.getData($scope.index);
    wxKeyApi.total(function (result) {
        $scope.total = result.total;
        $scope.pageNum = Math.round($scope.total / 10);
        $scope.makeHtml($scope.index, $scope.pageNum);
    });
});
myApp.controller('wxClassCtrl', function ($scope, wxClassApi) {
    $scope.id = null;
    $scope.className = '';
    $scope.isEdit = false;
    $scope.index = 1;
    $scope.editClass = function (id) {
        wxClassApi.put({id: $scope.id, name: $scope.className}, function () {
            $scope.isEdit = false;
            $scope.getData($scope.index);
        });
    };
    $scope.stopClass = function (id) {
        wxClassApi.put({flag: 0, id: id}, function () {
            $scope.getData($scope.index);
        });
    };
    $scope.startClass = function (id) {
        wxClassApi.put({flag: 1, id: id}, function () {
            $scope.getData($scope.index);
        });
    };
    $scope.addClass = function () {
        if ($scope.className !== '') {
            wxClassApi.post({name: $scope.className}, function (result) {
                $scope.classItems.unshift({id: result.id, classname: $scope.className});
                $scope.className = '';
            });
        }
    };
    $scope.editShow = function (index) {
        $scope.isEdit = true;
        $scope.className = $scope.classItems[index].classname;
        $scope.id = $scope.classItems[index].id;
    };
    $scope.cancelClass = function () {
        $scope.isEdit = false;
        $scope.id = null;
        $scope.className = null;
    };
    $scope.getData = function (index) {
        $scope.classItems = wxClassApi.get({page: index})
    };
    $scope.getData($scope.index);
    wxClassApi.total(function (result) {
        $scope.total = result.total;
        $scope.pageNum = Math.round($scope.total / 10);
        $scope.makeHtml($scope.index, $scope.pageNum);
    });
});

myApp.controller('wxNumberCtrl', function ($scope) {

});