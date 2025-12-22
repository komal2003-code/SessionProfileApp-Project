let regService=require("../services/regservice");
let regmodel=require("../models/regmodel.js");
let session=require("express-session");
exports.regCtrl = async (req, res) => {
    let { name, email, contact, username, password } = req.body;

    try {
        let result = await regService.acceptRegData(name, email, contact, username, password);
        console.log("Result:", result);
        res.render("register.ejs", { msg: result });
    } catch (err) {
        console.log("Controller error:", err);
        res.render("register.ejs", { msg: "Registration failed" });
    }
};
exports.homePage=(req,res)=>{
    res.render("home.ejs");
}

exports.signUpPage=(req,res)=>{
    res.render("register.ejs",{msg:""});
}

exports.signInPage=(req,res)=>{
    res.render("login.ejs",{msg:""}); // shows login page with no error
}


exports.validateUser=(req,res)=>{

    let{username,password}=req.body;
    console.log(req.body)
    let result=regmodel.validateUserFromDB(username,password);
    result.then((r)=>{
        if(r.length>0){
            req.session.uid=r[0].rid;
            console.log("Login user id in session"+r[0].rid);
            res.render("dashboard.ejs");
        }
        else{
            res.render("login.ejs",{msg:"❌ Invalid username or password"});
        }
 
    }).catch((err)=>{
        res.render("error.ejs");

    });
}

exports.viewProfile=((req,res)=>{
    let loginUserId=req.session.uid;
    console.log("Login user id in session"+loginUserId);
    let promObj=regmodel.getLoginUserProfile(loginUserId);
    promObj.then((profile)=>{
        console.log("User profile data:",profile);
        if(profile.length==0){
            res.render("error.ejs");
        }
        else{
            console.log("User profile data:",profile[0]);
             res.render("viewprofile.ejs",{lud:profile[0]});
        }
       
    }).catch((err)=>{
        console.log(err);
        res.render("error.ejs");
    })


});

exports.updateProfile = (req, res) => {
    let loginUserId = req.session.uid;
    let { name, email, contact, username, password } = req.body;
    regmodel.updateUserProfile(loginUserId, name, email, contact, username, password)
        .then(() => {
            res.redirect("/viewprofile");
        })
        .catch((err) => {
            console.log(err);
            res.render("error.ejs", { msg: "Error updating profile" });
        });
// res.send("hello");
};


/*// View profile page
exports.updateProfile = async (req, res) => {
    let uid = req.session.uid;
    let { name, email, contact, username } = req.body;

    try {
        await regmodel.updateUserById(uid, name, email, contact, username);
        // Re-fetch updated data
        let user = await regmodel.getUserById(uid);
        res.render("viewprofile.ejs", { lud: user[0], msg: "✅ Profile updated successfully!" });
    } catch (err) {
        console.log(err);
        res.render("error.ejs", { msg: "❌ Failed to update profile" });
    }
};



*/