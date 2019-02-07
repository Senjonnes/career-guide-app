var applicationModule = require("application");
var application = require('application').android;
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable").Observable;
// var quotes = ["You miss 100% of the shots you don’t take.&#xA;– Wayne Gretzky -", "God is great.&#xA;- Oluwaseun -", "I love Jesus.&#xA;- Pastor -"]
var pageData = new observableModule();
var applicationSettings = require("application-settings");
var functions = require("~/shared");

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

exports.pageLoaded = function(args) {
    var page = args.object;

    statusBar('show');

    //To bind the Signup or Login/ Logout
    //If the value "authenticated" stored in the application settings is set to false
    //The second parameter is just the default value that should be set to "authenticated" just in case it doesn't exist yet.
    if(applicationSettings.getBoolean("authenticated", false)==false){
        pageData.set("username", "Welcome, user");
        //LLS - LoginLogoutSignup
        pageData.set("LLS", "Login or Signup");
        pageData.set("LLSFunction", function (eventData) {
            exports.startup();
        });
    }else{
        pageData.set("LLS", "Logout");
        //Also get the stored username value in the application settings if it exists
        //If it does not, it should default to empty string - hence the explanation of the 
        //...second parameter
        pageData.set("username", "Welcome, "+ applicationSettings.getString("username", ""));
        pageData.set("LLSFunction", function (eventData) {
            functions.logout();
        });
    }

    page.bindingContext = pageData;
    
    
    //Back button exit implementation
    //------------------------------------------
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

// exports.onTap = function() {
//     count++;
// }

exports.takeTest = function () {
    var navigationEntry = {
        moduleName: "views/testInstruction/testInstruction",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.skipTest = function () {
    var navigationEntry = {
        moduleName: "views/skiptest/skiptest",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.about = function () {
    var navigationEntry = {
        moduleName: "views/about/about",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.contact = function () {
    var navigationEntry = {
        moduleName: "views/contact/contact",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.startup = function () {
    var navigationEntry = {
        moduleName: "views/login/login",
        transition: {
            name: "slideRight"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.personalities = function () {
    var navigationEntry = {
        moduleName: "views/personalities/personalities",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.step = function () {
    var navigationEntry = {
        moduleName: "views/step/step",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.career = function () {
    var navigationEntry = {
        moduleName: "views/career/career",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.future = function () {
    var navigationEntry = {
        moduleName: "views/future/future",
        transition: {
            name: "slideLeft"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.cigi = function () {
    alert("Hi there, I'm CiGi, and it's obvious you want to know more about me. Anyways, I'm the app, feel at home.");
}