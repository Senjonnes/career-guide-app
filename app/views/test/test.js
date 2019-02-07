var frameModule = require("ui/frame");
var application = require('application').android;
var http = require('http');
var observableModule = require('data/observable').Observable;
var observableArray = require('data/observable-array').ObservableArray;
var applicationModule = require("application");
var dialogsModule = require("ui/dialogs");
// var page = require("ui/page").Page;

var pageData = new observableModule();
var questions = [];
var counter;
var response;
var personalityType;

function statusBar(action){
    var activity = application.startActivity;
    var win = activity.getWindow();
    if(action === 'hide'){
        win.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    } else if(action === 'show'){
        win.clearFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }
}

exports.pageLoaded = function(args) {

    if(applicationModule.android){
        applicationModule.android.on(applicationModule.AndroidApplication.activityBackPressedEvent, backEvent);
    }

    counter = 0;
    response = [];
    personalityType="";
    var page = args.object;
    console.log(page);
    statusBar('hide');
    
    pageData.set("busy", true);
    
    http.getJSON('http://172.27.2.53/careerguide/getquestions.php').then(function (result){ 
        //Remove previous items from the questions array
        questions.splice(0); 
        console.log(result);
        
        for (var i = 0; i < result.length; i++) {
            questions.push({id: result[i].id, ques: result[i].question, opt1: result[i].optionA, opt2: result[i].optionB});
            
        }
        
        console.log(questions);
        console.log(questions.length);
        pageData.set("q", questions[0].ques);
        pageData.set("opt1", questions[0].opt1);
        pageData.set("opt2", questions[0].opt2);
        
        pageData.set("busy", false);
    });    
    
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
    
    dialogsModule.confirm({
        title: "Start test again",
        message: "Do you want to restart test?",
        okButtonText: "Yes",
        cancelButtonText: "No"
    })
    .then(function(result){
        // toast.makeText(result).show();
        console.log(result);
        console.log(frameModule.topmost().currentPage);
        if(result){
            console.log(result);
            var navigationEntry = {
                moduleName: "views/testInstruction/testInstruction",
                transition: {
                    name: "slideRight"
                }
            };
            frameModule.topmost().navigate(navigationEntry); 
        }
    });

}

exports.onTap = function(args) {
    response.push(args.object.id);
    console.log(response);


    //If question reaches a multiple of 3. I.e ques 3, ques 6 etc
    //I am using 2 bcos counter starts from 0. [0,1,2] makes 3 questions
    if(counter == 4){
        var y = response.filter(y => y == "A");
        var n = response.filter(n => n == "B");
        
        
        if(y.length > n.length){
            personalityType += "E";
        }else{
            personalityType += "I";
        }

        //Empty the response array
        response = [];

    }else if(counter == 9){
        var y = response.filter(y => y == "A");
        var n = response.filter(n => n == "B");
        
        
        if(y.length > n.length){
            personalityType += "N";
        }else{
            personalityType += "S";
        }

        //Empty the response array
        response = [];

    }else if(counter == 14){
        var y = response.filter(y => y == "A");
        var n = response.filter(n => n == "B");
        
        
        if(y.length > n.length){
            personalityType += "F";
        }else{
            personalityType += "T";
        }

        //Empty the response array
        response = [];

    }else if(counter == 19){
        var y = response.filter(y => y == "A");
        var n = response.filter(n => n == "B");
        
        
        if(y.length > n.length){
            personalityType += "J";
        }else{
            personalityType += "P";
        }

        //Empty the response array
        response = [];

    }

    if(counter < questions.length-1){
        counter++;
    }
    //If counter gets to the last question...
    else if(counter>= questions.length-1){
        //Set the counter to be the last item
        //counter = questions.length-1;
        var topmost = frameModule.topmost();
        topmost.navigate({
            moduleName: "views/testResult/testResult",
            context: {model: personalityType} 
        });
    }
    console.log(personalityType);

    pageData.set("q", questions[counter].ques);
    pageData.set("opt1", questions[counter].opt1);
    pageData.set("opt2", questions[counter].opt2);
}