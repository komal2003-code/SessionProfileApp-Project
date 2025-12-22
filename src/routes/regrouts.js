let routes=require("express");
let regCtrl=require("../controllers/regCtrl");
let router=routes.Router();

router.post("/register",regCtrl.regCtrl); 
// router.post("/updateprofile", regCtrl.updateProfile);
 router.get("/",regCtrl.homePage);
 router.get("/signup",regCtrl.signUpPage);
// router.get("/signin",regCtrl.signInPage);
 //router.post("/validate",regCtrl.validateUser);

 router.get("/signin", regCtrl.signInPage);
router.post("/validate", regCtrl.validateUser);
router.get("/viewprofile", regCtrl.viewProfile);



// Update profile (POST)
//router.post("/viewprofile", regCtrl.updateProfile);
// router.post("/update", regCtrl.updateProfile);
router.post("/update",regCtrl.updateProfile)

module.exports=router;
