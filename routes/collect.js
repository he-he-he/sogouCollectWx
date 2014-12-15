/**
 * Created by chuanlong on 2014/12/11.
 */
var express = require('express'),
    router = express.Router(),
    jsdom = require("jsdom"),
    fs = require('fs'),
    libxmljs = require("libxmljs"),
    request = require('request'),
    jquery = fs.readFileSync('./app/script/lib/jquery-2.1.1.min.js', 'utf-8');

//router.use(function (req, res, next) {
//    console.log(req.params);
//    next();
//});


/*
 采集微信号
url:/collect/wx/关键字/页数
*/
router.get('/wx/:key/:page', function (req, res) {
    jsdom.env({
        url: 'http://weixin.sogou.com/weixin?query=' + req.params.key + '&page=' + req.params.page + '&ie=utf8',
        src: [jquery],
        done: function (err, window) {
            var $ = window.$;
            var html = [];
            $('._item').each(function () {
                var head = $(this).find('div.img-box img').attr('src');
                var openid = head.substring(head.lastIndexOf('/') + 1);
                var box = $(this).find('div.txt-box');
                var wxCName = $(box).find('h3').text();
                var wxName = $(box).find('h4').text().replace('微信号：', '').replace(/\n/g, '');
                var gn = $(box).find('.s-p3:eq(0) .sp-txt').text();
                var rq = $(this).find('div.pos-ico img:eq(1)').attr('src');
                var rz = '';
                if ($(box).find('.s-p3:eq(1)').text().indexOf('微信认证：') != -1) {
                    rz = $(box).find('.s-p3:eq(1) .sp-txt').text();
                }
                html.push({headPic: head, openid: openid, wxCName: wxCName, wxName: wxName, gn: gn, rz: rz, rq: rq});
            });
            window.close();
            res.json(html);
        }
    });
});


/*
 采集新闻列表
 url:/collect/wz/公众号openid/页数
 */
router.get('/wz/list/:openid/:page', function (req, res) {
    var result = [];
    request('http://weixin.sogou.com/gzhjs?cb=zclwx&openid=' + req.params.openid + '&page=' + req.params.page + '&t=' + Math.random(), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var html = body.replace('zclwx(', '').replace(//g, '').replace(/gbk/g, 'utf-8').replace(/▍/g, '').replace(/▎/g, '');
            html = html.substring(0, html.indexOf('//<') - 3);
            html = JSON.parse(html);
            var xmls = [];
            for (var i = 0; i < html.items.length; i++) {
                var xmlDoc = libxmljs.parseXml(html.items[i]);
                xmls.push({
                    classid: xmlDoc.get('//classid').text(),
                    title: xmlDoc.get('//title').text(),
                    url: xmlDoc.get('//url').text(),
                    imglink: xmlDoc.get('//imglink').text(),
                    headimage: xmlDoc.get('//headimage').text(),
                    isV: xmlDoc.get('//isV').text(),
                    openid: xmlDoc.get('//openid').text(),
                    content: xmlDoc.get('//content').text(),
                    date: xmlDoc.get('//date').text()
                });
            }
            result.push({
                page:html.page,
                totalItems:html.totalItems,
                totalPages:html.totalPages,
                list:xmls
            })
        }
        res.json(result);
    });
});

module.exports = router;