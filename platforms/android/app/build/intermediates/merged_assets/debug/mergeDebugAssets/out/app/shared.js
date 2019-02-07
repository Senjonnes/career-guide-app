var http = require("http");
var frameModule = require("ui/frame");
var applicationSettings = require("application-settings");
var dialogs = require("ui/dialogs");

module.exports ={
    signup: function(username, email, password, confirmPassword, secondFunctionCallback){
        var getUsername = username;
        var getEmail = email;
        var getPassword = password;
        var getConfirmPassword = confirmPassword;
    
        //Validation
        if(getUsername== ''){
            alert("Please enter your username");
            return;
        }else if(getEmail == ''){
            alert("Please enter your email address");
            return;
        }
    
        //If password and confirm password matches 
        if (getPassword == getConfirmPassword) {
            http.request({
                url: 'http://172.27.2.53/careerguide/usercreate.php',
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({email: getEmail, username: getUsername, password: getPassword})
            }).then(function(result){
                console.log(result);
                console.log(result.content);
                console.log(JSON.parse(result.content).status);
                console.log(JSON.parse(result.content).msg);
                secondFunctionCallback();
    
                if (JSON.parse(result.content).status==1){
                    dialogs.alert({
                        title: "CiGi Says",
                        message: "Account creation successful",
                        okButtonText: "Ok"
                    });
                    
                    //Store value "authenticated" to be true
                    applicationSettings.setBoolean("authenticated", true);

                    //Store value "username" to be the username of the person
                    applicationSettings.setString("username", JSON.parse(result.content).msg.username);

                    //Redirect to the home page
                    var navigationEntry = {
                        moduleName: "views/home/home",
                        transition: {
                            name: "slideRight"
                        }
                    };
                    frameModule.topmost().navigate(navigationEntry);
                }else if(JSON.parse(result.content).status==0){
                    dialogs.alert({
                        title: "CiGi Says",
                        message: JSON.parse(result.content).msg,
                        okButtonText: "Ok"
                    });
                }
    
            }, function(error){
                console.log(error);
            });
        } else {
            alert("Password does not match");
        }
    },

    login: function(usernameoremail, password){
        var getUsernameOrEmail=usernameoremail;
        var getPassword=password;
    
        //Validation
        if(getUsernameOrEmail == ''){
            dialogs.alert({
                title: "CiGi Says",
                message: "Please enter your email or username",
                okButtonText: "Ok"
            });
            return;
        }else if(getPassword == ''){
            dialogs.alert({
                title: "CiGi Says",
                message: "Please enter your password",
                okButtonText: "Ok"
            });
            return;
        }
    
        //API request
        var url = 'http://172.27.2.53/careerguide/userlogin.php?usernameoremail='+getUsernameOrEmail+"&password="+getPassword;
        http.getJSON(url).then(function(result){
            console.log(result);
            console.log(result.status);
    
            if(result.status==1){
                //Store value "authenticated" to be true
                applicationSettings.setBoolean("authenticated", true);

                //Store value "username" to be the username of the person
                applicationSettings.setString("username", result.msg.username);
   
                var navigationEntry = {
                    moduleName: "views/home/home",
                    transition: {
                        name: "slideLeft"
                    },
                };
                frameModule.topmost().navigate(navigationEntry);
            }else if(result.status==0){
                dialogs.alert({
                    title: "CiGi Says",
                    message: "Invalid username or password",
                    okButtonText: "Ok"
                });
            }else if(result.status==-1){
                dialogs.alert({
                    title: "CiGi Says",
                    message: "Username or password does not exist. Please create an account.",
                    okButtonText: "Ok"
                });
            }
    
        });
    },

    logout: function(){
        //Remove all stored values
        applicationSettings.clear();

        //Redirect to signin
        var navigationEntry = {
            moduleName: "views/login/login",
            transition: {
                name: "slideLeft"
            },
        };
        frameModule.topmost().navigate(navigationEntry);
    }
} 
