var application = require('application').android;
var frameModule = require("ui/frame");

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

exports.loaded = function() {
    statusBar('show')
};

exports.onNavBtnTap = function () {
    var navigationEntry = {
        moduleName: "views/home/home",
        transition: {
            name: "slideRight"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};