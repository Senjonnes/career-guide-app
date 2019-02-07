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
    statusBar('hide')
};