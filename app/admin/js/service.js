/**
 * Created by chuanlong on 2014/12/13.
 */
myApp.factory('getKey', function ($resource) {
    return $resource('/api/key/:key', {}, {
        get: {method: 'GET', params: {key: 'default'}, isArray: true}
    });
});
myApp.factory('wxClassApi', function ($resource) {
    return $resource('/api/class/:name', {}, {
        get: {method: 'GET', params: {}, isArray: true},
        post:{method:'POST',params:{}, isArray: false},
        delete:{method:'DELETE',params:{},isArray: false}
    })
});