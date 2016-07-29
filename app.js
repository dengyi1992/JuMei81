var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var Events= new require("events");
var myEvent = new Events();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var Iconv = require('iconv').Iconv;//用于乱码解决
var iconv = new Iconv('GBK', 'UTF-8');
var time = new Date().getTime();
time += 1000;
var date = new Date(time);
console.log(date.toLocaleString());
console.log(new Date().toLocaleString());
var schedule = require('node-schedule');


var request = require('request');
myEvent.on("addCart",function(items){
    var options = {
        url: 'http://h5.jumei.com/cart/add?items='+items,
        headers: {
            "X-DevTools-Emulate-Network-Conditions-Client-Id": "1F5C1322-FF80-416C-96B6-5CB5A0F460A8",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36",
            "Accept": "*/*",
            "Referer": "http://h5.jumei.com/product/detail?item_id=df160714p2812162&type=jumei_pop",
            "Accept-Encoding": "gzip, deflate, sdch",
            "Accept-Language": "zh-CN,zh;q=0.8",
            "Cookie": "first_visit_time=1469791925; cookie_uid=14697919269800871697; abt52=new; abt62=old; PHPSESSID=eei5077upvetj4g5kt67k98a46; __ag_cm_=1469791928109; local_city_new=%3Fsite%3Dbj%26city%3Dshanxi; local_city=%7B%20%22site%22%3A%22bj%22%2C%22city%22%3A%22shanxi%22%20%7D; jml7=2; jmdl4=2; newCash=1; abt113=normal; abt114=normal; abt115=show; session_id=579b3f9ce948a5687; search_user_status=0; account_clk_url=https%3A%2F%2Fclick.jumei.com%3A443%2Fub.php%3Fdata%3D%7B%22cookie_uid%22%3A%2214697919269800871697%22%2C%22cust_id%22%3A0%2C%22time%22%3A13674%2C%22type%22%3A1%2C%22subtype%22%3A%22phone%22%2C%22site%22%3A%22bj%22%7D; search_start_time=1469792171327; isTime3=7; b5164fbdf0a4526876438e688f5e4130=1; m_vid=108021634; _adwp=265569940.2455575129.1469791927.1469793228.1469793403.6; _adwc=265569940; _adwr=265569940%23http%253A%252F%252Fhd.jumei.com%252Fmslist%252F3201819_1.html; __xsptplus428=428.1.1469791928.1469793403.21%234%7C%7C%7C%7C%7C%23%23nXFpDobDWdTVwtXQoq7JunK_f2wuoWxH%23; __utma=1.2047703821.1469791928.1469793404.1469793404.11; __utmc=1; __utmz=1.1469791928.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ag_fid=Jg1lQAXXxlVhIWVF; sid=eei5077upvetj4g5kt67k98a46; referer_site_cps=wap_touch_; route=636a810951ef124826f80d2bf800cfb5; has_download=1; close_down_banner=1469880046917; platform=wap; referer_site=wap_touch_; default_site_25=bj; frwap=wap; client_addr=%E9%99%95%E8%A5%BF%E7%9C%81-%E8%A5%BF%E5%AE%89%E5%B8%82; account=wB4tfuGcLnpEIPf16tf3JWrylU1DVVvjtRA%2FPhiCNOqy8md%2FJaBwWCCAgN4FHe8KkOgjvxdr%2F9Qim2NQjLcdlAHSSH5y0EA6evjyRwdYhSXgIMbhhOJUcTKZJavVxFPKeDgGpqwM9SS49%2FRfQZhRFTMB2xuA0YnLUgFGChY3q8IFPebR6COm3qpGPC1WF08zdV8vXKJ5IhQh6TA2KqkciA%3D%3D; tk=b94ec6cb92726a06e24804e7d9ef70679db17031; uid=108021634; v_uid=108021634; nickname=JM151HPCH5404; token=zBnCuWsPGKgLithJqB5cf2RobAM9UG8e4Vdgp3Wtlmpk21TLO8N4NIzJyFZ1aCI6bAujHT5odweE7wXViFYxMq7PKaslEkZymDxDfQv0UOSnYrrXHhS03QvRjATPQGWx; session=g8BljEuZxGdCRbsVyfcPL2MXeBYPQQvY; cookie_ver=1; login_account_name=15129025404; last_reg=1469793825; current_site=bj; privilege_group=0; register_time=1465894602; Hm_lvt_884477732c15fb2f2416fb892282394b=1469791928; Hm_lpvt_884477732c15fb2f2416fb892282394b=1469794367; __utma=96101381.326420180.1469793433.1469794367.1469794367.26; __utmc=96101381; __utmz=96101381.1469793665.12.3.utmcsr=m.jumei.com|utmccn=(referral)|utmcmd=referral|utmcct=/; device_platform=android"
        }
    };
//var date = new Date(2016, 07, 29, 21, 23, 0);
    request(options,function(error, response, body){
        if (!error && response.statusCode == 200) {
            //var info = JSON.parse(body);
            var result = iconv.convert(new Buffer(body, 'binary')).toString();
            console.log(result);
        }
    });
});
var items=[];
items.push("df2850194067698465,df160725p2850194,1");
items.push("df2850214067952347,df160725p2850214,1");
items.push("df2850214144756607,df160725p2850214,1");
items.push("df2854840040353127,df160727p2854840,1");
items.push("df2854823028061956,df160727p2854823,1");

//for(var i=0;i<items.length;i++){
//    setTimeout(function(){
//        myEvent.emit("addCart",items[i])
//    },2000);
//}
var rule = new schedule.RecurrenceRule();
var sec=[];
for(var i=0;i<60;i++){
    sec.push(i);
}
rule.second=sec;
var count=0;
schedule.scheduleJob(rule, function () {
    if(count>items.length-1){
        this.cancel();
    }
    myEvent.emit("addCart",items[count++])
});
//var date2 = new Date("Fri Jul 29 2016 21:57:00 GMT+0800 (CST)");
//var j = schedule.scheduleJob(date2, function () {
//    console.log(new Date().toISOString());
//    console.log('The world is going to end today.');
//    var items="df2850194067698465,df160725p2850194,1";
//    for(var i=0;i<2;i++){
//        myEvent.emit("addCart",items)
//    }
//});
module.exports = app;
