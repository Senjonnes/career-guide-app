var frameModule = require("ui/frame");
var application = require('application').android;
var observableModule = require('data/observable').Observable;
var pageData = new observableModule();
var applicationSettings = require("application-settings");

function statusBar(action){
    var activity = application.startActivity;
    var win = activity.getWindow();
    if(action === 'hide'){
        win.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    } else if(action === 'show'){
        win.clearFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }
}
var message;
exports.pageLoaded = function(args) {
    statusBar('hide');

    if(applicationSettings.getBoolean("authenticated", false)==false){
        pageData.set("username", "user");
    }else{
        pageData.set("username", applicationSettings.getString("username", ""));
    }
    
    var page = args.object;
    message = page.navigationContext.model;
    pageData.set("result", message);
    page.bindingContext = pageData;
};

exports.skip = function() {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: "views/result/result",
        context: {model: message} 
    });
};

exports.determine = function() {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: "views/industries/industries",
        context: {model: message} 
    });
};