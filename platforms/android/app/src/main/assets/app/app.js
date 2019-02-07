var applicationModule = require("application");
applicationModule.start({ moduleName: "views/startup/startup" });

// var toast = require('nativescript-toast');
// var dialogsModule = require("ui/dialogs");
// var frameModule = require('ui/frame');
// //Back button exit implementation

// //If this is running on an android device not an ios
// if(applicationModule.android){
//     applicationModule.android.on(applicationModule.AndroidApplication.activityBackPressedEvent, backEvent);
// }


// //The backEvent callback (NB: backEvent can be any name)
// function backEvent(args){
//     //When the args.cancel value is false, the back button will carry on as normal
//     //When args.cancel value is true, the back button won't do the default activity
//     args.cancel = true;
    
//     dialogsModule.confirm({
//         title: "Exit",
//         message: "Are you sure you want to exit?",
//         okButtonText: "Ok",
//         cancelButtonText: "Cancel"
//     })
//     .then(function(result){
//         // toast.makeText(result).show();
//         console.log(result);
//         console.log(frameModule.topmost().currentPage);
//         if(result){
//             console.log(result);
//             java.lang.System.exit(0);
//         }
//     });

// }

