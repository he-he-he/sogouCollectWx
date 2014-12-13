/**
 * Created by chuanlong on 2014/12/13.
 */
myApp.factory('getKey', function ($resource) {
    return $resource('/api/key/:key', {}, {
        get: {method:'GET', params:{key:'default'}, isArray:true}
    });
});