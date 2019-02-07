var frameModule = require("ui/frame");
var application = require('application').android;
var applicationModule = require("application");
var dialogsModule = require("ui/dialogs");

function statusBar(action){
    var activity = application.startActivity;
    var win = activity.getWindow();
    if(action === 'hide'){
        win.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    } else if(action === 'show'){
        win.clearFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }
}

exports.pageLoaded = function() {
    statusBar('hide');

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
    
    var navigationEntry = {
        moduleName: "views/home/home",
        transition: {
            name: "slideRight"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 

}

exports.takeTest = function () {
    var navigationEntry = {
        moduleName: "views/test/test",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};