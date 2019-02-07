var frameModule = require("ui/frame");
var application = require('application').android;
var observableModule = require("data/observable").Observable;
var http = require('http');
var labelModule = require("ui/label").Label;
var applicationModule = require("application");


var pageData= new observableModule();

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
    statusBar('hide');
    pageData.set("busy", true);

    if(applicationModule.android){
        applicationModule.android.on(applicationModule.AndroidApplication.activityBackPressedEvent, backEvent);
    }
    
    var page = args.object;
    var message = page.navigationContext.model;
    var personality = page.navigationContext.model1;
    var field = page.navigationContext.model2;    
    
    if(personality!==undefined && field!==undefined){
        message = personality;
        
        http.getJSON('http://172.27.2.53/careerguide/jobs.php?personality=' + personality + '&field=' + field).then(function (result) {
            console.log(result);
            var myStackLayout=page.getViewById("extra");
            var jobCareerTitleLabel = new labelModule();
                jobCareerTitleLabel.text = "Careers in " + result[0].fieldName;
                jobCareerTitleLabel.class = "careerPathTitle";
                myStackLayout.addChild(jobCareerTitleLabel);
            var count = 1;
            for (var i = 0; i < result.length; i++) {
                var jobNameLabel = new labelModule();
                jobNameLabel.text = count + ". " + result[i].jobName;
                jobNameLabel.class = "jobName";
                myStackLayout.addChild(jobNameLabel);

                var jobDescriptionLabel = new labelModule();
                jobDescriptionLabel.text = result[i].description;
                jobDescriptionLabel.textWrap = "true";
                jobDescriptionLabel.class = "body";
                myStackLayout.addChild(jobDescriptionLabel);

                var jobCareerPathHeaderLabel = new labelModule();
                jobCareerPathHeaderLabel.text = "Career path";
                jobCareerPathHeaderLabel.class = "career";
                myStackLayout.addChild(jobCareerPathHeaderLabel);

                var jobCareerPathLabel = new labelModule();
                jobCareerPathLabel.text = result[i].careerPath;
                jobCareerPathLabel.textWrap = "true";
                jobCareerPathLabel.class = "body";
                myStackLayout.addChild(jobCareerPathLabel);

                var jobWtwofHeaderLabel = new labelModule();
                jobWtwofHeaderLabel.text = "What to watch out for";
                jobWtwofHeaderLabel.class = "career";
                myStackLayout.addChild(jobWtwofHeaderLabel);

                var jobWtwofLabel = new labelModule();
                jobWtwofLabel.text = result[i].wtwof;
                jobWtwofLabel.textWrap = "true";
                jobWtwofLabel.class = "body";
                myStackLayout.addChild(jobWtwofLabel);

                var jobRoleModelHeaderLabel = new labelModule();
                jobRoleModelHeaderLabel.text = "Role model";
                jobRoleModelHeaderLabel.class = "career";
                myStackLayout.addChild(jobRoleModelHeaderLabel);

                var jobRoleModeLabel = new labelModule();
                jobRoleModeLabel.text = result[i].roleModel;
                jobRoleModeLabel.textWrap = "true";
                jobRoleModeLabel.class = "body";
                myStackLayout.addChild(jobRoleModeLabel);
                
                count++;
            }

        });
        
    }

    if (message == "ENFJ") {
        pageData.set("vulga", "The Protagonist");
    } else if (message == "ENFP") {
        pageData.set("vulga", "The Campaigner");
    } else if (message == "ENTJ") {
        pageData.set("vulga", "The Commander");
    } else if (message == "ENFP") {
        pageData.set("vulga", "The Debater");
    } else if (message == "ESFJ") {
        pageData.set("vulga", "The Consul");
    } else if (message == "ESFP") {
        pageData.set("vulga", "The Entertainer");
    } else if (message == "ESTJ") {
        pageData.set("vulga", "The Executive");
    } else if (message == "ESTP") {
        pageData.set("vulga", "The Entrepreneur");
    } else if (message == "INFJ") {
        pageData.set("vulga", "The Advocate");
    } else if (message == "INFP") {
        pageData.set("vulga", "The Mediator");
    } else if (message == "INTJ") {
        pageData.set("vulga", "The Architect");
    } else if (message == "INTP") {
        pageData.set("vulga", "The Logician");
    } else if (message == "ISFJ") {
        pageData.set("vulga", "The Defender");
    } else if (message == "ISFP") {
        pageData.set("vulga", "The Adventurer");
    } else if (message == "ISTJ") {
        pageData.set("vulga", "The Logistician");
    } else if (message == "ISTP") {
        pageData.set("vulga", "The Virtuoso");
    }

    http.getJSON('http://172.27.2.53/careerguide/personality.php?type=' + message).then(function (result){ 
        
        pageData.set("message", message);
        pageData.set("personalityDescription", result.Description);
        pageData.set("personalityStrength", result.Strength);
        pageData.set("personalityWeakness", result.Weakness);
        pageData.set("personalityCareer", result.Careers);
        pageData.set("careers", "GENERAL CAREERS");
        
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
    
    var navigationEntry = {
        moduleName: "views/home/home",
        transition: {
            name: "slideTop"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 

}

exports.home = function () {
    var navigationEntry = {
        moduleName: "views/home/home",
        transition: {
            name: "slideTop"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};

exports.again = function () {
    var navigationEntry = {
        moduleName: "views/testInstruction/testInstruction",
        transition: {
            name: "slideRight"
        }
    };
    frameModule.topmost().navigate(navigationEntry); 
};