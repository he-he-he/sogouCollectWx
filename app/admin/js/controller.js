/**
 * Created by chuanlong on 2014/12/12.
 */
myApp.controller('wxKeyCtrl', function ($scope, $rootScope, wxKeyApi) {
    $scope.classItem = '';
    $scope.key = '';
    $scope.id = '';
    $scope.isEdit = false;
    $scope.classId ='';
    $scope.keyItems = wxKeyApi.get();
    $scope.addKey = function () {
        wxKeyApi.post({classid: $scope.classId, wxkey: $scope.key}, function (result) {
            $scope.keyItems.push({id: result.id, classname: $scope.classItem.classname, wxkey: $scope.key});
        });
    };
    $scope.stopKey = function (id) {
        wxKeyApi.put({flag: 0, id: id}, function () {
            $scope.keyItems = wxKeyApi.get();
        });
    };
    $scope.startKey = function (id) {
        wxKeyApi.put({flag: 1, id: id}, function () {
            $scope.keyItems = wxKeyApi.get();
        });
    };
    $scope.editKey = function () {
        wxKeyApi.put({id: $scope.id, wxkey: $scope.key, classid: $scope.classId}, function () {
            $scope.isEdit = false;
            $scope.keyItems = wxKeyApi.get();
        });
    };
    $scope.cancelKey=function(){
        $scope.key = '';
        $scope.id = '';
        $scope.isEdit = false;
        $scope.classId ='';
    };
    $scope.editShow = function (index) {
        $scope.isEdit = true;
        $scope.id = $scope.keyItems[index].id;
        $scope.key = $scope.keyItems[index].wxkey;
    };
    $scope.selectAction = function () {
        if ($scope.classItem) {
            $scope.classId = $scope.classItem.id;
        }else{
            $scope.classId ='';
        }
    };
});
myApp.controller('wxClassCtrl', function ($scope, $rootScope, wxClassApi) {
    $scope.id = null;
    $scope.className = '';
    $scope.isEdit = false;
    $scope.editClass = function (id) {
        wxClassApi.put({id: $scope.id, name: $scope.className}, function () {
            $scope.isEdit = false;
            $rootScope.classItems = wxClassApi.get();
        });
    };
    $scope.stopClass = function (id) {
        wxClassApi.put({flag: 0, id: id}, function () {
            $rootScope.classItems = wxClassApi.get();
        });
    };
    $scope.startClass = function (id) {
        wxClassApi.put({flag: 1, id: id}, function () {
            $rootScope.classItems = wxClassApi.get();
        });
    };
    $scope.addClass = function () {
        if ($scope.className !== '') {
            wxClassApi.post({name: $scope.className}, function (result) {
                $rootScope.classItems.push({id: result.id, classname: $scope.className});
            });
        }
    };
    $scope.editShow = function (index) {
        $scope.isEdit = true;
        $scope.className = $rootScope.classItems[index].classname;
        $scope.id = $rootScope.classItems[index].id;
    };
    $scope.cancelClass = function () {
        $scope.isEdit = false;
        $scope.id = null;
        $scope.className = null;
    };
    $rootScope.classItems = wxClassApi.get();
});