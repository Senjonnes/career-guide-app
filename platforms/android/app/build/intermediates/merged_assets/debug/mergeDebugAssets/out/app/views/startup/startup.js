var applicationModule = require("application");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");

exports.login = function () {
    var navigationEntry = {
        moduleName: "views/login/login",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.create = function () {
    var navigationEntry = {
        moduleName: "views/signup/signup",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.skip = function () {
    var navigationEntry = {
        moduleName: "views/home/home",
        transition: {
            name: "slideTop"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

var application = require('application').android;
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

exports.pageLoaded = function() {
    statusBar('hide');
    
    //Back button exit implementation

     //If this is running on an android device not an ios
    if(applicationModule.android){
        applicationModule.android.on(applicationModule.AndroidApplication.activityBackPressedEvent, backEvent);
    }
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
    
    dialogsModule.confirm({
        title: "Exit",
        message: "Are you sure you want to exit?",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
    })
    .then(function(result){
        // toast.makeText(result).show();
        console.log(result);
        console.log(frameModule.topmost().currentPage);
        if(result){
            console.log(result);
            java.lang.System.exit(0);
        }
    });

}