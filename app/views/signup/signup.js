var application = require('application').android;
var frameModule = require("ui/frame");
var applicationModule = require("application");
var observableModule = require("data/observable");
var functions = require("~/shared");

var pageData = new observableModule.Observable();

function statusBar(action){
    var activity = application.startActivity;
    //activity.runOnUiThread(function(){
    var win = activity.getWindow();
    if(action === 'hide'){
        win.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    } else if(action === 'show'){
        win.clearFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }
}

exports.loaded = function(args) {
    statusBar('hide');
    var page = args.object;
    pageData.set("username", "oluwaseun");
    pageData.set("email", "odeyemioluwaseun.j@gmail.com");
    pageData.set("password", "oluwaseun");
    pageData.set("confirmPassword", "oluwaseun");
    pageData.set("busy", false);

    if(applicationModule.android){
        applicationModule.android.on(applicationModule.AndroidApplication.activityBackPressedEvent, backEvent);
    }
    page.bindingContext = pageData;
};

exports.pageUnloaded = function(){
    //If this is running on an android device not an ios
    if(applicationModule.android){
        applicationModule.android.off(applicationModule.AndroidApplication.activityBackPressedEvent, backEvent);
    }
}


//The backEvent callback (NB: backEvent can be any name)
function backEvent(args){
    //When the args.cancel value is false, the back button will carry on as normal
    //When args.cancel value is true, the back button won't do the default activity
    args.cancel = true;
    
    var navigationEntry = {
        moduleName: "views/startup/startup",
        transition: {
            name: "slideRight"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 

}

exports.skip = function () {
    var navigationEntry = {
        moduleName: "views/home/home",
        transition: {
            name: "slideTop"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.undo = function () {
    var navigationEntry = {
        moduleName: "views/login/login",
        transition: {
            name: "slideRight"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.continue = function () {
    pageData.set("busy", true);
    functions.signup(pageData.get("username"), 
                     pageData.get("email"),
                     pageData.get("password"), 
                     pageData.get("confirmPassword"),
                     function(){
                        pageData.set("busy", false);
                     }
                    );
};