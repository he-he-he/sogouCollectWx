/**
 * Created by chuanlong on 2014/12/12.
 */
var myApp = angular.module('myApp', ['ui.router','ngResource']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index', {
        url:'/index',
        templateUrl:'template/manage.html'
    }).state('wxNumber',{
        url:'/wxNumber',
        templateUrl:'template/wxNumber.html'
    }).state('wxArticle',{
        url:'/wxArticle',
        templateUrl:'template/article.html'
    }).state('wxKey',{
        url:'/wxKey',
        templateUrl:'template/wxKey.html'
    }).state('wxClass',{
        url:'/wxClass',
        templateUrl:'template/wxClass.html'
    }).state('wxAccountCollect',{
        url:'/wxAccountCollect',
        templateUrl:'template/wxAccountCollect.html'
    })
});