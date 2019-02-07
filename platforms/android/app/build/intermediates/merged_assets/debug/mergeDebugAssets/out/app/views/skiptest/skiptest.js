var application = require('application').android;
var frameModule = require("ui/frame");
var observableModule = require("data/observable").Observable;

var items = ['ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP', 'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP'];
var sn = 1;
var snItems = [];

function statusBar(action){
    var activity = application.startActivity;
    //activity.runOnUiThread(function(){
    var win = activity.getWindow();
    if(action === 'hide'){
        win.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    } else if(action === 'show'){
        win.clearFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }
};

for (var i = 0; i < items.length; i++) {
    snItems.push(sn + ". " + items[i]);
    sn++;
}

var pageData = new observableModule();
pageData.set("personalities", snItems);



exports.pageLoaded = function(args) {
    statusBar('hide')

    var page = args.object;
    page.bindingContext = pageData;
};

exports.proceed = function (args) {
    var navigationEntry = {
        moduleName: "views/industries/industries",
        transition: {
            name: "slideLeft"
        },
        context: {model: snItems, index: args.index}
    };
    frameModule.topmost().navigate(navigationEntry); 
};