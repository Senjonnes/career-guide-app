var application = require('application').android;
var frameModule = require("ui/frame");
var observableModule = require("data/observable").Observable;

var items = ['ICT', 'Construction', 'Arts', 'Health', 'Finance'];


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


var pageData = new observableModule();
pageData.set("industries", items);

var personalityType;
exports.pageLoaded = function(args) {
    statusBar('hide');
    var page = args.object;
    personalityType = page.navigationContext.model;
    var index = page.navigationContext.index;

    //It is two pages that can link to this page.
    //skip.js has index variable
    //result.js does not have index variable
    //If index is not null...
    if(index != null){
        var selectedItem = personalityType[index];
        var trait=selectedItem.split(" ");
        personalityType = trait[1];
        console.log(trait[1]);
    }
    
    page.bindingContext = pageData;
};

exports.result = function() {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: "views/result/result",
        context: {model: personalityType},
        transition: {
            name: "slideLeft"
        } 
    });
}

exports.proceed = function(args) {

    var selectedIndustry=items[args.index];

    var navigationEntry = {
        moduleName: "views/result/result",
        transition: {
            name: "slideLeft"
        },
        context: {model1: personalityType, model2: selectedIndustry}
    };
    frameModule.topmost().navigate(navigationEntry);
}