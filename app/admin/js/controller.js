/**
 * Created by chuanlong on 2014/12/12.
 */
myApp.controller('wxKeyCtrl', function ($scope, $rootScope, wxKeyApi) {
    $scope.classId='';
    $scope.key = '';
    $scope.isEdit = false;
    $scope.keyItems=wxKeyApi.get();
    $scope.addKey=function(){
        console.log($scope.classId);
        wxKeyApi.post({classid:$scope.classId.id,wxkey:$scope.key},function(result){
            $scope.keyItems.push({id:result.id,classname:$scope.classId.classname,wxkey:$scope.key});
        });
    };
    $scope.stopKey=function(id){
        wxKeyApi.put({flag:0,id:id},function(){
            $scope.keyItems=wxKeyApi.get();
        });
    };
    $scope.startKey=function(id){
        wxKeyApi.put({flag:1,id:id},function(){
            $scope.keyItems=wxKeyApi.get();
        });
    }
});
myApp.controller('classCtrl', function ($scope, $rootScope,wxClassApi) {
    $scope.id = null;
    $scope.className = '';
    $scope.isEdit = false;
    $scope.editClass = function (id) {
        wxClassApi.put({id: $scope.id, name: $scope.className}, function () {
            $scope.isEdit = false;
            $rootScope.classItems=wxClassApi.get();
        });
    };
    $scope.stopClass=function(id){
        wxClassApi.put({flag:0,id:id},function(){
            $rootScope.classItems=wxClassApi.get();
        });
    };
    $scope.startClass=function(id){
        wxClassApi.put({flag:1,id:id},function(){
            $rootScope.classItems=wxClassApi.get();
        });
    }
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
    $rootScope.classItems=wxClassApi.get();
});